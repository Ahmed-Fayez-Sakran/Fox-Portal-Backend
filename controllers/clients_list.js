//#region Global Variables
var tbl_Model = require("../models/user_data");
const business_organizations_lkp_Model = require("../models/business_organizations_lkp");
var User_Tokens_Log_Model = require("../models/user_tokens_log");

var UserEmailVerification_Log_Model = require("../models/useremailverification_log");
var UserPhoneVerification_Log_Model = require("../models/userphoneverification_log");

const tbl_Service = require("../services/user_data");
const now_DateTime = require('../helpers/fun_datetime');
const fun_handled_messages = require('../helpers/fun_handled_messages');
const fun_get_serial_number = require('../helpers/fun_get_serial_number');
// const fun_get_Template_Form = require('../helpers/fun_get_Template_Form');
// const fun_insert_token = require('../helpers/fun_insert_token');
// const fun_suspend_token = require('../helpers/fun_suspend_token');
const fun_check_Existancy_By_ID = require('../helpers/fun_check_Existancy_By_ID');
const fun_insert_row = require('../helpers/fun_insert_row');
const fun_update_row = require('../helpers/fun_update_row');
//const logger = require('../helpers/fun_insert_Logger');
const logger = require('../utils/logger');
var loggers_Model = require("../models/logger");
let loggers_Data = ""
var langTitle = ""
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const random = require('../helpers/generate_random_text');
var ObjectId = require('mongodb').ObjectId;
//#endregion

exports.edit_client =  async(req, res) => {
    try{
        //#region Global Variables
        langTitle = req.params.langTitle;
        const saltRounds = +process.env.saltRounds;
        let val_User_ID = (req.params.id).trim();
        var val_Email = req.body.Email;  
        var val_Hash_Password = ""
        var val_Password = req.body.Password;  
        var val_First_Name = req.body.First_Name;
        var val_Last_Name = req.body.Last_Name;
        var val_Phone_Number = req.body.Phone_Number;
        var val_Address = req.body.Address;
        var val_Photo_Profile = "";//http://localhost:27017/public/user_personal_photos/user_default.png
        var val_Updated_By = req.body.Updated_By;
        let sentData = "";
        let update_Promise = ""
        let get_Message_Promise = ""
        let recievedData = ""
        var is_Delete_Old_Image=false;
        //#endregion
      
        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
            resolve(returnedList);
        }).then((returned_ID) => {
            if (!returned_ID) {
                //#region ID is not exist in DB msg 14
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,14);
                    resolve(result);
                }).then((msg) => {        
                    res.status(400).json({ data: [] , message: msg, status: "wrong id" });
                })
                //#endregion
            } else {
                bcrypt.genSalt(saltRounds).then(salt => {
                    return bcrypt.hash(val_Password, salt)
                  }).then(hash => {
                    val_Hash_Password = hash;
            
                    //#region prepare photo attributes
                    const file = req.file;
                    if (file){
                      is_Delete_Old_Image=true;
                      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                      if (!allowedMimeTypes.includes(file.mimetype)) {
                          //#region msg Unsupported file type
                          new Promise(async (resolve, reject)=>{
                              let result = await fun_handled_messages.get_handled_message(langTitle,10);
                              resolve(result);
                          }).then((msg) => {
                              res.status(400).json({ data: [] , message: msg , status: "Unsupported file type" }); 
                          });return
                          //#endregion
                      } else{
                          const fileName = file.filename;
                          const basePath = `${req.protocol}://${req.get('host')}/public/user_personal_photos/`;
                          val_Photo_Profile = `${basePath}${fileName}`
              
                          recievedData = new tbl_Model({
                            Email: val_Email,
                            Password: hash,
                            First_Name: val_First_Name,
                            Last_Name: val_Last_Name,
                            Phone_Number: val_Phone_Number,
                            Address: val_Address,
                            Photo_Profile: val_Photo_Profile,
                            Updated_By:val_Updated_By,
                            LastUpdate_DateTime: now_DateTime.get_DateTime()
                          },{ new: true});
                      }
                    } else {
                        recievedData = new tbl_Model({
                          Email: val_Email,
                          Password: val_Hash_Password,
                          First_Name: val_First_Name,
                          Last_Name: val_Last_Name,
                          Phone_Number: val_Phone_Number,
                          Address: val_Address,
                          Updated_By:val_Updated_By,
                          LastUpdate_DateTime: now_DateTime.get_DateTime()
                        },{ new: true});
                    }
                    console.log("recievedData = "+recievedData)
                    //#endregion
                    
                    //#region update_My_Profile_Data
                    new Promise(async (resolve, reject)=>{
                        const newList = await fun_update_row.update_row(val_User_ID, "user_data", recievedData , is_Delete_Old_Image);
                      resolve(newList);
                    }).then((flg) => {
              
                      if (!flg) {
                        //#region msg 2 update process failed
                        new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,2);
                        resolve(result);
                        }).then((msg) => {
                            res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                        })
                        //#endregion
                      } else {
                        //#region msg update process successed
                        new Promise(async (resolve, reject)=>{
                          var result = await fun_handled_messages.get_handled_message(langTitle,18);
                          resolve(result);
                        }).then((msg) => {
                          res.status(200).json({ data: flg , message: msg , status: "updated successed" });
                        })
                        //#endregion
                      }
              
                    })
                    //#endregion
              
                  })
            }
        })
  
    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};


