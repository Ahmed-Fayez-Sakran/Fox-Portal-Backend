//#region Global Variables
var tbl_Model="";
const tbl_Service = require("../../services/terms_conditions");
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_get_serial_number = require('../../helpers/fun_get_serial_number');
const fun_insert_row = require('../../helpers/fun_insert_row');
const fun_update_row = require('../../helpers/fun_update_row');
//const logger = require('../helpers/fun_insert_Logger');
var loggers_Model = require("../../models/logger");
let loggers_Data = ""
var langTitle = ""
let insert_Promise = ""
let get_Message_Promise = ""
let sentData = ""
const logger = require('../../utils/logger');
//#endregion

exports.get_terms_conditions =  async(req, res) => {
    try {
        //#region Global Variables
        const suspendStatus = req.params.suspendStatus;
        langTitle = req.params.langTitle;
        var val_Page_Number = req.params.page_number;
        console.log("val_Page_Number ="+val_Page_Number)
        //#endregion

        let get_DataTable_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.get_terms_conditions_By_SuspendStatus(suspendStatus,val_Page_Number);
            resolve(returnedList);
        });
          
        let get_Message_Promise = new Promise(async (resolve, reject)=>{
            var result = ""
            //#region Get Message based on suspend Status and language Title
            if (suspendStatus=="only-true"){
                result = await fun_handled_messages.get_handled_message(langTitle,295);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,296);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,294);
            }else{
                result = await fun_handled_messages.get_handled_message(langTitle,22);
            }
            //#endregion
            resolve(result);
        });

        Promise.all([get_DataTable_Promise , get_Message_Promise]).then((results) => {
            if (results[0].length<=0) {
                if ((suspendStatus.trim() ==="only-true")||(suspendStatus.trim() ==="only-false")||(suspendStatus.trim() ==="all")) {
                  res.status(200).json({ data: [] , message: results[1] , status: "empty rows" });
                } else {
                    res.status(404).json({ data: [] , message: results[1] , status: "wrong url" });
                }
            } else {
                res.status(200).json({ data: results[0] , message: "" , status: "rows selected" });
            }
        });
  
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
        var val_Sub_Service_ID = req.body.Sub_Service_ID;
        var val_type = req.body.type;
        var val_User_ID = ""; //req.body.User_ID
        var val_Terms_Conditions_Description_En = req.body.Terms_Conditions_Description_En;
        var val_Terms_Conditions_Description_Ar = req.body.Terms_Conditions_Description_Ar;
        var Last_terms_condition_promise = "";
        //#endregion

        if (val_type=="client") {
            Last_terms_condition_promise = new Promise(async (resolve, reject)=>{
                var returnedList = await tbl_Service.get_Last_terms_conditions("client_terms_conditions_log");
                resolve(returnedList);
            });
        } else {
            var val_User_ID = req.body.User_ID;
            Last_terms_condition_promise = new Promise(async (resolve, reject)=>{
                var returnedList = await tbl_Service.get_Last_terms_conditions("business_terms_conditions_log");
                resolve(returnedList);
            });
        }
        
        Last_terms_condition_promise.then((tbl_Exist) => {

            if (!tbl_Exist) { console.log("case 1")
                //#region First Row insertion process in the collection
                if (val_type=="client") {
                    tbl_Model = require("../../models/client_terms_conditions_log");
                    sentData = new tbl_Model({
                        Serial_Number: val_Serial_Number,
                        Sub_Service_ID:val_Sub_Service_ID,
                        Terms_Conditions_Description_En: val_Terms_Conditions_Description_En,
                        Terms_Conditions_Description_Ar: val_Terms_Conditions_Description_Ar,
                        Inserted_By: req.body.Inserted_By,
                        Inserted_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: false
                    });
                } else{
                    tbl_Model = require("../../models/business_terms_conditions_log");
                    sentData = new tbl_Model({
                        Serial_Number: val_Serial_Number,
                        User_ID:val_User_ID,
                        Sub_Service_ID:val_Sub_Service_ID,
                        Terms_Conditions_Description_En: val_Terms_Conditions_Description_En,
                        Terms_Conditions_Description_Ar: val_Terms_Conditions_Description_Ar,
                        Inserted_By: req.body.Inserted_By,
                        Inserted_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: false
                    });
                }

                new Promise(async (resolve, reject)=>{
                    var newList = "";
                    if (val_type=="client") {
                        newList = await fun_insert_row.insert_row("client_terms_conditions_log",sentData);
                    } else{
                        newList = await fun_insert_row.insert_row("business_terms_conditions_log",sentData);
                    }                    
                    resolve(newList);
                }).then((insert_Flg) => {
                    var result = ""
                    if (!insert_Flg) {
                      //#region msg 1 insert process failed
                      get_Message_Promise = new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,1);
                        resolve(result);
                      }).then((msg) => {
                        res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                      })
                      //#endregion
                    } else {
                      //#region msg 293 insert privacy policy process successed
                      new Promise(async (resolve, reject)=>{
                        result = await fun_handled_messages.get_handled_message(langTitle,293);
                        resolve(result);
                      }).then((msg) => {      
                        res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                      })
                      //#endregion
                    }
                })
                //#endregion
            } else {console.log("case 2")
                //#region suspend the old row then insert the new one
                if (val_type=="client") {
                    tbl_Model = require("../../models/client_terms_conditions_log");
                } else{
                    tbl_Model = require("../../models/business_terms_conditions_log");
                }
                var val_Suspended_Row_ID = tbl_Exist[0]._id;
                let recievedData = new tbl_Model({
                    Updated_By: req.body.Inserted_By,
                    Updated_DateTime: now_DateTime.get_DateTime(),
                    Is_Suspended: true
                },{ new: true});
                new Promise(async (resolve, reject)=>{
                    var newList = "";
                    if (val_type=="client") {
                        newList = await fun_update_row.update_row(val_Suspended_Row_ID , "client_terms_conditions_log" , recievedData , false);
                    } else {
                        newList = await fun_update_row.update_row(val_Suspended_Row_ID , "business_terms_conditions_log" , recievedData , false);
                    }                    
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
                        //#region insert process
                        if (val_type=="client") {
                            tbl_Model = require("../../models/client_terms_conditions_log");
                            sentData = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Sub_Service_ID:val_Sub_Service_ID,
                                Terms_Conditions_Description_En: val_Terms_Conditions_Description_En,
                                Terms_Conditions_Description_Ar: val_Terms_Conditions_Description_Ar,
                                Inserted_By: req.body.Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime(),
                                Is_Suspended: false
                            });
                        } else{
                            tbl_Model = require("../../models/business_terms_conditions_log");
                            sentData = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                User_ID:val_User_ID,
                                Sub_Service_ID:val_Sub_Service_ID,
                                Terms_Conditions_Description_En: val_Terms_Conditions_Description_En,
                                Terms_Conditions_Description_Ar: val_Terms_Conditions_Description_Ar,
                                Inserted_By: req.body.Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime(),
                                Is_Suspended: false
                            });
                        }

                        new Promise(async (resolve, reject)=>{
                            var newList = "";
                            if (val_type=="client") {
                                newList = await fun_insert_row.insert_row("client_terms_conditions_log",sentData);
                            } else{
                                newList = await fun_insert_row.insert_row("business_terms_conditions_log",sentData);
                            }                    
                            resolve(newList);
                        }).then((insert_Flg) => {
                            var result = ""
                            if (!insert_Flg) {
                            //#region msg 1 insert process failed
                            get_Message_Promise = new Promise(async (resolve, reject)=>{
                                var result = await fun_handled_messages.get_handled_message(langTitle,1);
                                resolve(result);
                            }).then((msg) => {
                                res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                            })
                            //#endregion
                            } else {
                            //#region msg 293 insert privacy policy process successed
                            new Promise(async (resolve, reject)=>{
                                result = await fun_handled_messages.get_handled_message(langTitle,293);
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

    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
      }
};