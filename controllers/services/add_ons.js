//#region Global Variables
var tbl_Model = require("../../models/addons_lkp");
var langTitle = ""
const tbl_Service = require("../../services/add_ons");
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
                result = await fun_handled_messages.get_handled_message(langTitle,52);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,53);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,54);
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
                    res.status(400).json({ data: [] , message: results[1] , status: "wrong url" });
                }
            } else {
                res.status(200).json({ data: results[0] , message: "" , status: "rows selected" });
            }
        });

    } catch (err) {
        logger.error(err.message);
    }

};

exports.create_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var New_Serial_Number = req.body.Serial_Number;
        var val_Addons_Title_En = req.body.Addons_Title_En;
        var val_Addons_Title_Ar = req.body.Addons_Title_Ar;
        var val_Photo_Path = "";
        //#endregion

        let check_Ar_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await fun_check_existancy.check_title_existancy("addons_lkp" , "" , "insert" , "ar" , val_Addons_Title_Ar , "" , "" );
            resolve(returnedList);
        });

        let check_En_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await fun_check_existancy.check_title_existancy("addons_lkp" , "" , "insert" , "en" , val_Addons_Title_En , "" , "" );
            resolve(returnedList);
        });
        
        Promise.all([check_Ar_Title_Existancy_Promise , check_En_Title_Existancy_Promise]).then((results) => {

            console.log("check_Ar_Title_Existancy_Promise = "+results[0])
            console.log("check_En_Title_Existancy_Promise = "+results[1])

            if (results[0]==true && results[1]==true) {
                //#region Both En & Ar already exist
                new Promise(async (resolve, reject)=>{
                    var msg = await fun_handled_messages.get_handled_message(langTitle,57);
                    resolve(msg)
                }).then((msg) => {
                    msg = msg.replace("Addons_Title_En", val_Addons_Title_En);
                    msg = msg.replace("Addons_Title_Ar", val_Addons_Title_Ar);
                    res.status(200).json({ data:[], message: msg, status: "already exist" });
                })
                //#endregion
            } else if (results[0]==true) {
                //#region Ar already exist
                new Promise(async (resolve, reject)=>{
                    var msg = await fun_handled_messages.get_handled_message(langTitle,58);
                }).then((msg) => {
                    msg = msg.replace("Addons_Title_Ar", val_Addons_Title_Ar);
                    res.status(200).json({ data:[], message: msg, status: "already exist" });
                })
                //#endregion
            } else if (results[1]==true) {
                //#region En already exist
                new Promise(async (resolve, reject)=>{
                    var msg = await fun_handled_messages.get_handled_message(langTitle,59);
                }).then((msg) => {
                    msg = msg.replace("Addons_Title_En", val_Addons_Title_En);
                    res.status(200).json({ data:[], message: msg, status: "already exist" });
                })
                //#endregion
            } else {
                //#region insert process
                const file = req.file;
                const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                if (!file){
                    //#region msg 9 No image in the request
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,9);
                        resolve(result);
                    }).then((msg) => {
                        res.status(400).json({ data: [] , message: msg , status: "No image in the request" }); 
                    })
                    //#endregion
                } else if (!allowedMimeTypes.includes(file.mimetype)) {
                    //#region msg 10 Unsupported file type
                    let get_Message_Promise = new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,10);
                        resolve(result);
                    });                                    
                    get_Message_Promise.then((msg) => {
                        res.status(400).json({ data: [] , message: msg , status: "Unsupported file type" }); 
                    }).catch((err)=>{
                        res.status(500).json({ message: err.message , status: "error" });
                    });
                    //#endregion
                } else{
                    const fileName = file.filename;
                    const basePath = `${req.protocol}://${req.get('host')}/public/add_ons_photos/`;
                    val_Photo_Path = `${basePath}${fileName}`

                    let sentData = new tbl_Model({
                        Serial_Number: New_Serial_Number,
                        Addons_Title_En: val_Addons_Title_En,
                        Addons_Title_Ar: val_Addons_Title_Ar,
                        Addons_Description_En: req.body.Addons_Description_En,
                        Addons_Description_Ar: req.body.Addons_Description_Ar,
                        Photo_Path: val_Photo_Path, //Photo_Path //"http://localhost:3000/public/add_ons_photos/image-2323232"
                        Inserted_By: req.body.Inserted_By,
                        Inserted_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: false
                    });
                    new Promise(async (resolve, reject)=>{
                        const newList = await fun_insert_row.insert_row("addons_lkp",sentData);
                        resolve(newList)
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
                                    var result = await fun_handled_messages.get_handled_message(langTitle,60);
                                    resolve(result);
                                }).then((msg) => {
                                    if (langTitle=="en") {
                                        msg = msg.replace("Addons_Title_En", val_Addons_Title_En);
                                    } else {
                                        msg = msg.replace("Addons_Title_Ar", val_Addons_Title_Ar);
                                    }
                                    res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                })
                            //#endregion
                        }
                    })
                }                
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
        var val_Addons_Title_En = req.body.Addons_Title_En;
        var val_Addons_Title_Ar = req.body.Addons_Title_Ar;
        var val_Photo_Path = "";
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("addons_lkp",val_ID);
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
                let check_Ar_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    var returnedList = await fun_check_existancy.check_title_existancy("addons_lkp" , val_ID , "update" , "ar" , val_Addons_Title_Ar , "" , "" );
                    resolve(returnedList);
                });
        
                let check_En_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    var returnedList = await fun_check_existancy.check_title_existancy("addons_lkp" , val_ID , "update" , "en" , val_Addons_Title_En , "" , "" );
                    resolve(returnedList);
                });
        
                Promise.all([check_Ar_Title_Existancy_Promise , check_En_Title_Existancy_Promise]).then((results) => {
        
                    console.log("check_Ar_Title_Existancy_Promise = "+results[0])
                    console.log("check_En_Title_Existancy_Promise = "+results[1])
        
                    if (results[0]==true && results[1]==true) {
                        //#region Both En & Ar already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,57);
                            resolve(msg)
                        }).then((msg) => {
                            msg = msg.replace("Addons_Title_En", val_Addons_Title_En);
                            msg = msg.replace("Addons_Title_Ar", val_Addons_Title_Ar);
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else if (results[0]==true) {
                        //#region Ar already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,58);
                        }).then((msg) => {
                            msg = msg.replace("Addons_Title_Ar", val_Addons_Title_Ar);
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else if (results[1]==true) {
                        //#region En already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,59);
                        }).then((msg) => {
                            msg = msg.replace("Addons_Title_En", val_Addons_Title_En);
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else {
                        //#region update process
                        let recievedData = ""
                        var ins_FLG = false;
                        var is_Delete_Old_Image=false;
                        const file = req.file;

                        //#region prepare photo attributes
                        if (file) {
                            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                            if (!allowedMimeTypes.includes(file.mimetype)) {
                                //#region msg 10 Unsupported file type
                                new Promise(async (resolve, reject)=>{
                                    let result = await fun_handled_messages.get_handled_message(langTitle,10);
                                    resolve(result);
                                }).then((msg) => {
                                    res.status(400).json({ data: [] , message: msg , status: "Unsupported file type" }); 
                                })
                                //#endregion                            
                            } else{
                                is_Delete_Old_Image=true;

                                //#region set photo path
                                const fileName = file.filename;
                                const basePath = `${req.protocol}://${req.get('host')}/public/add_ons_photos/`;
                                val_Photo_Path = `${basePath}${fileName}`
                                console.log("val_Photo_Path = "+val_Photo_Path)
                                //#endregion

                                //#region prepare Data Object
                                recievedData = new tbl_Model({
                                    Addons_Title_En: val_Addons_Title_En,
                                    Addons_Title_Ar: val_Addons_Title_Ar,
                                    Addons_Description_En: req.body.Addons_Description_En,
                                    Addons_Description_Ar: req.body.Addons_Description_Ar,
                                    Photo_Path: val_Photo_Path,
                                    Updated_By: req.body.Updated_By,
                                    Updated_DateTime: now_DateTime.get_DateTime(),
                                    Is_Suspended: req.body.Is_Suspended
                                },{ new: true});
                                //#endregion
                            
                                ins_FLG = true;
                            }
                        } else {
                            ins_FLG = true;
                            //#region prepare Data Object
                            recievedData = new tbl_Model({
                                Addons_Title_En: val_Addons_Title_En,
                                Addons_Title_Ar: val_Addons_Title_Ar,
                                Addons_Description_En: req.body.Addons_Description_En,
                                Addons_Description_Ar: req.body.Addons_Description_Ar,
                                Updated_By: req.body.Updated_By,
                                Updated_DateTime: now_DateTime.get_DateTime(),
                                Is_Suspended: req.body.Is_Suspended
                            },{ new: true});
                            //#endregion
                        }
                        //#endregion

                        if (ins_FLG) {                            
                            //#region update process
                            new Promise(async (resolve, reject)=>{
                                const newList = await fun_update_row.update_row(val_ID, "addons_lkp", recievedData , is_Delete_Old_Image);
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
                                        var result = await fun_handled_messages.get_handled_message(langTitle,61);
                                        resolve(result);
                                    }).then((msg) => {
                                        if (langTitle=="en") {
                                            msg = msg.replace("Addons_Title_En", val_Addons_Title_En);
                                        } else {
                                            msg = msg.replace("Addons_Title_Ar", val_Addons_Title_Ar);
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
        var val_Addons_Title_En = req.body.Addons_Title_En;
        var val_Addons_Title_Ar = req.body.Addons_Title_Ar;
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("addons_lkp",val_ID);
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
                        const newList = await fun_update_row.update_row(val_ID, "addons_lkp", recievedData , false);
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,63);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,64);
                                }
                                resolve(result);
                            }).then((msg) => {
                                if (langTitle=="en") {
                                    msg = msg.replace("Addons_Title_En", val_Addons_Title_En);
                                } else {
                                    msg = msg.replace("Addons_Title_Ar", val_Addons_Title_Ar);
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
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("addons_lkp",req.body.data);
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
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "addons_lkp");
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,65);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,66);
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