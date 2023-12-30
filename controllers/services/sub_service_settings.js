//#region Global Variables
const tbl_Service = require("../../services/sub_service_settings");
//const common_functions = require("../../services/lkp_common_functions");
var tbl_Model = require("../../models/Sub_Services_LKP");
var langTitle = ""
var lkp_Table_Name = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');
const fun_check_existancy = require('../../helpers/fun_check_title_existancy');
const fun_update_row = require('../../helpers/fun_update_row');
const fun_Update_Suspend_Status_Many_Data_Rows = require('../../helpers/fun_Update_Suspend_Status_Many_Rows');
//const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');
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
            if (suspendStatus=="only-true") {
                result = await fun_handled_messages.get_handled_message(langTitle,19);
            } else if(suspendStatus=="only-false") {
                result = await fun_handled_messages.get_handled_message(langTitle,20);
            } else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,21);
            } else {
                result = await fun_handled_messages.get_handled_message(langTitle,22);
            }
            //#endregion
            resolve(result);
        });

        Promise.all([get_DataTable_Promise , get_Message_Promise]).then((results) => {
            if (!results[0]) {
                if ((suspendStatus.trim() ==="only-true")||(suspendStatus.trim() ==="only-false")||(suspendStatus.trim() ==="all")) {
                  res.status(200).json({ data: [] , message: results[1] , status: "empty rows" });
                } else {
                    res.status(404).json({ data: [] , message: results[1] , status: "wrong url" });
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
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_ID);
            resolve(returnedList);
        }).then((results) => {

            if (!results) {
                //#region ID is not exist in DB msg 22
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,22);
                    resolve(result);
                }).then((msg) => {        
                    res.status(400).json({ data: [] , message: msg, status: "wrong id" });
                })
                //#endregion
            } else {

                new Promise(async (resolve, reject)=>{
                    const exist = await fun_check_existancy.check_title_existancy("sub_services_lkp",val_ID,"update",req.body.Sub_Service_Title_Ar,req.body.Sub_Service_Title_En);
                   resolve(exist);
                }).then((title_Exist) => {
                    if(title_Exist){
                        //#region msg 23 already exist
                        new Promise(async (resolve, reject)=>{
                            var result = await fun_handled_messages.get_handled_message(langTitle,23);
                            resolve(result);
                        }).then((msg) => {
                            msg = msg.replace("Sub_Service_Title_En", req.body.Sub_Service_Title_En);
                            msg = msg.replace("Sub_Service_Title_Ar", req.body.Sub_Service_Title_Ar);
                            res.status(200).json({ data: [] , message: msg , status: "already exist" });
                        })
                        //#endregion
                    }else {
                        //#region update process
                        let recievedData = new tbl_Model({
                            Sub_Service_Title_En: req.body.Sub_Service_Title_En,
                            Sub_Service_Title_Ar: req.body.Sub_Service_Title_Ar,
                            Updated_By: req.body.Updated_By,
                            Updated_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended: req.body.Is_Suspended
                          },{ new: true});
                        new Promise(async (resolve, reject)=>{
                            const newList = await fun_update_row.update_row(val_ID, "sub_services_lkp", recievedData , false);
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
                                //#region msg 24 update process successed
                                new Promise(async (resolve, reject)=>{
                                    var result = await fun_handled_messages.get_handled_message(langTitle,24);
                                    resolve(result);
                                }).then((msg) => {
                                    if (langTitle=="en") {
                                        msg = msg.replace("Sub_Service_Title_En", req.body.Sub_Service_Title_En);
                                    } else {
                                        msg = msg.replace("Sub_Service_Title_Ar", req.body.Sub_Service_Title_Ar);
                                    }
                                    res.status(200).json({ data: flg , message: msg , status: "updated successed" });
                                })
                                //#endregion
                            }
                        })
                        //#endregion
                    }
                })

            }

        })

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};

exports.updateMany_Rows_Data =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var status = req.params.status;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("sub_services_lkp",req.body.data);
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
                
                new Promise(async (resolve, reject)=>{
                    var exist = await fun_Update_Suspend_Status_Many_Data_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "sub_services_lkp");
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
                                result = await fun_handled_messages.get_handled_message(langTitle,25);
                            } else {
                                result = await fun_handled_messages.get_handled_message(langTitle,26);
                            }
                            resolve(result);
                        }).then((msg) => {
                            res.status(200).json({ data: Records_Updated , message: msg , status: "updated successed" });
                        })
                        //#endregion
                    }
                })

            }
        })

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};