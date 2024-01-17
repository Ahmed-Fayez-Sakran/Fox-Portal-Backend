//#region Global Variables
const tbl_Service = require("../../services/courier_categories_settings");
var tbl_Model = require("../../models/courier_details");
var langTitle = "";
var recievedData = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');

const fun_check_existancy = require('../../helpers/fun_check_title_existancy');
const fun_insert_row = require('../../helpers/fun_insert_row');
const fun_update_row = require('../../helpers/fun_update_row');
const fun_Update_Suspend_Status_Many_Rows = require('../../helpers/fun_Update_Suspend_Status_Many_Rows');
const fun_insert_rows = require('../../helpers/fun_insert_rows');
const ObjectId = require('mongodb').ObjectId;
const logger = require('../../utils/logger');
//#endregion

exports.get_Data_By_SuspendStatus =  async(req, res) => {
    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        const suspendStatus = req.params.suspendStatus;
        var val_Page_Number = req.params.page_number;
        console.log("val_Page_Number ="+val_Page_Number)
        //#endregion
  
        let get_DataTable_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.get_Data_By_SuspendStatus(suspendStatus,val_Page_Number);
            resolve(returnedList);
        });
          
        let get_Message_Promise = new Promise(async (resolve, reject)=>{
            var result = ""
            //#region Get Message based on suspend Status and language Title
            if (suspendStatus=="only-true"){
                result = await fun_handled_messages.get_handled_message(langTitle,242);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,243);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,244);
            }else{
                result = await fun_handled_messages.get_handled_message(langTitle,22);
            }
            //#endregion
            resolve(result);
        });

        Promise.all([get_DataTable_Promise , get_Message_Promise]).then((results) => {console.log("results[0]:"+results[0])
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

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};

exports.Add_Courier_Category =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Courier_Categories_LKP_ID = req.body.Courier_Categories_LKP_ID;
        var val_Vehicle_ID = req.body.Vehicle_ID;        
        var val_Size = req.body.Size;
        var val_Description_En = req.body.Description_En;
        var val_Description_Ar = req.body.Description_Ar;
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion

        let check_Courier_Category_ID_Promise = new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("courier_categories_lkp",val_Courier_Categories_LKP_ID);
            resolve(returnedList);
        });

        let check_Vehicle_ID_Promise = new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("vehicles_data",val_Vehicle_ID);
            resolve(returnedList);
        });

        Promise.all([check_Courier_Category_ID_Promise , check_Vehicle_ID_Promise]).then((results) => {
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
                new Promise(async(resolve, reject) => {
                    var returnedList = await tbl_Service.check_Existancy(val_Vehicle_ID , val_Courier_Categories_LKP_ID);
                    resolve(returnedList);
                }).then(Exist_Flg => {
                    if (Exist_Flg[1]) {
                        //#region msg 246 already exist
                        new Promise(async (resolve, reject)=>{
                            let result = await fun_handled_messages.get_handled_message(langTitle,246);
                            resolve(result);
                        }).then((msg) => {
                            res.status(400).json({ data: [] , message: msg , status: "already exist" }); 
                        })
                        //#endregion
                    } else{

                        var sentData = new tbl_Model({
                            Serial_Number: val_Serial_Number,
                            Courier_Categories_LKP_ID: new ObjectId(val_Courier_Categories_LKP_ID),
                            Vehicle_ID: new ObjectId(val_Vehicle_ID),
                            Size: val_Size,
                            Description_En: val_Description_En,
                            Description_Ar: val_Description_Ar,
                            Inserted_By: val_Inserted_By,
                            Inserted_DateTime: now_DateTime.get_DateTime()
                        });

                        new Promise(async (resolve, reject)=>{
                            const newList = await fun_insert_rows.insert_rows("courier_details" , sentData);
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
                                //#region msg insert successed
                                new Promise(async (resolve, reject)=>{
                                    let result = await fun_handled_messages.get_handled_message(langTitle,245);
                                    resolve(result);
                                }).then((msg) => {
                                    res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                })
                                //#endregion
                            }
                        })

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

exports.update_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = (req.params.id).trim();
        var val_Description_En = req.body.Description_En;
        var val_Description_Ar = req.body.Description_Ar;
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("courier_details",val_ID);
            resolve(exist);
        }).then((id_Exist) => {
            if (!id_Exist) {
                //#region ID is not exist in DB msg 14
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,14);
                    resolve(result);
                }).then((msg) => {        
                    res.status(400).json({ data: [] , message: msg, status: "id not exist" });
                })
                //#endregion
            } else {
                //#region update process
                let recievedData = new tbl_Model({
                    Description_En: val_Description_En,
                    Description_Ar: val_Description_Ar,
                    Updated_By: val_Updated_By,
                    Updated_DateTime: now_DateTime.get_DateTime(),
                    Is_Suspended: val_Is_Suspended
                },{ new: true});
                
                new Promise(async (resolve, reject)=>{
                    const newList = await fun_update_row.update_row(val_ID, "courier_details", recievedData , false);
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
                                var result = await fun_handled_messages.get_handled_message(langTitle,247);
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

exports.update_Suspend_Status_One_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = req.body.id;
        var status = req.params.status;
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("courier_details",val_ID);
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
                        const newList = await fun_update_row.update_row(val_ID, "courier_details", recievedData , false);
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,248);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,249);
                                }
                                resolve(result);
                            }).then((msg) => {
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
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("courier_details",req.body.data);
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
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "courier_details");
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,250);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,251);
                                }
                                resolve(result);
                            }).then((msg) => {
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
