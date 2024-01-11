//#region Global Variables
const tbl_Service = require("../../services/main_service_settings");
var tbl_Model = require("../../models/main_services_lkp");
var langTitle = ""
var lkp_Table_Name = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');
const fun_update_row = require('../../helpers/fun_update_row');
const fun_check_existancy = require('../../helpers/fun_check_title_existancy');
const fun_Update_Suspend_Status_Many_Rows = require('../../helpers/fun_Update_Suspend_Status_Many_Rows');
const logger = require('../../utils/logger');
//#endregion

exports.get_Data_By_SuspendStatus =  async(req, res) => {
    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        const suspendStatus = req.params.suspendStatus;
        //#endregion
  
        let get_DataTable_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.get_Data_By_SuspendStatus(suspendStatus);
            resolve(returnedList);
        });
          
        let get_Message_Promise = new Promise(async (resolve, reject)=>{
            var result = ""
            //#region Get Message based on suspend Status and language Title
            if (suspendStatus=="only-true") {
                result = await fun_handled_messages.get_handled_message(langTitle,78);
            } else if(suspendStatus=="only-false") {
                result = await fun_handled_messages.get_handled_message(langTitle,79);
            } else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,80);
            } else {
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

exports.update_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = (req.params.id).trim();
        var val_Service_Title_En = req.body.Service_Title_En;
        var val_Service_Title_Ar = req.body.Service_Title_Ar;
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        //#region Check Existancy By ID
        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("main_services_lkp",val_ID);
            resolve(returnedList);
        }).then((results) => {

            if (!results) {
                //#region ID is not exist in DB msg 14
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,14);
                    resolve(result);
                }).then((msg) => {        
                    res.status(400).json({ data: [] , message: msg, status: "wrong id" });
                })
                //#endregion
            } else {
                //#region Check Title Existancy
                let check_Ar_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    var returnedList = await fun_check_existancy.check_title_existancy("main_services_lkp" , val_ID , "update" , "ar" , val_Service_Title_Ar , "" , "" );
                    resolve(returnedList);
                });
        
                let check_En_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    var returnedList = await fun_check_existancy.check_title_existancy("main_services_lkp" , val_ID , "update" , "en" , val_Service_Title_En , "" , "" );
                    resolve(returnedList);
                });
        
                Promise.all([check_Ar_Title_Existancy_Promise , check_En_Title_Existancy_Promise]).then((results) => {
        
                    console.log("check_Ar_Title_Existancy_Promise = "+results[0])
                    console.log("check_En_Title_Existancy_Promise = "+results[1])
                    
                    if (results[0]==true && results[1]==true) {
                        //#region Both En & Ar already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,81);
                            resolve(msg)
                        }).then((msg) => {
                            msg = msg.replace("Service_Title_Ar", val_Service_Title_Ar);
                            msg = msg.replace("Service_Title_En", val_Service_Title_En);
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else if (results[0]==true) {
                        //#region Ar already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,82);
                        }).then((msg) => {
                            msg = msg.replace("Service_Title_Ar", val_Service_Title_Ar);                            
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else if (results[1]==true) {
                        //#region En already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,83);
                        }).then((msg) => {
                            msg = msg.replace("Service_Title_En", val_Service_Title_En);
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else {
                        //#region update process
                        let recievedData = new tbl_Model({
                            Service_Title_En: val_Service_Title_En,
                            Service_Title_Ar: val_Service_Title_Ar,
                            Updated_By: val_Updated_By,
                            Updated_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended: val_Is_Suspended
                        },{ new: true});

                        new Promise(async (resolve, reject)=>{
                            const newList = await fun_update_row.update_row(val_ID, "main_services_lkp", recievedData , false);
                            resolve(newList);
                        }).then((update_flg) => {
                            if(!update_flg){
                                //#region msg 2 update process failed
                                new Promise(async (resolve, reject)=>{
                                    let result = await fun_handled_messages.get_handled_message(langTitle,2);
                                    resolve(result);
                                }).then((msg) => {
                                    res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                                 })          
                                //#endregion
                            }else {
                                //#region msg update process successed
                                new Promise(async (resolve, reject)=>{
                                    var result = await fun_handled_messages.get_handled_message(langTitle,84);
                                    resolve(result);
                                }).then((msg) => {

                                    //#region Update Suspend Status for all Sub-Services related to this Main Service
                                    new Promise(async (resolve, reject)=>{
                                        var updated = await tbl_Service.Update_SuspendStatus_SubServices_In_Main_Service(val_Is_Suspended,val_ID);
                                        resolve(updated);
                                    }).then((updated) => {                                        
                                        if (langTitle=="en") {
                                            msg = msg.replace("Service_Title_En", val_Service_Title_En);
                                        } else {
                                            msg = msg.replace("Service_Title_Ar", val_Service_Title_Ar);
                                        }
                                        res.status(200).json({ data: update_flg , message: msg , status: "updated successed" });
                                    })
                                    //#endregion

                                })
                                //#endregion
                            }
                        })
                        //#endregion
                    }

                });
                //#endregion
            }

        })
        //#endregion

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};

