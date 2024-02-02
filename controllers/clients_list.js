//#region Global Variables
var tbl_Model = require("../models/user_data");
const business_organizations_lkp_Model = require("../models/business_organizations_lkp");
var User_Tokens_Log_Model = require("../models/user_tokens_log");

var UserEmailVerification_Log_Model = require("../models/useremailverification_log");
var UserPhoneVerification_Log_Model = require("../models/userphoneverification_log");

const tbl_Service = require("../services/user_data");
const now_DateTime = require('../helpers/fun_datetime');
const fun_insert_rows = require('../helpers/fun_insert_rows');
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
        var val_Is_Suspended = req.body.Is_Suspended;
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
            
                    //#region prepare photo attributes and table object
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
                            LastUpdate_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended:val_Is_Suspended
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
                          LastUpdate_DateTime: now_DateTime.get_DateTime(),
                          Is_Suspended:val_Is_Suspended
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

exports.create_client_with_settings =  async(req, res) => {
    try{
      //#region Global Variables
      langTitle = req.params.langTitle;
      var val_New_User_Serial_Number = ""
      const saltRounds = +process.env.saltRounds;
      var val_User_ID = "";
      var val_Email = req.body.Email;
      var val_Password = req.body.Password;
      var val_First_Name = req.body.First_Name;
      var val_Last_Name = req.body.Last_Name;
      var val_Phone_Number = req.body.Phone_Number;
      var val_Address = req.body.Address;
      var val_Location = req.body.Location;
      var val_Photo_Profile = "";//http://localhost:27017/public/uploads/user_default.png
      var val_User_Roles_ID = req.body.User_Roles_ID;
      var val_Is_Business = req.body.Is_Business;
      var val_Business_Organization_ID = "";
      var sentData = "";
      //#endregion

      new Promise(async (resolve, reject)=>{
        var exist = await tbl_Service.check_User_Existancy(val_Email,val_Phone_Number);
          resolve(exist);
      }).then((flag_User_Exist) => {
        if (flag_User_Exist[0].trim()==="Exist") {
          //#region User Account Already Exist Msg This to user
          new Promise(async (resolve, reject)=>{
            let result = await fun_handled_messages.get_handled_message(langTitle,13);
            resolve(result);
          }).then((msg) => {
            res.status(200).json({ data: [] , message: msg , status: "User Account Already Exist" }); 
          })
          //#endregion
        } else {
          //#region User Is Avialable
          new Promise(async (resolve, reject)=>{
            var exist = await fun_get_serial_number.get_Serial_Number("user_data");
            resolve(exist);
          }).then((User_Serial_Number) => {
            val_New_User_Serial_Number = User_Serial_Number;

            bcrypt.genSalt(saltRounds).then(salt => {
              return bcrypt.hash(val_Password, salt)
            }).then(hash => {
              //#region User_Roles
              if (val_User_Roles_ID=="65187389de9d4f1d31451dcd")
              {
                //#region "Business Client Admin"
                val_Business_Organization_ID = req.body.Business_Organization_ID;
                sentData = new tbl_Model({
                  Serial_Number:val_New_User_Serial_Number,
                  Email:val_Email,
                  Password: hash,
                  First_Name:val_First_Name,
                  Last_Name:val_Last_Name,
                  User_Roles_ID:val_User_Roles_ID,
                  Phone_Number:val_Phone_Number,
                  Address:val_Address,
                  Location:val_Location,
                  Inserted_DateTime:now_DateTime.get_DateTime(),
                  Is_Business:val_Is_Business,
                  Business_Organization_ID:val_Business_Organization_ID,
                  Is_Verified:true,
                  Is_Suspended:true,
                  Inserted_By:val_New_User_Serial_Number,
                });
                //#endregion
              } 
              else if ( (val_User_Roles_ID=="65187389de9d4f1d31451dcc") || (val_User_Roles_ID=="65187389de9d4f1d31451dd1") || (val_User_Roles_ID=="65187389de9d4f1d31451dd2") || (val_User_Roles_ID=="65187389de9d4f1d31451dd3") )
              {
                //#region "Registered Client" - "Fox User Operation" - "Fox User Finance" - "Outsourcing_Owner_User"
                val_Business_Organization_ID = "658c3ad066b5d3ae62f3e98c"
                sentData = new tbl_Model({
                  Serial_Number:val_New_User_Serial_Number,
                  Email:val_Email,
                  Password: hash,
                  First_Name:val_First_Name,
                  Last_Name:val_Last_Name,
                  User_Roles_ID:val_User_Roles_ID,
                  Phone_Number:val_Phone_Number,
                  Address:val_Address,
                  Location:val_Location,
                  Inserted_DateTime:now_DateTime.get_DateTime(),
                  Is_Business:false,
                  Business_Organization_ID:val_Business_Organization_ID,
                  Is_Verified:true,
                  Is_Suspended:true,
                  Inserted_By:val_New_User_Serial_Number,
                });
                //#endregion
              }
              else if ( (val_User_Roles_ID=="65187389de9d4f1d31451dce") || (val_User_Roles_ID=="65187389de9d4f1d31451dcf") )
              {
                //#region "Business Client Operation" - "Business Client Finance"
                val_Business_Organization_ID = req.body.Business_Organization_ID;
                sentData = new tbl_Model({
                  Serial_Number:val_New_User_Serial_Number,
                  Email:val_Email,
                  Password: hash,
                  First_Name:val_First_Name,
                  Last_Name:val_Last_Name,
                  User_Roles_ID:val_User_Roles_ID,
                  Phone_Number:val_Phone_Number,
                  Address:val_Address,
                  Location:val_Location,
                  Inserted_DateTime:now_DateTime.get_DateTime(),
                  Is_Business:val_Is_Business,
                  Business_Organization_ID:val_Business_Organization_ID,
                  Is_Verified:true,
                  Is_Suspended:true,
                  Inserted_By:val_New_User_Serial_Number,
                });
                //#endregion
              }
              //#endregion
              
              new Promise(async (resolve, reject)=>{
                const newList = await fun_insert_row.insert_row("user_data",sentData);
                resolve(newList);
              }).then((insert_Flg) => {
                if (insert_Flg.length<=0) {
                  //#region msg 1 insert process failed
                  new Promise(async (resolve, reject)=>{
                    let result = await fun_handled_messages.get_handled_message(langTitle,1);
                    resolve(result);
                  }).then((msg) => {
                    res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                  })
                  //#endregion
                } else {
                  //#region msg 27 insert process succeeded
                  new Promise(async (resolve, reject)=>{
                    let result = await fun_handled_messages.get_handled_message(langTitle,27);
                    resolve(result);
                  }).then((msg) => {
                    res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                  })
                  //#endregion
                }
              })


            })

          })
          //#endregion
        }
      })

    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};

exports.create_service_settings =  async(req, res) => {
  try{
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_Serial_Number = req.body.Serial_Number;
    var val_User_ID = req.body.User_ID;
    var val_Sub_Service_ID = req.body.Sub_Service_ID;
    var val_Notice_Period_Per_Hours = req.body.Notice_Period_Per_Hours;
    var val_Mini_Service_Duration_Per_Hours = req.body.Mini_Service_Duration_Per_Hours;
    var val_Max_Cancellation_Duration_Per_Hours = req.body.Max_Cancellation_Duration_Per_Hours;
    var val_Discount_ID ="65a93333195468ad65b038ad" ; //Not Applicable
    var val_Inserted_By = req.body.Inserted_By;
    var Business_Sub_Services_Settings_Log_Model = require("../models/business_sub_services_settings_log");
    var sentData = "";
    var recievedData = "";
    //#endregion
    
    let check_Sub_Service_ID_Promise = new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
      resolve(returnedList);
    });

    let check_User_ID_Promise = new Promise(async (resolve, reject)=>{
        let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
        resolve(returnedList);
    });

    Promise.all([check_Sub_Service_ID_Promise , check_User_ID_Promise]).then((results) => {
      if ( (!results[0]) || (!results[1]) ) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
            res.status(400).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
    } else {
        //#region ID exist in DB
        new Promise(async (resolve, reject)=>{ 
          var returnedList = await tbl_Service.check_Business_Sub_Services_Settings_Log_Existancy(val_Sub_Service_ID,val_User_ID,val_Discount_ID);
          resolve(returnedList);
        }).then((exist_Before) => {

          if (exist_Before[1]==false) {
            //#region Not Exist before so --> insert directly
            sentData = new Business_Sub_Services_Settings_Log_Model({
              Serial_Number: val_Serial_Number,
              Sub_Service_ID: val_Sub_Service_ID,
              User_ID: val_User_ID,
              Mini_Service_Duration_Per_Hours: val_Mini_Service_Duration_Per_Hours,
              Notice_Period_Per_Hours: req.body.Notice_Period_Per_Hours,
              Max_Cancellation_Duration_Per_Hours: val_Max_Cancellation_Duration_Per_Hours,
              Discount_ID: val_Discount_ID,                  
              Inserted_By: req.body.Inserted_By,
              Inserted_DateTime: now_DateTime.get_DateTime(),
              Is_Suspended: false
            });
            new Promise(async (resolve, reject)=>{
              const newList = await fun_insert_row.insert_row("business_sub_services_settings_log" , sentData);
              resolve(newList);
            }).then((insert_Flg) => {
              if (!insert_Flg) {
                //#region msg 1 insert process failed
                new Promise(async (resolve, reject)=>{
                    let result = await fun_handled_messages.get_handled_message(langTitle,1);
                    resolve(result);
                }).then((msg) => {
                    res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                })
                //#endregion
              } else {
                //#region msg insert
                new Promise(async (resolve, reject)=>{
                  let result = await fun_handled_messages.get_handled_message(langTitle,292);
                  resolve(result);
                }).then((msg) => {
                    res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                })
                //#endregion
              }
            })
            //#endregion
          } else {
            //#region suspend the old one then insert new row
            recievedData = new Business_Sub_Services_Settings_Log_Model({
              Updated_By: val_Inserted_By,
              Updated_DateTime: now_DateTime.get_DateTime(),
              Is_Suspended: true
            },{ new: true});

            new Promise(async (resolve, reject)=>{
              const newList = await fun_update_row.update_row(exist_Before[0] , "business_sub_services_settings_log", recievedData , false);
              resolve(newList);
            }).then((update_flg) => {
              if (!update_flg) {
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
                sentData = new Business_Sub_Services_Settings_Log_Model({
                  Serial_Number: val_Serial_Number,
                  Sub_Service_ID: val_Sub_Service_ID,
                  User_ID: val_User_ID,
                  Mini_Service_Duration_Per_Hours: val_Mini_Service_Duration_Per_Hours,
                  Notice_Period_Per_Hours: req.body.Notice_Period_Per_Hours,
                  Max_Cancellation_Duration_Per_Hours: val_Max_Cancellation_Duration_Per_Hours,
                  Discount_ID: val_Discount_ID,                  
                  Inserted_By: req.body.Inserted_By,
                  Inserted_DateTime: now_DateTime.get_DateTime(),
                  Is_Suspended: false
                });
                new Promise(async (resolve, reject)=>{
                  const newList = await fun_insert_row.insert_row("business_sub_services_settings_log" , sentData);
                  resolve(newList);
                }).then((insert_Flg) => {
                  if (!insert_Flg) {
                    //#region msg 1 insert process failed
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,1);
                        resolve(result);
                    }).then((msg) => {
                        res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                    })
                    //#endregion
                  } else {
                    //#region msg insert
                    new Promise(async (resolve, reject)=>{
                      let result = await fun_handled_messages.get_handled_message(langTitle,292);
                      resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                    })
                    //#endregion
                  }
                })
                //#endregion
            }
            })
            //#endregion
          }

        })
        //#endregion
    }    
    })



  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.create_service_prices =  async(req, res) => {

  //use services_prices
  try{
    // //#region Global Variables
    // langTitle = req.params.langTitle;
    // var val_Serial_Number = req.body.Serial_Number;
    // var val_User_ID = req.body.User_ID;
    // var val_Sub_Service_ID = req.body.Sub_Service_ID;
    // var val_Inserted_By = req.body.Inserted_By;
    // var sentData = "";
    // var recievedData = "";
    // //#endregion
    
    // let check_Sub_Service_ID_Promise = new Promise(async (resolve, reject)=>{
    //   let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
    //   resolve(returnedList);
    // });

    // let check_User_ID_Promise = new Promise(async (resolve, reject)=>{
    //     let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
    //     resolve(returnedList);
    // });

    // Promise.all([check_Sub_Service_ID_Promise , check_User_ID_Promise]).then((results) => {
    //   if ( (!results[0]) || (!results[1]) ) {
    //     //#region ID is not exist in DB msg 14
    //     new Promise(async (resolve, reject)=>{
    //       var result = await fun_handled_messages.get_handled_message(langTitle,14);
    //       resolve(result);
    //     }).then((msg) => {        
    //         res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //     })
    //     //#endregion
    //   } else {
    //     //#region ID exist in DB
        
    //     //#endregion
    //   }
    // })


  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.create_add_on_settings =  async(req, res) => {
  try{} catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.create_terms_conditions =  async(req, res) => {
  try{} catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};


