//#region Global Variables
var tbl_Model = require("../models/company_privacy_policy");
const tbl_Service = require("../services/company_privacy_policy");
const now_DateTime = require('../helpers/fun_datetime');
const fun_handled_messages = require('../helpers/fun_handled_messages');
const fun_get_serial_number = require('../helpers/fun_get_serial_number');
const fun_insert_row = require('../helpers/fun_insert_row');
const fun_update_row = require('../helpers/fun_update_row');
//const logger = require('../helpers/fun_insert_Logger');
var loggers_Model = require("../models/logger");
let loggers_Data = ""
var langTitle = ""
let insert_Promise = ""
let get_Message_Promise = ""
let sentData = ""
const logger = require('../utils/logger');
//#endregion

exports.get_company_privacy_policy =  async(req, res) => {
    try {
        //#region Global Variables
        const suspendStatus = req.params.suspendStatus;
        langTitle = req.params.langTitle;
        //#endregion
          
        new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.get_privacy_policy_By_SuspendStatus(suspendStatus);
            resolve(returnedList);
          }).then((returned_Users) => {
    
            if((!returned_Users)||(returned_Users.length<=0)) {
                
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,36);
                    resolve(result);
                }).then((msg) => {
                    res.status(404).json({data: [] , message: msg , status: "empty rows" });
                })
    
            } else{
                res.status(200).json({ data: returned_Users , message: "rows selected", status: "success" });
            }
    
        })
  
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

exports.create_Row =  async(req, res) => {
    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Policy_Title_En = req.body.Policy_Title_En;
        var val_Policy_Title_Ar = req.body.Policy_Title_Ar;
        //#endregion
        
        new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.get_Last_privacy_policy();
            resolve(returnedList);
        }).then((tbl_Exist) => {
            if (!tbl_Exist || tbl_Exist.Is_Suspended) {
                //#region First Row insertion process in the collection
                sentData = new tbl_Model({
                    Serial_Number: val_Serial_Number,
                    Policy_Title_En: val_Policy_Title_En,
                    Policy_Title_Ar: val_Policy_Title_Ar,
                    Inserted_By: req.body.Inserted_By,
                    Inserted_DateTime: now_DateTime.get_DateTime(),
                    Is_Suspended: false
                })
                new Promise(async (resolve, reject)=>{
                    const newList = await fun_insert_row.insert_row("company_privacy_policy",sentData);
                    resolve(newList);
                }).then((insert_Flg) => {
                    var result = ""
                    if (!insert_Flg) {
                      //#region msg 1 insert process failed
                      get_Message_Promise = new Promise(async (resolve, reject)=>{
                      result = await fun_handled_messages.get_handled_message(langTitle,1);
                      resolve(result);
                      });
                
                      get_Message_Promise.then((msg) => {
                        res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                      }).catch((err)=>{
                        logger.error(err.message);
                        res.status(500).json({ message: err.message , status: "error" });
                      });
                      //#endregion
                    } else {
                      //#region msg 37 insert privacy policy process successed
                      new Promise(async (resolve, reject)=>{
                        result = await fun_handled_messages.get_handled_message(langTitle,37);
                        resolve(result);
                      }).then((msg) => {      
                        res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                      })
                      //#endregion
                    }
                })
                //#endregion
            } else {
                //#region suspend the old row then insert the new one
                var val_Suspended_Row_ID = tbl_Exist[0]._id;
                let recievedData = new tbl_Model({
                    Updated_By: req.body.Inserted_By,
                    Updated_DateTime: now_DateTime.get_DateTime(),
                    Is_Suspended: true
                  },{ new: true});
                new Promise(async (resolve, reject)=>{
                    const newList = await fun_update_row.update_row(val_Suspended_Row_ID , "company_privacy_policy" , recievedData , false);
                    resolve(newList);
                }).then((update_flg) => {
                    if (!update_flg) {
                        //#region msg 2 update process failed
                        new Promise(async (resolve, reject)=>{
                            result = await fun_handled_messages.get_handled_message(langTitle,2);
                            resolve(result);
                        }).then((msg) => {
                            res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                        })        
                        //#endregion    
                    } else {
                        new Promise(async (resolve, reject)=>{
                            var exist = await fun_get_serial_number.get_Serial_Number("company_privacy_policy");
                            resolve(exist);
                        }).then((New_User_Serial_Number) => {
                            //#region insertion process in the collection
                            sentData = new tbl_Model({
                                Serial_Number: New_User_Serial_Number,
                                Policy_Title_En: val_Policy_Title_En,
                                Policy_Title_Ar: val_Policy_Title_Ar,
                                Inserted_By: req.body.Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime(),
                                Is_Suspended: false
                            })
                            new Promise(async (resolve, reject)=>{
                                const newList = await fun_insert_row.insert_row("company_privacy_policy",sentData);
                                resolve(newList);
                            }).then((insert_Flg) => {
                                var result = ""
                                if (!insert_Flg) {
                                //#region msg 1 insert process failed
                                new Promise(async (resolve, reject)=>{
                                    result = await fun_handled_messages.get_handled_message(langTitle,1);
                                    resolve(result);
                                }).then((msg) => {
                                    res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                                })
                                //#endregion
                                } else {
                                //#region msg 37 insert privacy policy process successed
                                new Promise(async (resolve, reject)=>{
                                    result = await fun_handled_messages.get_handled_message(langTitle,37);
                                    resolve(result);
                                }).then((msg) => {      
                                    res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                })
                                //#endregion
                                }
                            })
                            //#endregion
                        })
                    }
                })
                //#endregion
            }
        })
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
      }
};