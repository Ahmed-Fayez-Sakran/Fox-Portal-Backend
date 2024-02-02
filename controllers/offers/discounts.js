//#region Global Variables
const tbl_Service = require("../../services/discounts");
var tbl_Model = require("../../models/discount_method_lkp");
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
                result = await fun_handled_messages.get_handled_message(langTitle,256);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,257);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,255);
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

exports.insert_discount =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Method_Title_En = req.body.Method_Title_En;
        var val_Method_Title_Ar = req.body.Method_Title_Ar;
        var val_Discount_Type_ID = req.body.Discount_Type_ID;
        var val_Percentage_Rate = ""; //req.body.Percentage_Rate
        var val_Fixed_Rate = "";      //req.body.Fixed_Rate
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("discount_type_lkp",val_Discount_Type_ID);
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

                let check_Title_En_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.check_Title_En_Existancy("insert" , "" , val_Method_Title_En );
                    resolve(newList);
                });
        
                let check_Title_Ar_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.check_Title_Ar_Existancy("insert" , "" , val_Method_Title_Ar );
                    resolve(newList);
                });
                Promise.all([check_Title_En_Existancy_Promise , check_Title_Ar_Existancy_Promise]).then((results) => {
                    
                    //#region check Title_En
                    if (results[0].length>0) {
                        //#region Title_En already exist
                        if (!results[0][0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,288);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[0][0] , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,289);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[0][0] , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    }
                    //#endregion

                    //#region check Title_Ar
                    else if (results[1].length>0) {
                        //#region Title_Ar already exist
                        if (!results[1][0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,290);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[1][0] , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,291);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[1][0] , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    }
                    //#endregion

                    else {
                        new Promise(async (resolve, reject)=>{
                            const newList = await tbl_Service.check_Existancy("insert" , "" , val_Method_Title_En  , val_Method_Title_Ar , val_Discount_Type_ID);
                            resolve(newList);
                        }).then((Exist_Flg) => {
                            if (Exist_Flg.length>0) {
                                //#region row already exist
                                if (!Exist_Flg[0].Is_Suspended) {
                                    //#region row already exist and active
                                    new Promise(async (resolve, reject)=>{
                                        let result = await fun_handled_messages.get_handled_message(langTitle,252);
                                        resolve(result);
                                    }).then((msg) => {
                                        res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist activated" });
                                    })
                                    //#endregion
                                } else {
                                    //#region row already exist and suspended
                                    new Promise(async (resolve, reject)=>{
                                        let result = await fun_handled_messages.get_handled_message(langTitle,253);
                                        resolve(result);
                                    }).then((msg) => {
                                        res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist suspended" });
                                    })
                                    //#endregion
                                }
                                //#endregion
                            } else {

                                //#region prepare Data Object for insertion
                                var sentData = "";
                                if (val_Discount_Type_ID=="652bb870ce64b5e00c6a8383") 
                                {
                                    //#region Fixed Value
                                    val_Fixed_Rate = req.body.Fixed_Rate;
                                    sentData = new tbl_Model({
                                        Serial_Number: val_Serial_Number,
                                        Method_Title_En: val_Method_Title_En,
                                        Method_Title_Ar: val_Method_Title_Ar,
                                        Discount_Type_ID: new ObjectId(val_Discount_Type_ID),
                                        Fixed_Rate:val_Fixed_Rate,
                                        Inserted_By: val_Inserted_By,
                                        Inserted_DateTime: now_DateTime.get_DateTime(),
                                        Is_Suspended: false
                                    });
                                    //#endregion
                                } 
                                else if (val_Discount_Type_ID=="652bb870ce64b5e00c6a8384") 
                                {
                                    //#region Percentage
                                    val_Percentage_Rate = req.body.Percentage_Rate;
                                    sentData = new tbl_Model({
                                        Serial_Number: val_Serial_Number,
                                        Method_Title_En: val_Method_Title_En,
                                        Method_Title_Ar: val_Method_Title_Ar,
                                        Discount_Type_ID: new ObjectId(val_Discount_Type_ID),
                                        Percentage_Rate:val_Percentage_Rate,
                                        Inserted_By: val_Inserted_By,
                                        Inserted_DateTime: now_DateTime.get_DateTime(),
                                        Is_Suspended: false
                                    });
                                    //#endregion
                                }
                                //#endregion

                                //#region insert directly
                                new Promise(async (resolve, reject)=>{
                                    const newList = await fun_insert_row.insert_row("discount_method_lkp",sentData);
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
                                            var result = await fun_handled_messages.get_handled_message(langTitle,254);
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
        var val_Method_Title_En = req.body.Method_Title_En;
        var val_Method_Title_Ar = req.body.Method_Title_Ar;
        var val_Discount_Type_ID = req.body.Discount_Type_ID;
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("discount_method_lkp",val_ID);
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
                let check_Title_En_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.check_Title_En_Existancy("update" , "" , val_Method_Title_En );
                    resolve(newList);
                });
        
                let check_Title_Ar_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.check_Title_Ar_Existancy("update" , "" , val_Method_Title_Ar );
                    resolve(newList);
                });
                Promise.all([check_Title_En_Existancy_Promise , check_Title_Ar_Existancy_Promise]).then((results) => {
                    
                    //#region check Title_En
                    if (results[0].length>0) {
                        //#region Title_En already exist
                        if (!results[0][0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,288);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[0][0] , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,289);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[0][0] , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    }
                    //#endregion

                    //#region check Title_Ar
                    else if (results[1].length>0) {
                        //#region Title_Ar already exist
                        if (!results[1][0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,290);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[1][0] , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,291);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: results[1][0] , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    }
                    //#endregion

                    else {
                        new Promise(async (resolve, reject)=>{
                            const newList = await tbl_Service.check_Existancy("update" , val_ID , val_Method_Title_En  , val_Method_Title_Ar , val_Discount_Type_ID);
                            resolve(newList);
                        }).then((Exist_Flg) => {
                            if (Exist_Flg.length>0) {
                                //#region row already exist
                                if (!Exist_Flg[0].Is_Suspended) {
                                    //#region row already exist and active
                                    new Promise(async (resolve, reject)=>{
                                        let result = await fun_handled_messages.get_handled_message(langTitle,252);
                                        resolve(result);
                                    }).then((msg) => {
                                        res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist activated" });
                                    })
                                    //#endregion
                                } else {
                                    //#region row already exist and suspended
                                    new Promise(async (resolve, reject)=>{
                                        let result = await fun_handled_messages.get_handled_message(langTitle,253);
                                        resolve(result);
                                    }).then((msg) => {
                                        res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist suspended" });
                                    })
                                    //#endregion
                                }
                                //#endregion
                            } else {
                                //#region update process
                                let recievedData = new tbl_Model({
                                    Method_Title_En: val_Method_Title_En,
                                    Method_Title_Ar: val_Method_Title_Ar,
                                    Updated_By: val_Updated_By,
                                    Updated_DateTime: now_DateTime.get_DateTime(),
                                    Is_Suspended: val_Is_Suspended
                                },{ new: true});
                                
                                new Promise(async (resolve, reject)=>{
                                    const newList = await fun_update_row.update_row(val_ID, "discount_method_lkp", recievedData , false);
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
                                                var result = await fun_handled_messages.get_handled_message(langTitle,258);
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
        var val_Method_Title_En = req.body.Method_Title_En;
        var val_Method_Title_Ar = req.body.Method_Title_Ar;
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("discount_method_lkp",val_ID);
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
                        const newList = await fun_update_row.update_row(val_ID, "discount_method_lkp", recievedData , false);
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,259);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,260);
                                }
                                resolve(result);
                            }).then((msg) => {
                                if (langTitle=="en") {
                                    msg = msg.replace("Method_Title_En", val_Method_Title_En);
                                } else {
                                    msg = msg.replace("Method_Title_Ar", val_Method_Title_Ar);
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
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("discount_method_lkp",req.body.data);
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
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "discount_method_lkp");
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,261);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,262);
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
