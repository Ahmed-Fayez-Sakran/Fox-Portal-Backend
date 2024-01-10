//#region Global Variables
const tbl_Service = require("../../services/vehicle_settings");
var tbl_Model = require("../../models/vehicles_data");
var langTitle = "";
var recievedData = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');

const fun_check_existancy = require('../../helpers/fun_check_title_existancy');
const fun_insert_row = require('../../helpers/fun_insert_row');
const fun_insert_rows = require('../../helpers/fun_insert_rows');
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
                result = await fun_handled_messages.get_handled_message(langTitle,204);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,205);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,206);
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

exports.Insert_New_Vehicles_Advance_Notice_Period_Log =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Sub_Service_ID = req.body.Sub_Service_ID;
        var val_type = req.body.type;
        var val_user_id = req.body.user_id;
        var val_Model_ID = req.body.Model_ID;
        var val_Notice_Period_Per_Hours = req.body.Notice_Period_Per_Hours;
        var val_Inserted_By = req.body.Inserted_By;
        const Vehicles_sentData = [];
        var insert_object = "";
        //#endregion

        if (val_type=="General") {
            //#region (Passenger) Create New Vehicle Advance Notice Period
            let check_Sub_Service_ID_Existancy_Promise = new Promise(async (resolve, reject)=>{
                var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
                resolve(exist);
            });
    
            let check_Model_ID_Existancy_Promise = new Promise(async (resolve, reject)=>{
                var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("model_lkp",val_Model_ID);
                resolve(exist);
            });

            Promise.all([check_Sub_Service_ID_Existancy_Promise , check_Model_ID_Existancy_Promise]).then((results) => {
                if (results[0]==false && results[1]==false) {
                    //#region ID is not exist in DB msg 14
                    new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,14);
                        resolve(result);
                    }).then((msg) => {        
                        res.status(400).json({ data: [] , message: msg, status: "id not exist" });
                    })
                    //#endregion
                } else {
                    //#region insert process

                    new Promise(async (resolve, reject)=>{
                        var exist = await tbl_Service.Get_Vehicles_By_Model_ID(val_Model_ID);
                        resolve(exist);
                    }).then((Vehicles_IDs) => {
                        //#region prepare Data Object for insertion
                        tbl_Model = require("../../models/client_vehicles_advance_notice_period_log");

                        for (let i = 0; i < Vehicles_IDs.length; i++)
                        {
                            insert_object = new tbl_Model({
                                Vehicle_ID: Vehicles_IDs[i],        
                                Sub_Service_ID: val_Sub_Service_ID,
                                Notice_Period_Per_Hours: val_Notice_Period_Per_Hours,                        
                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime(),
                                Is_Suspended: false
                            });
                            Vehicles_sentData.push(insert_object);
                        }
                        //#endregion

                        if (Vehicles_sentData.length>0) {

                            new Promise(async (resolve, reject)=>{
                                const newList = await tbl_Service.Suspend_vehicles_advance_notice_period_log("client_vehicles_advance_notice_period_log" , Vehicles_IDs  , val_Inserted_By, "");
                                resolve(newList);
                            }).then((Suspend_Flg) => {

                                new Promise(async (resolve, reject)=>{
                                    const newList = await fun_insert_rows.insert_rows("client_vehicles_advance_notice_period_log" , Vehicles_sentData);
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
                                        //#region insert process succeeded
                                        new Promise(async (resolve, reject)=>{
                                            var result = await fun_handled_messages.get_handled_message(langTitle,207);
                                            resolve(result);
                                        }).then((msg) => {
                                            res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });                            
                                        })
                                        //#endregion
                                    }
                                })

                            })
                        }

                    })

                    //#endregion
                }
            })
            //#endregion
        } else {
            //#region (Business) Create New Vehicle Advance Notice Period
            let check_Sub_Service_ID_Existancy_Promise = new Promise(async (resolve, reject)=>{
                var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
                resolve(exist);
            });
    
            let check_Model_ID_Existancy_Promise = new Promise(async (resolve, reject)=>{
                var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("model_lkp",val_Model_ID);
                resolve(exist);
            });
    
            let check_User_ID_Existancy_Promise = new Promise(async (resolve, reject)=>{
                var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_user_id);
                resolve(exist);
            });

            Promise.all([check_Sub_Service_ID_Existancy_Promise , check_Model_ID_Existancy_Promise , check_User_ID_Existancy_Promise]).then((results) => {
                if (results[0]==false && results[1]==false && results[2]==false) {
                    //#region ID is not exist in DB msg 14
                    new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,14);
                        resolve(result);
                    }).then((msg) => {        
                        res.status(400).json({ data: [] , message: msg, status: "id not exist" });
                    })
                    //#endregion
                } else {
                    //#region insert process

                    new Promise(async (resolve, reject)=>{
                        var exist = await tbl_Service.Get_Vehicles_By_Model_ID(val_Model_ID);
                        resolve(exist);
                    }).then((Vehicles_IDs) => {
                        //#region prepare Data Object for insertion
                        tbl_Model = require("../../models/business_vehicles_advance_notice_period_log");

                        for (let i = 0; i < Vehicles_IDs.length; i++)
                        {
                            insert_object = new tbl_Model({
                                Vehicle_ID: Vehicles_IDs[i],
                                User_ID:val_user_id,
                                Sub_Service_ID: val_Sub_Service_ID,
                                Notice_Period_Per_Hours: val_Notice_Period_Per_Hours,                        
                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime(),
                                Is_Suspended: false
                            });
                            Vehicles_sentData.push(insert_object); 
                            //console.log("insert_object = "+insert_object)
                        }
                        //#endregion

                        if (Vehicles_sentData.length>0) {

                            new Promise(async (resolve, reject)=>{
                                const newList = await tbl_Service.Suspend_vehicles_advance_notice_period_log("business_vehicles_advance_notice_period_log" , Vehicles_IDs , val_Inserted_By , val_user_id);
                                resolve(newList);
                            }).then((Suspend_Flg) => {

                                new Promise(async (resolve, reject)=>{
                                    const newList = await fun_insert_rows.insert_rows("business_vehicles_advance_notice_period_log" , Vehicles_sentData);
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
                                        //#region insert process succeeded
                                        new Promise(async (resolve, reject)=>{
                                            var result = await fun_handled_messages.get_handled_message(langTitle,207);
                                            resolve(result);
                                        }).then((msg) => {
                                            res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });                            
                                        })
                                        //#endregion
                                    }
                                })

                            })
                        }

                    })

                    //#endregion
                }
            })
            //#endregion
        }

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};