//next feature
exports.create_client_with_settings =  async(req, res) => {
    try{
      //#region Global Variables
      langTitle = req.params.langTitle;
      const saltRounds = +process.env.saltRounds;
      var val_User_ID = "";
      var val_Email = req.body.Email;
      var val_Hash_Password = ""
      var val_Password = req.body.Password;
      var val_First_Name = req.body.First_Name;
      var val_Last_Name = req.body.Last_Name;
      var val_Phone_Number = req.body.Phone_Number;
      var val_Address = req.body.Address;
      var val_Location = req.body.Location;
      var val_Photo_Profile = "";//http://localhost:27017/public/uploads/user_default.png
      var val_User_Roles_ID = req.body.Address;
      let sentData = "";
      //#endregion
      








      // bcrypt.genSalt(saltRounds).then(salt => {
      //   return bcrypt.hash(val_Password, salt)
      // }).then(hash => {
      //   val_Hash_Password = hash
      //   //#region prepare photo attributes
      //   const file = req.file;
      //   if (file){
      //     is_Delete_Old_Image=true;
      //     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      //     if (!allowedMimeTypes.includes(file.mimetype)) {
      //         //#region msg Unsupported file type
      //         new Promise(async (resolve, reject)=>{
      //             let result = await fun_handled_messages.get_handled_message(langTitle,359);
      //             resolve(result);
      //         }).then((msg) => {
      //             res.status(400).json({ data: [] , message: msg , status: "Unsupported file type" }); 
      //         });return
      //         //#endregion
      //     } else{
      //         const fileName = file.filename;
      //         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
      //         val_Photo_Profile = `${basePath}${fileName}`
  
      //         recievedData = new tbl_Model({
      //           Email: val_Email,
      //           Password: hash,
      //           First_Name: val_First_Name,
      //           Last_Name: val_Last_Name,
      //           Phone_Number: val_Phone_Number,
      //           Address: val_Address,
      //           Location: val_Location,
      //           Photo_Profile: val_Photo_Profile,
      //           Updated_By:val_Updated_By,
      //           LastUpdate_DateTime: now_DateTime.get_DateTime()
      //         },{ new: true});
      //     }
      //   } else {
      //       recievedData = new tbl_Model({
      //         Email: val_Email,
      //         Password: val_Hash_Password,
      //         First_Name: val_First_Name,
      //         Last_Name: val_Last_Name,
      //         Phone_Number: val_Phone_Number,
      //         Address: val_Address,
      //         Location: val_Location,
      //         Updated_By:val_Updated_By,
      //         LastUpdate_DateTime: now_DateTime.get_DateTime()
      //       },{ new: true});
      //   }
      //   //#endregion
      //   console.log("recievedData = "+recievedData)
      //   new Promise(async (resolve, reject)=>{
      //     const newList = await tbl_Service.update_My_Profile_Data(val_User_ID, recievedData , is_Delete_Old_Image);
      //     resolve(newList);
      //   }).then((flg) => {
  
      //     if (!flg) {
      //       //#region msg 2 update process failed
      //       new Promise(async (resolve, reject)=>{
      //       let result = await fun_handled_messages.get_handled_message(langTitle,2);
      //       resolve(result);
      //       }).then((msg) => {
      //           res.status(400).json({ data: [] , message: msg , status: "update failed" });    
      //       })
      //       //#endregion
      //     } else {
      //       //#region msg update process successed
      //       new Promise(async (resolve, reject)=>{
      //         var result = await fun_handled_messages.get_handled_message(langTitle,370);
      //         resolve(result);
      //       }).then((msg) => {
      //         res.status(200).json({ data: flg , message: msg , status: "updated successed" });
      //       })
      //       //#endregion
      //     }
  
      //   })
  
      // })
  
    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};