exports.update_Suspend_Status_One_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = req.body.id;
        var status = req.params.status;
        var val_Service_Title_En = req.body.Service_Title_En;
        var val_Service_Title_Ar = req.body.Service_Title_Ar;
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("main_services_lkp",val_ID);
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
                //#region ID exist in DB
                if ( (status!="activate") && (status!="suspend") ){
                    //#region wrong url msg 62
                    new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,62);
                        resolve(result);
                    }).then((msg) => {        
                        res.status(400).json({ data: [] , message: msg, status: "wrong url" });
                    })
                    //#endregion
                } else {
                    if (status=="activate") {
                        val_Is_Suspended = false;
                    } else {
                        val_Is_Suspended = true;
                    }
                    //#region update process
                    let recievedData = new tbl_Model({
                        Updated_By: val_Updated_By,
                        Updated_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: val_Is_Suspended
                    },{ new: true});
    
                    new Promise(async (resolve, reject)=>{
                        const newList = await fun_update_row.update_row(val_ID, "main_services_lkp", recievedData , false);
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
                                let result=""
                                if (status=="activate") {
                                    result = await fun_handled_messages.get_handled_message(langTitle,87);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,88);
                                }
                                resolve(result);
                            }).then((msg) => {

                                //#region Update Suspend Status for all Sub-Services related to this Main Service
                                new Promise(async (resolve, reject)=>{
                                    var updated = await tbl_Service.Update_SuspendStatus_SubServices_In_Main_Service(val_Is_Suspended,val_ID);
                                    resolve(updated);
                                })
                                //#endregion

                                if (langTitle=="en") {
                                    msg = msg.replace("Service_Title_En", val_Service_Title_En);
                                } else {
                                    msg = msg.replace("Service_Title_Ar", val_Service_Title_Ar);
                                }
                                res.status(200).json({ data: update_flg , message: msg , status: "updated successed" });
                            })
                            //#endregion
                        }
                    })
                    //#endregion
                }
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
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("main_services_lkp",req.body.data);
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

                if ( (status!="activate") && (status!="suspend") ){
                    //#region wrong url msg 62
                    new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,62);
                        resolve(result);
                    }).then((msg) => {        
                        res.status(400).json({ data: [] , message: msg, status: "wrong url" });
                    })
                    //#endregion
                } else {
                    //#region update process
                    new Promise(async (resolve, reject)=>{
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "main_services_lkp");
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
                                if (status=="activate") {
                                    val_Is_Suspended = false;
                                    result = await fun_handled_messages.get_handled_message(langTitle,85);
                                } else {
                                    val_Is_Suspended = true;
                                    result = await fun_handled_messages.get_handled_message(langTitle,86);
                                }
                                resolve(result);
                            }).then((msg) => {

                                //#region Update Suspend Status for all Sub-Services related to this Main Services
                                new Promise(async (resolve, reject)=>{
                                    var updated = await tbl_Service.Update_SuspendStatus_SubServices_In_Main_Services(val_Is_Suspended,req.body.data);
                                    resolve(updated);
                                })
                                //#endregion

                                res.status(200).json({ data: Records_Updated , message: msg , status: "updated successed" });
                            })
                            //#endregion
                        }
                    })
                    //#endregion
                }
            }
        })

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};
