//#region Global Variables
const tbl_Service = require("../services/drivers");
var tbl_Model = require("../models/drivers_data");
var langTitle = "";
var recievedData = ""
const now_DateTime = require('../helpers/fun_datetime');
const fun_handled_messages = require('../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../helpers/fun_check_Existancy_By_List_IDS');

const fun_check_existancy = require('../helpers/fun_check_title_existancy');
const fun_insert_row = require('../helpers/fun_insert_row');
const fun_update_row = require('../helpers/fun_update_row');
const fun_Update_Suspend_Status_Many_Rows = require('../helpers/fun_Update_Suspend_Status_Many_Rows');
const ObjectId = require('mongodb').ObjectId;

const logger = require('../utils/logger');
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

exports.insert_driver =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Driver_Code = req.body.Driver_Code;
        var val_Full_Name = req.body.Full_Name;
        var val_Mobile = req.body.Mobile;
        var val_Email = req.body.Email;
        var val_Address = req.body.Address;
        var val_Photo_Profile = process.env.Main_URL + "public/drivers_photos/user_default.jpg";//req.body.Photo_Profile  
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion


        new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.check_Existancy("insert","",val_Driver_Code,val_Mobile);
            resolve(returnedList);
        }).then((exist_Before) => {
            if (exist_Before[2]=="Insert_New_Driver") {
                //#region Not Exist before so --> insert directly
                
                //#region prepare photo attributes
                const file = req.file;
                var ins_FLG = false;

                if (file){
                    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    if (!allowedMimeTypes.includes(file.mimetype)) {
                        //#region msg 10 Unsupported file type
                        new Promise(async (resolve, reject)=>{
                            let result = await fun_handled_messages.get_handled_message(langTitle,10);
                            resolve(result);
                        }).then((msg) => {
                            res.status(400).json({ data: [] , message: msg , status: "Unsupported file type" }); 
                        });return
                        //#endregion
                    } else{
                        //#region set photo path
                        const fileName = file.filename;
                        const basePath = `${req.protocol}://${req.get('host')}/public/drivers_photos/`;
                        val_Photo_Profile = `${basePath}${fileName}`
                        console.log("val_Photo_Profile = "+val_Photo_Profile)
                        //#endregion
                        ins_FLG = true;
                    }  
                } else{
                    ins_FLG = true;
                }
                //#endregion

                if (ins_FLG) {

                    new Promise(async (resolve, reject)=>{
                        var returnedList = await tbl_Service.check_Existancy(val_Driver_Code,val_Mobile);
                        resolve(returnedList);
                    }).then((exist_Before) => { 
                        if (exist_Before[2]=="Insert_New_Driver") {
                            //#region Not Exist before so --> insert directly

                                let sentData = new tbl_Model({
                                    Serial_Number: val_Serial_Number,
                                    Driver_Code: val_Driver_Code,
                                    Full_Name: val_Full_Name,
                                    Mobile: val_Mobile,
                                    Email: val_Email,
                                    Address: val_Address,
                                    Photo_Profile: val_Photo_Profile,
                                    Inserted_By: val_Inserted_By,
                                    Inserted_DateTime: now_DateTime.get_DateTime(),
                                    Is_Suspended: false
                                });
                                //#region insert process
                                new Promise(async (resolve, reject)=>{
                                    const newList = await fun_insert_row.insert_row("drivers_data",sentData);
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
                                            var result = await fun_handled_messages.get_handled_message(langTitle,271);
                                            resolve(result);
                                        }).then((msg) => {
                                            res.status(200).json({ data: inserted_Flag , message: msg , status: "insert successed" });                            
                                        })
                                        //#endregion
                                    }
                                })
                                //#endregion

                            //#endregion
                        } else {
                            //#region 'Redundant_Data' Driver Data already exist
                            var get_Message_Promise=""

                            if (exist_Before[0]== "Driver_Code_Exist") 
                            {
                                get_Message_Promise = new Promise(async (resolve, reject)=>{
                                    let result = await fun_handled_messages.get_handled_message(langTitle,269);
                                    resolve(result);
                                }).get_Message_Promise.then((msg) => {
                                    res.status(200).json({ data: [] , message: msg , status: "already exist" });    
                                })
                            } 
                            if (exist_Before[1]== "Mobile_Exist") 
                            {
                                get_Message_Promise = new Promise(async (resolve, reject)=>{
                                    let result = await fun_handled_messages.get_handled_message(langTitle,270);
                                    resolve(result);
                                }).get_Message_Promise.then((msg) => {
                                    res.status(200).json({ data: [] , message: msg , status: "already exist" });    
                                })
                            } 
                            //#endregion
                        }
                    })

                }

                //#endregion
            }else {
                //#region 'Redundant_Data' Driver Data already exist
                let get_Message_Promise=""
                var returned_MSG=""

                if (exist_Before[0]== "Driver_Code_Exist") {
                    get_Message_Promise = new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,269);
                        returned_MSG = returned_MSG +""+ result +" , "
                        resolve(result);
                    });
                } if (exist_Before[1]== "Mobile_Exist") {
                    get_Message_Promise = new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,270);
                        returned_MSG = returned_MSG +""+ result +" , "
                        resolve(result);
                    });
                } 
                get_Message_Promise.then((msg) => {
                    res.status(200).json({ data: [] , message: returned_MSG , status: "already exist" });    
                }).catch((err)=>{
                    res.status(500).json({ message: err.message , status: "error" });
                });
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
        var val_Driver_Code = req.body.Driver_Code;
        var val_Full_Name = req.body.Full_Name;
        var val_Mobile = req.body.Mobile;
        var val_Email = req.body.Email;
        var val_Address = req.body.Address;
        var val_Photo_Profile = ""; //process.env.Main_URL + "public/drivers_photos/user_default.jpg";
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("drivers_data",val_ID);
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

                new Promise(async (resolve, reject)=>{
                    var returnedList = await tbl_Service.check_Existancy("update",val_ID,val_Driver_Code,val_Mobile);
                    resolve(returnedList);
                }).then((exist_Before) => {console.log("exist_Before = "+exist_Before[2])

                    if (exist_Before[2]=="Insert_New_Driver") {                         
                        //#region Not Exist before so --> insert directly
                        
                            //#region prepare photo attributes
                            const file = req.file;
                            var ins_FLG = false;
                            var recievedData = "";

                            if (file){
                                const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                                if (!allowedMimeTypes.includes(file.mimetype)) {
                                    //#region msg 10 Unsupported file type
                                    new Promise(async (resolve, reject)=>{
                                        let result = await fun_handled_messages.get_handled_message(langTitle,10);
                                        resolve(result);
                                    }).then((msg) => {
                                        res.status(400).json({ data: [] , message: msg , status: "Unsupported file type" }); 
                                    });return
                                    //#endregion
                                } else{
                                    //#region set photo path
                                    const fileName = file.filename;
                                    const basePath = `${req.protocol}://${req.get('host')}/public/drivers_photos/`;
                                    val_Photo_Profile = `${basePath}${fileName}`
                                    console.log("val_Photo_Profile = "+val_Photo_Profile)
                                    //#endregion
                                    ins_FLG = true;
                                    recievedData = new tbl_Model({
                                        Driver_Code: val_Driver_Code,
                                        Full_Name: val_Full_Name,
                                        Mobile: val_Mobile,
                                        Email: val_Email,
                                        Address: val_Address,
                                        Photo_Profile: val_Photo_Profile,
                                        Updated_By: val_Updated_By,
                                        Updated_DateTime: now_DateTime.get_DateTime(),
                                        Is_Suspended: val_Is_Suspended
                                    },{ new: true});
                                }  
                            } else{
                                ins_FLG = true;
                                recievedData = new tbl_Model({
                                    Driver_Code: val_Driver_Code,
                                    Full_Name: val_Full_Name,
                                    Mobile: val_Mobile,
                                    Email: val_Email,
                                    Address: val_Address,
                                    Updated_By: val_Updated_By,
                                    Updated_DateTime: now_DateTime.get_DateTime(),
                                    Is_Suspended: val_Is_Suspended
                                },{ new: true});
                            }
                            //#endregion
                            
                            if (ins_FLG)
                            {
                                new Promise(async (resolve, reject)=>{
                                    const newList = await fun_update_row.update_row(val_ID, "drivers_data", recievedData , true);
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
                                                var result = await fun_handled_messages.get_handled_message(langTitle,274);
                                                resolve(result);
                                            }).then((msg) => {
                                                res.status(200).json({ data: update_flg , message: msg , status: "updated successed" });                            
                                            })
                                        //#endregion
                                    }
                                })
                            }
                        //#endregion
                    } else {
                        //#region 'Redundant_Data' Driver Data already exist
                        let get_Message_Promise=""
                        var returned_MSG=""

                        if (exist_Before[0]== "Driver_Code_Exist") {
                            get_Message_Promise = new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,269);
                                returned_MSG = returned_MSG +""+ result +" , "
                                resolve(result);
                            });
                        } if (exist_Before[1]== "Mobile_Exist") {
                            get_Message_Promise = new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,270);
                                returned_MSG = returned_MSG +""+ result +" , "
                                resolve(result);
                            });
                        } 
                        get_Message_Promise.then((msg) => {
                            res.status(200).json({ data: [] , message: returned_MSG , status: "already exist" });    
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

exports.update_Suspend_Status_One_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = req.body.id;
        var status = req.params.status;
        var val_Full_Name = req.body.Full_Name;
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("drivers_data",val_ID);
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
                        const newList = await fun_update_row.update_row(val_ID, "drivers_data", recievedData , false);
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,275);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,276);
                                }
                                resolve(result);
                            }).then((msg) => {
                                msg = msg.replace("Full_Name", val_Full_Name);
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
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("drivers_data",req.body.data);
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
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "drivers_data");
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,277);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,278);
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
