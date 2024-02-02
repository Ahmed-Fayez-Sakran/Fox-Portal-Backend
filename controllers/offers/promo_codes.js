//#region Global Variables
const tbl_Service = require("../../services/promo_code_data");
var tbl_Model = require("../../models/promo_code_data");
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
                result = await fun_handled_messages.get_handled_message(langTitle,264);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,265);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,263);
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

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};

exports.insert_promo_code_data =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Code = req.body.Code;
        var val_Title_En = req.body.Title_En;
        var val_Title_Ar = req.body.Title_Ar;
        var val_Percentage_Rate = req.body.Percentage_Rate;
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion

        let check_Code_Existancy_Promise = new Promise(async (resolve, reject)=>{
            const newList = await tbl_Service.check_Code_Existancy("insert" , "" , val_Code );
            resolve(newList);
        });

        let check_Title_En_Existancy_Promise = new Promise(async (resolve, reject)=>{
            const newList = await tbl_Service.check_Title_En_Existancy("insert" , "" , val_Title_En );
            resolve(newList);
        });

        let check_Title_Ar_Existancy_Promise = new Promise(async (resolve, reject)=>{
            const newList = await tbl_Service.check_Title_Ar_Existancy("insert" , "" , val_Title_Ar );
            resolve(newList);
        });

        Promise.all([check_Code_Existancy_Promise , check_Title_En_Existancy_Promise , check_Title_Ar_Existancy_Promise]).then((results) => {
            
            //#region check Code
            if (results[0].length>0) {
                //#region Code already exist
                if (!results[0][0].Is_Suspended) {
                    //#region row already exist and active
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,266);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: results[0][0] , message: msg , status: "already exist activated" });
                    })
                    //#endregion
                } else {
                    //#region row already exist and suspended
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,267);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: results[0][0] , message: msg , status: "already exist suspended" });
                    })
                    //#endregion
                }
                //#endregion
            }
            //#endregion

            //#region check Title_En
            else if (results[1].length>0) {
                //#region Title_En already exist
                if (!results[1][0].Is_Suspended) {
                    //#region row already exist and active
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,279);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: results[1][0] , message: msg , status: "already exist activated" });
                    })
                    //#endregion
                } else {
                    //#region row already exist and suspended
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,280);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: results[1][0] , message: msg , status: "already exist suspended" });
                    })
                    //#endregion
                }
                //#endregion
            }
            //#endregion

            //#region check Title_Ar
            else if (results[2].length>0) {
                //#region Title_En already exist
                if (!results[2][0].Is_Suspended) {
                    //#region row already exist and active
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,281);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: results[2][0] , message: msg , status: "already exist activated" });
                    })
                    //#endregion
                } else {
                    //#region row already exist and suspended
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,282);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: results[2][0] , message: msg , status: "already exist suspended" });
                    })
                    //#endregion
                }
                //#endregion
            }
            //#endregion

            else {
                //#region prepare Data Object for insertion
                var sentData = new tbl_Model({
                    Serial_Number: val_Serial_Number,
                    Code: val_Code,
                    Title_En: val_Title_En,
                    Title_Ar:val_Title_Ar,
                    Percentage_Rate: val_Percentage_Rate,
                    Inserted_By: val_Inserted_By,
                    Inserted_DateTime: now_DateTime.get_DateTime(),
                    Is_Suspended: false
                });
                //#endregion

                //#region insert directly
                new Promise(async (resolve, reject)=>{
                    const newList = await fun_insert_row.insert_row("promo_code_data",sentData);
                    resolve(newList);
                }).then((inserted_Flag) => {
                    if (!inserted_Flag) {
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
                            var result = await fun_handled_messages.get_handled_message(langTitle,268);
                            resolve(result);
                        }).then((msg) => {
                            res.status(200).json({ data: inserted_Flag , message: msg , status: "insert successed" });                            
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

exports.update_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = (req.params.id).trim();
        var val_Code = req.body.Code;
        var val_Title_En = req.body.Title_En;
        var val_Title_Ar = req.body.Title_Ar;
        var val_Percentage_Rate = req.body.Percentage_Rate;
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("promo_code_data",val_ID);
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
                //#region ID exist in DB

                let check_Code_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.check_Code_Existancy("update" , val_ID , val_Code );
                    resolve(newList);
                });
        
                let check_Title_En_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.check_Title_En_Existancy("update" , val_ID , val_Title_En );
                    resolve(newList);
                });
        
                let check_Title_Ar_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.check_Title_Ar_Existancy("update" , val_ID , val_Title_Ar );
                    resolve(newList);
                });

                Promise.all([check_Code_Existancy_Promise , check_Title_En_Existancy_Promise , check_Title_Ar_Existancy_Promise]).then((results) => {
                    
                    //#region check Code
                    if (results[0].length>0) {
                        //#region Code already exist
                        if (!results[0][0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,266);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[0][0] , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,267);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[0][0] , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    }
                    //#endregion
        
                    //#region check Title_En
                    else if (results[1].length>0) {
                        //#region Title_En already exist
                        if (!results[1][0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,279);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[1][0] , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,280);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[1][0] , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    }
                    //#endregion
        
                    //#region check Title_Ar
                    else if (results[2].length>0) {
                        //#region Title_Ar already exist
                        if (!results[2][0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,281);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[2][0] , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,282);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[2][0] , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    }
                    //#endregion
        
                    else {
                        //#region prepare Data Object for update
                        let recievedData = new tbl_Model({
                            Code: val_Code,
                            Title_En: val_Title_En,
                            Title_Ar:val_Title_Ar,
                            Percentage_Rate: val_Percentage_Rate,
                            Updated_By: val_Updated_By,
                            Updated_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended: val_Is_Suspended
                        },{ new: true});
                        //#endregion
                        
                        //#region update process
                        new Promise(async (resolve, reject)=>{
                            const newList = await fun_update_row.update_row(val_ID, "promo_code_data", recievedData , false);
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
                                        var result = await fun_handled_messages.get_handled_message(langTitle,283);
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
        var val_Code = req.body.Code;
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("promo_code_data",val_ID);
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
                        const newList = await fun_update_row.update_row(val_ID, "promo_code_data", recievedData , false);
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

                            //#region update_Suspend_Status - > Client_Promo_Code_Log
                            new Promise(async (resolve, reject)=>{
                                const updateList = await tbl_Service.update_Suspend_Status(val_ID,"client_promo_code_log",val_Updated_By,val_Is_Suspended);
                                resolve(updateList);
                            })
                            //#endregion

                            //#region update_Suspend_Status - > Business_Promo_Code_Log
                            new Promise(async (resolve, reject)=>{
                                const updateList = await tbl_Service.update_Suspend_Status(val_ID,"business_promo_code_log",val_Updated_By,val_Is_Suspended);
                                resolve(updateList);
                            })
                            //#endregion

                            new Promise(async (resolve, reject)=>{
                                let result=""
                                if (status=="activate") {
                                    result = await fun_handled_messages.get_handled_message(langTitle,284);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,285);
                                }
                                resolve(result);
                            }).then((msg) => {
                                msg = msg.replace("Code", val_Code);
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
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("promo_code_data",req.body.data);
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
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "promo_code_data");
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
                            
                            //#region update_Suspend_Status - > Client_Promo_Code_Log
                            new Promise(async (resolve, reject)=>{
                                const updateList = await tbl_Service.update_Suspend_Status_Many_Rows(req.body.data,"client_promo_code_log",val_Updated_By,status);
                                resolve(updateList);
                            })
                            //#endregion

                            //#region update_Suspend_Status - > Business_Promo_Code_Log
                            new Promise(async (resolve, reject)=>{
                                const updateList = await tbl_Service.update_Suspend_Status_Many_Rows(req.body.data,"business_promo_code_log",val_Updated_By,status);
                                resolve(updateList);
                            })
                            //#endregion

                            new Promise(async (resolve, reject)=>{
                                let result=""
                                if (status=="activate") {
                                    result = await fun_handled_messages.get_handled_message(langTitle,286);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,287);
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

exports.update_Suspend_Status_One_Row_Per_Type =  async(req, res) => {
    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = req.body.id;
        var status = req.params.status;
        var val_Code = req.body.Code;
        var val_Is_Suspended = false;
        var val_type = req.params.type;
        var val_Updated_By = req.body.Updated_By;
        var slelected_model = "";
        //#endregion

        new Promise(async (resolve, reject)=>{
            var returnedList = "";
            if (val_type=="client") {
                returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("client_promo_code_log",val_ID);
                slelected_model = require("../../models/client_promo_code_log");
            } else {
                returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_promo_code_log",val_ID);
                slelected_model = require("../../models/business_promo_code_log");
            }            
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
                    let recievedData = new slelected_model({
                        Updated_By: val_Updated_By,
                        Updated_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: val_Is_Suspended
                    },{ new: true});

                    new Promise(async (resolve, reject)=>{
                        var newList = "";
                        if (val_type=="client") {
                            newList = await fun_update_row.update_row(val_ID, "client_promo_code_log", recievedData , false);
                        } else {
                            newList = await fun_update_row.update_row(val_ID, "business_promo_code_log", recievedData , false);
                        }
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,284);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,285);
                                }
                                resolve(result);
                            }).then((msg) => {
                                msg = msg.replace("Code", val_Code);
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

exports.get_Data_By_SuspendStatus_By_Type =  async(req, res) => {
    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        const suspendStatus = req.params.suspendStatus;
        var val_Page_Number = req.params.page_number;
        console.log("suspendStatus = "+suspendStatus)
        console.log("val_Page_Number = "+val_Page_Number)
        //#endregion
  
        let get_DataTable_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.get_Data_By_SuspendStatus_Type(suspendStatus,val_Page_Number);
            resolve(returnedList);
        });
          
        let get_Message_Promise = new Promise(async (resolve, reject)=>{
            var result = ""
            //#region Get Message based on suspend Status and language Title
            if (suspendStatus=="only-true"){
                result = await fun_handled_messages.get_handled_message(langTitle,264);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,265);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,263);
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


    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};

exports.assign_promo_code =  async(req, res) => {
    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_type = req.body.type;
        var val_Sub_Service_ID = req.body.Sub_Service_ID;
        var val_User_ID = "";
        var val_Promo_Code_ID = req.body.Promo_Code_ID;
        var val_Start_Date = req.body.Start_Date;
        var val_End_Date = req.body.End_Date;
        var val_Duration_Per_Days = req.body.Duration_Per_Days;
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion

        let check_sub_services_lkp_Existancy_Promise = new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
            resolve(exist);
        });

        let check_promo_code_data_Existancy_Promise = new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("promo_code_data",val_Promo_Code_ID);
            resolve(exist);
        });

        let check_user_data_Existancy_Promise = "";

        if (val_type=="business") {
            //#region business
            val_User_ID = req.body.User_ID;
            check_user_data_Existancy_Promise = new Promise(async (resolve, reject)=>{
                var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
                resolve(exist);
            });
            //#endregion
        }
        
        Promise.all([check_sub_services_lkp_Existancy_Promise , check_promo_code_data_Existancy_Promise , check_user_data_Existancy_Promise]).then((results) => {
            if ( (val_type=="business") && ((!results[0]) || (!results[1]) || (!results[2])) ) {
                //#region ID is not exist in DB msg 14
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,14);
                    resolve(result);
                }).then((msg) => {        
                    res.status(400).json({ data: [] , message: msg, status: "id not exist" });
                })
                //#endregion
            }
            else if ( (val_type=="client") && ((!results[0]) || (!results[1])) ) {
                //#region ID is not exist in DB msg 14
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,14);
                    resolve(result);
                }).then((msg) => {        
                    res.status(400).json({ data: [] , message: msg, status: "id not exist" });
                })
                //#endregion
            }
            else
            {
                //#region ID exist in DB
                new Promise(async (resolve, reject)=>{
                    var newList = "";                   
                    if (val_type=="business") {
                        newList = await tbl_Service.check_Promo_Code_Log_Existancy("business" , "insert" , "" , val_Sub_Service_ID , val_Promo_Code_ID , val_User_ID );
                    } else {
                        newList = await tbl_Service.check_Promo_Code_Log_Existancy("client" , "insert" , "" , val_Sub_Service_ID , val_Promo_Code_ID , val_User_ID );
                    }
                     resolve(newList);
                }).then((Exist_Flg) => {
                    if (Exist_Flg.length>0) {
                        //#region row already exist
                        if (!Exist_Flg[0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,266);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,267);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    } else {
                        //#region prepare Data Object for insertion
                        var slelected_model="";
                        var sentData = "";
                        var table_name = "";

                        if (val_type=="business") {
                            table_name = "business_promo_code_log";
                            slelected_model = require("../../models/business_promo_code_log");
                            sentData = new slelected_model({
                                Serial_Number: val_Serial_Number,
                                Sub_Service_ID: new ObjectId(val_Sub_Service_ID),
                                Promo_Code_ID: new ObjectId(val_Promo_Code_ID),
                                User_ID: new ObjectId(val_User_ID),
                                
                                Start_Date:val_Start_Date,
                                End_Date:val_End_Date,
                                Duration_Per_Days:val_Duration_Per_Days,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime(),
                                Is_Suspended: false
                            });
                        } else {
                            table_name = "client_promo_code_log";
                            slelected_model = require("../../models/client_promo_code_log");
                            sentData = new slelected_model({
                                Serial_Number: val_Serial_Number,
                                Sub_Service_ID: new ObjectId(val_Sub_Service_ID),
                                Promo_Code_ID: new ObjectId(val_Promo_Code_ID),
                                
                                Start_Date:val_Start_Date,
                                End_Date:val_End_Date,
                                Duration_Per_Days:val_Duration_Per_Days,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime(),
                                Is_Suspended: false
                            });
                        }                        
                        //#endregion

                        //#region insert process
                        new Promise(async (resolve, reject)=>{
                            const newList = await fun_insert_row.insert_row(table_name,sentData);
                            resolve(newList);
                        }).then((inserted_Flag) => {
                            if (!inserted_Flag) {
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
                                    var result = await fun_handled_messages.get_handled_message(langTitle,268);
                                    resolve(result);
                                }).then((msg) => {
                                    res.status(200).json({ data: inserted_Flag , message: msg , status: "insert successed" });                            
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
