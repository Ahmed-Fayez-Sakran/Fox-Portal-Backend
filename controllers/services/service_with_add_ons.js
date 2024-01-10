//#region Global Variables
const tbl_Service = require("../../services/services_with_addons_service");
//const common_functions = require("../../services/lkp_common_functions");
var tbl_Model = require("../../models/services_with_addons");
var langTitle = ""
var lkp_Table_Name = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');
const fun_check_existancy = require('../../helpers/fun_check_title_existancy');
const fun_insert_row = require('../../helpers/fun_insert_row');
const fun_update_row = require('../../helpers/fun_update_row');
const fun_Update_Suspend_Status_Many_Rows = require('../../helpers/fun_Update_Suspend_Status_Many_Rows');
const logger = require('../../utils/logger');
//#endregion

exports.get_Data_By_SuspendStatus =  async(req, res) => {
    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        const suspendStatus = req.params.suspendStatus;
        var val_Page_Number = req.params.page_number;
        //#endregion
  
        let get_DataTable_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.get_Data_By_SuspendStatus(suspendStatus,val_Page_Number);
            resolve(returnedList);
        });
          
        let get_Message_Promise = new Promise(async (resolve, reject)=>{
            var result = ""
            //#region Get Message based on suspend Status and language Title
            if (suspendStatus=="only-true"){
                result = await fun_handled_messages.get_handled_message(langTitle,71);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,72);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,73);
            }else{
                result = await fun_handled_messages.get_handled_message(langTitle,62);
            }
            //#endregion
            resolve(result);
        });

        Promise.all([get_DataTable_Promise , get_Message_Promise]).then((results) => {
            if (results[0].length<=0) {
                if ((suspendStatus.trim() ==="only-true")||(suspendStatus.trim() ==="only-false")||(suspendStatus.trim() ==="all")) {
                  res.status(200).json({ data: [] , message: results[1] , status: "empty rows" });
                } else {
                    res.status(400).json({ data: [] , message: results[1] , status: "wrong url" });
                }
            } else {
                res.status(200).json({ data: results[0] , message: "" , status: "rows selected" });
            }
        });

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};

exports.create_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var New_Serial_Number = req.body.Serial_Number;
        var val_Addons_ID = req.body.Addons_ID;
        var val_Sub_Service_ID = req.body.Sub_Service_ID;
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion
        
        //#region check IDs Existancy Promise
        let check_Addons_ID_Existancy_Promise = new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("addons_lkp",val_Addons_ID);
            resolve(returnedList);
        });
        
        let check_Sub_Service_ID_Existancy_Promise = new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
            resolve(returnedList);
        });
        //#endregion

        Promise.all([check_Addons_ID_Existancy_Promise , check_Sub_Service_ID_Existancy_Promise]).then((results) => {
            if (results[0]==false || results[1]==false) {
                //#region ID is not exist in DB msg 14
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,14);
                    resolve(result);
                }).then((msg) => {        
                    res.status(400).json({ data: [] , message: msg, status: "wrong id" });
                })
                //#endregion
            } else {
                //#region check existancy and insert process
                new Promise(async (resolve, reject)=>{
                    var returnedList = await tbl_Service.check_Existancy("" , "insert" , val_Addons_ID , val_Sub_Service_ID);
                    resolve(returnedList);
                }).then((Exist_Flg) => {
                    if (Exist_Flg) {
                        //#region already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,74);
                            resolve(msg)
                        }).then((msg) => {
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else {
                        //#region insert process
                        let sentData = new tbl_Model({
                            Serial_Number: New_Serial_Number,
                            Addons_ID: val_Addons_ID,
                            Sub_Service_ID: val_Sub_Service_ID,                            
                            Inserted_By: val_Inserted_By,
                            Inserted_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended: false
                        });
                        new Promise(async (resolve, reject)=>{
                            const newList = await fun_insert_row.insert_row("services_with_addons",sentData);
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
                                //#region msg insert process successed
                                new Promise(async (resolve, reject)=>{
                                    var result = await fun_handled_messages.get_handled_message(langTitle,75);
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

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};

exports.update_Suspend_Status_One_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = (req.params.id).trim();
        var val_Updated_By = req.body.Updated_By;
        // var val_Addons_ID = req.body.Addons_ID;
        // var val_Sub_Service_ID = req.body.Sub_Service_ID;
        // var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("services_with_addons",val_ID);
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
                //#region ID exist in DB then update process
                let recievedData = new tbl_Model({
                        Updated_By: val_Updated_By,
                        Updated_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: true
                },{ new: true});
    
                new Promise(async (resolve, reject)=>{
                        const newList = await fun_update_row.update_row(val_ID, "services_with_addons", recievedData , false);
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
                            new Promise(async (resolve, reject)=>{
                                let result= await fun_handled_messages.get_handled_message(langTitle,76);                                
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: update_flg , message: msg , status: "updated successed" });
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

exports.update_Suspend_Status_Many_Rows =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var status = req.params.status;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("services_with_addons",req.body.data);
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
                if (status!="suspend"){
                    //#region wrong url msg 62
                    new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,62);
                        resolve(result);
                    }).then((msg) => {        
                        res.status(400).json({ data: [] , message: msg, status: "wrong url" });
                    })
                    //#endregion
                } else {
                    
                    new Promise(async (resolve, reject)=>{
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "services_with_addons");
                        resolve(exist);
                    }).then((Records_Updated) => {
                        if (!Records_Updated) {
                            //#region msg update process failed
                            new Promise(async (resolve, reject)=>{
                                result = await fun_handled_messages.get_handled_message(langTitle,2);
                                resolve(result);
                            }).then((msg) => {
                                res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                            })
                            //#endregion
                        } else {
                            //#region msg update process successed
                            new Promise(async (resolve, reject)=>{                            
                                let result=""
                                result = await fun_handled_messages.get_handled_message(langTitle,77);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: Records_Updated , message: msg , status: "updated successed" });
                            })
                            //#endregion
                        }
                    })
                }
            }
        })

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};