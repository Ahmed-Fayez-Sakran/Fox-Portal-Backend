//#region Global Variables
const tbl_Service = require("../services/business_organization_settings");
var tbl_Model = require("../models/business_organizations_lkp");
var langTitle = "";
const now_DateTime = require('../helpers/fun_datetime');
const fun_handled_messages = require('../helpers/fun_handled_messages');
const fun_check_existancy = require('../helpers/fun_check_title_existancy');
const fun_insert_row = require('../helpers/fun_insert_row');
const fun_update_row = require('../helpers/fun_update_row');
const fun_check_Existancy_By_List_IDS = require('../helpers/fun_check_Existancy_By_List_IDS');
const fun_check_Existancy_By_ID = require('../helpers/fun_check_Existancy_By_ID');
const fun_Update_Suspend_Status_Many_Rows = require('../helpers/fun_Update_Suspend_Status_Many_Rows');
const logger = require('../utils/logger');
const bcrypt = require("bcrypt")
//#endregion

exports.View_All =  async(req, res) => {

    try {
        //#region Global Variables
        lkp_Table_Name = req.params.lkp_Table_Name;
        langTitle = req.params.langTitle;
        //#endregion  

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};

exports.Edit_Business_Organization =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = (req.params.id).trim();
        var val_Organization_Title_En = req.body.Organization_Title_En;
        var val_Organization_Title_Ar = req.body.Organization_Title_Ar;
        var val_Organization_Address = req.body.Organization_Address;
        var val_Organization_Location = req.body.Organization_Location;
        var val_Photo_Organization = process.env.Main_URL + "public/business_organizations_photos/business_default.jpg";
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Reviewed = req.body.Is_Reviewed;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion
        
        //#region check title existancy and update process
        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_organizations_lkp",val_ID);
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
                    var returnedList = await fun_check_existancy.check_title_existancy("business_organizations_lkp" , val_ID , "update" , "ar" , val_Organization_Title_Ar , "" , "" );
                    resolve(returnedList);
                });
        
                let check_En_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
                    var returnedList = await fun_check_existancy.check_title_existancy("business_organizations_lkp" , val_ID , "update" , "en" , val_Organization_Title_En , "" , "" );
                    resolve(returnedList);
                });
        
                Promise.all([check_Ar_Title_Existancy_Promise , check_En_Title_Existancy_Promise]).then((results) => {
        
                    console.log("check_Ar_Title_Existancy_Promise = "+results[0])
                    console.log("check_En_Title_Existancy_Promise = "+results[1])
        
                    if (results[0]==true && results[1]==true) {
                        //#region Both En & Ar already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,11);
                            resolve(msg)
                        }).then((msg) => {
                            msg = msg.replace("Organization_Title_Ar", val_Organization_Title_Ar);
                            msg = msg.replace("Organization_Title_En", val_Organization_Title_En);
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else if (results[0]==true) {
                        //#region Ar already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,55);
                        }).then((msg) => {
                            msg = msg.replace("Organization_Title_Ar", val_Organization_Title_Ar);
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else if (results[1]==true) {
                        //#region En already exist
                        new Promise(async (resolve, reject)=>{
                            var msg = await fun_handled_messages.get_handled_message(langTitle,56);
                        }).then((msg) => {
                            msg = msg.replace("Organization_Title_En", val_Organization_Title_En);
                            res.status(200).json({ data:[], message: msg, status: "already exist" });
                        })
                        //#endregion
                    } else {
                        //#region update process

                        //#region prepare photo attributes
                        const file = req.file;
                        var ins_FLG = false;
                        var recievedData = "";
                        var is_Delete_Old_Image=false;

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
                                is_Delete_Old_Image=true;

                                //#region set photo path
                                const fileName = file.filename;
                                const basePath = `${req.protocol}://${req.get('host')}/public/business_organizations_photos/`;
                                val_Photo_Organization = `${basePath}${fileName}`
                                console.log("val_Photo_Organization = "+val_Photo_Organization)
                                //#endregion

                                //#region prepare Data Object
                                recievedData = new tbl_Model({                            
                                    Organization_Title_En: val_Organization_Title_En,
                                    Organization_Title_Ar: val_Organization_Title_Ar,
                                    Organization_Location: val_Organization_Location,
                                    Organization_Address: val_Organization_Address,
                                    Photo_Organization: val_Photo_Organization,
                                    Updated_By: val_Updated_By,
                                    Updated_DateTime: now_DateTime.get_DateTime(),
                                    Is_Reviewed: val_Is_Reviewed,
                                    Is_Suspended: val_Is_Suspended                            
                                },{ new: true});
                                //#endregion

                                ins_FLG = true;
                            }  
                        } else{
                            ins_FLG = true;
                            //#region prepare Data Object
                            recievedData = new tbl_Model({                            
                                Organization_Title_En: val_Organization_Title_En,
                                Organization_Title_Ar: val_Organization_Title_Ar,
                                Organization_Location: val_Organization_Location,
                                Organization_Address: val_Organization_Address,
                                //Photo_Organization: val_Photo_Organization,
                                Updated_By: val_Updated_By,
                                Updated_DateTime: now_DateTime.get_DateTime(),
                                Is_Reviewed: val_Is_Reviewed,
                                Is_Suspended: val_Is_Suspended                            
                            },{ new: true});
                            //#endregion
                        }
                        //#endregion
                        
                        if (ins_FLG) {                            
                            //#region update process
                            new Promise(async (resolve, reject)=>{
                                const newList = await fun_update_row.update_row(val_ID, "business_organizations_lkp", recievedData , is_Delete_Old_Image);
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
                                        var result = await fun_handled_messages.get_handled_message(langTitle,16);
                                        resolve(result);
                                    }).then((msg) => {

                                        if (val_Is_Suspended) {
                                            //#region Suspend all Users related to this organization
                                            new Promise(async (resolve, reject)=>{
                                                var result = await tbl_Service.Suspend_Users_In_Organization(val_ID);
                                                resolve(result);
                                            })
                                            //#endregion
                                        }

                                        if (langTitle=="en") {
                                            msg = msg.replace("Organization_Title_En", val_Organization_Title_En);
                                        } else {
                                            msg = msg.replace("Organization_Title_Ar", val_Organization_Title_Ar);
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
        //#endregion

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};

exports.Add_User =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number; 
        var val_Email = req.body.Email;      
        var val_Password = req.body.Password;    
        var val_First_Name = req.body.First_Name;
        var val_Last_Name = req.body.Last_Name;
        var val_User_Roles_ID = req.body.User_Roles_ID;
        var val_Phone_Number = req.body.Phone_Number;
        var val_Address = req.body.Address;
        var val_Location = req.body.Location;
        var val_Photo_Profile = process.env.Main_URL + "public/user_personal_photos/user_default.jpg";
        var val_Is_Business = true;
        var val_Business_Organization_ID = req.body.Business_Organization_ID ;        
        let sentData = "";
        var saltRounds = +process.env.saltRounds
        //#endregion
 
        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_organizations_lkp",val_Business_Organization_ID);
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
                //#region insert_User_Data
                bcrypt.genSalt(saltRounds)
                .then(salt => {
                  return bcrypt.hash(val_Password, salt)
                })
                .then(hash => {

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
                            const basePath = `${req.protocol}://${req.get('host')}/public/user_personal_photos/`;
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

                    //#region prepare Data Object for insertion
                    var User_tbl_Model = require("../models/user_data");
                    sentData = new User_tbl_Model({
                        Serial_Number:val_Serial_Number,
                        Email:val_Email,
                        Password: hash,
                        First_Name:val_First_Name,
                        Last_Name:val_Last_Name,
                        User_Roles_ID:val_User_Roles_ID,
                        Phone_Number:val_Phone_Number,
                        Address:val_Address,
                        Location:val_Location,
                        Photo_Profile:val_Photo_Profile,
                        Inserted_DateTime:now_DateTime.get_DateTime(),
                        Is_Business:val_Is_Business,
                        Business_Organization_ID:val_Business_Organization_ID,
                        Is_Verified:true,
                        Is_Suspended:false,
                        Inserted_By:val_Serial_Number,
                    });
                    //#endregion

                    //#region insert process
                    new Promise(async (resolve, reject)=>{
                        const newList = await fun_insert_row.insert_row("user_data",sentData);
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
                                var result = await fun_handled_messages.get_handled_message(langTitle,15);
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

exports.Add_Business_Organization =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Organization_Title_En = req.body.Organization_Title_En;
        var val_Organization_Title_Ar = req.body.Organization_Title_Ar;
        var val_Organization_Address = req.body.Organization_Address;
        var val_Organization_Location = req.body.Organization_Location;
        var val_Photo_Organization = process.env.Main_URL + "public/business_organizations_photos/business_default.jpg";
        var val_Inserted_By = req.body.Inserted_By;
        var val_Is_Reviewed = req.body.Is_Reviewed;
        //#endregion
        
        //#region check title existancy and insert process
        let check_Ar_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await fun_check_existancy.check_title_existancy("business_organizations_lkp" , "" , "insert" , "ar" , val_Organization_Title_Ar , "" , "" );
            resolve(returnedList);
        });

        let check_En_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
            var returnedList = await fun_check_existancy.check_title_existancy("business_organizations_lkp" , "" , "insert" , "en" , val_Organization_Title_En , "" , "" );
            resolve(returnedList);
        });
        
        Promise.all([check_Ar_Title_Existancy_Promise , check_En_Title_Existancy_Promise]).then((results) => {

            console.log("check_Ar_Title_Existancy_Promise = "+results[0])
            console.log("check_En_Title_Existancy_Promise = "+results[1])

            if (results[0]==true && results[1]==true) {
                //#region Both En & Ar already exist
                new Promise(async (resolve, reject)=>{
                    var msg = await fun_handled_messages.get_handled_message(langTitle,11);
                    resolve(msg)
                }).then((msg) => {
                    msg = msg.replace("Organization_Title_Ar", val_Organization_Title_Ar);
                    msg = msg.replace("Organization_Title_En", val_Organization_Title_En);
                    res.status(200).json({ data:[], message: msg, status: "already exist" });
                })
                //#endregion
            } else if (results[0]==true) {
                //#region Ar already exist
                new Promise(async (resolve, reject)=>{
                    var msg = await fun_handled_messages.get_handled_message(langTitle,55);
                    resolve(msg)
                }).then((msg) => {
                    msg = msg.replace("Organization_Title_Ar", val_Organization_Title_Ar);
                    res.status(200).json({ data:[], message: msg, status: "already exist" });
                })
                //#endregion
            } else if (results[1]==true) {
                //#region En already exist
                new Promise(async (resolve, reject)=>{
                    var msg = await fun_handled_messages.get_handled_message(langTitle,56);
                    resolve(msg)
                }).then((msg) => {
                    msg = msg.replace("Organization_Title_En", val_Organization_Title_En);
                    res.status(200).json({ data:[], message: msg, status: "already exist" });
                })
                //#endregion
            } else {
                //#region insert process

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
                        const basePath = `${req.protocol}://${req.get('host')}/public/business_organizations_photos/`;
                        val_Photo_Organization = `${basePath}${fileName}`
                        console.log("val_Photo_Organization = "+val_Photo_Organization)
                        //#endregion
                        ins_FLG = true;
                    }  
                } else{
                    ins_FLG = true;
                }
                //#endregion

                if (ins_FLG) {
                    
                    //#region prepare Data Object for insertion
                    let business_organization_sentData = new tbl_Model({
                        Serial_Number: val_Serial_Number,
                        Organization_Title_En: val_Organization_Title_En,
                        Organization_Title_Ar: val_Organization_Title_Ar,
                        Organization_Location: val_Organization_Location,
                        Organization_Address: val_Organization_Address,
                        Photo_Organization: val_Photo_Organization,
                        Inserted_By: val_Inserted_By,
                        Inserted_DateTime: now_DateTime.get_DateTime(),
                        Is_Reviewed: val_Is_Reviewed,
                        Is_Suspended: false
                    });
                    //#endregion
                    
                    //#region insert process
                        new Promise(async (resolve, reject)=>{
                            const newList = await fun_insert_row.insert_row("business_organizations_lkp",business_organization_sentData);
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
                                    var result = await fun_handled_messages.get_handled_message(langTitle,12);
                                    resolve(result);
                                }).then((msg) => {
                                    if (langTitle=="en") {
                                        msg = msg.replace("Organization_Title_En", val_Organization_Title_En);
                                    } else {
                                        msg = msg.replace("Organization_Title_Ar", val_Organization_Title_Ar);
                                    }
                                    res.status(200).json({ data: inserted_Flag , message: msg , status: "insert successed" });                            
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
        var val_Organization_Title_En = req.body.Organization_Title_En;
        var val_Organization_Title_Ar = req.body.Organization_Title_Ar;        
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_organizations_lkp",val_ID);
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
                        const newList = await fun_update_row.update_row(val_ID, "business_organizations_lkp", recievedData , false);
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,67);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,68);
                                }
                                resolve(result);
                            }).then((msg) => {
                                if (langTitle=="en") {
                                    msg = msg.replace("Organization_Title_En", val_Organization_Title_En);
                                } else {
                                    msg = msg.replace("Organization_Title_Ar", val_Organization_Title_Ar);
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
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("business_organizations_lkp",req.body.data);
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
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , req.body.Updated_By , "business_organizations_lkp");
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,69);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,70);
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

