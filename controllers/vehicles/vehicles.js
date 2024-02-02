//#region Global Variables
const tbl_Service = require("../../services/vehicles");
var tbl_Model = require("../../models/vehicles_data");
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
                result = await fun_handled_messages.get_handled_message(langTitle,229);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,230);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,231);
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

exports.Insert_New_vehicle =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Model_ID = req.body.Model_ID;
        var val_Style_ID = req.body.Style_ID;        
        var val_photo_Path = "";
        var val_Year_Manufacturing_ID = req.body.Year_Manufacturing_ID;
        var val_Details_En = req.body.Details_En;
        var val_Details_Ar = req.body.Details_Ar;
        var val_Number_Of_Seats = req.body.Number_Of_Seats;
        var val_Number_Of_doors = req.body.Number_Of_doors;
        var val_Luggage_Capacity = req.body.Luggage_Capacity;
        var val_Transmission_Type_ID = req.body.Transmission_Type_ID;
        var val_Fuel_Type_ID = req.body.Fuel_Type_ID;        
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            var returnedList = await tbl_Service.check_Existancy(val_Model_ID,val_Style_ID,val_Year_Manufacturing_ID,val_Transmission_Type_ID,val_Fuel_Type_ID);
            resolve(returnedList);
        }).then((Exist_Flg) => {
            if (Exist_Flg.length>0) {
                //#region row already exist
                if (!Exist_Flg[0].Is_Suspended) {
                    //#region row already exist and active
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,226);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist activated" });
                    })
                    //#endregion
                } else {
                    //#region row already exist and suspended
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,227);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist suspended" });
                    })
                    //#endregion
                }
                //#endregion
            } else {
                //#region check photo uploaded or no then insert
                const file = req.file;
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
                    //#region insert directly

                    //#region set photo path
                    const fileName = file.filename;
                    const basePath = `${req.protocol}://${req.get('host')}/public/vehicles_photos/`;
                    val_photo_Path = `${basePath}${fileName}`
                    console.log("val_photo_Path = "+val_photo_Path)
                    //#endregion

                    //#region prepare Data Object for insertion
                    let sentData = new tbl_Model({
                        Serial_Number: val_Serial_Number,                    
                        Model_ID: val_Model_ID,
                        Style_ID: val_Style_ID,
                        photo_Path: val_photo_Path,
                        Year_Manufacturing_ID: val_Year_Manufacturing_ID,
                        Details_En: val_Details_En,
                        Details_Ar: val_Details_Ar,
                        Number_Of_Seats: val_Number_Of_Seats,    
                        Number_Of_doors: val_Number_Of_doors,    
                        Luggage_Capacity: val_Luggage_Capacity,    
                        Transmission_Type_ID: val_Transmission_Type_ID,    
                        Fuel_Type_ID: val_Fuel_Type_ID,
                        Inserted_By: val_Inserted_By,
                        Inserted_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: false
                    });
                    //#endregion

                    new Promise(async (resolve, reject)=>{
                        const newList = await fun_insert_row.insert_row("vehicles_data",sentData);
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
                                var result = await fun_handled_messages.get_handled_message(langTitle,228);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: inserted_Flag , message: msg , status: "insert successed" });                            
                            })
                            //#endregion
                        }
                    })

                    //#endregion                
                  } 
                } else{
                    //#region msg 9 No image in the request
                    new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,9);
                        resolve(result);
                    }).then((msg) => {
                        res.status(400).json({ data: [] , message: msg , status: "insert failed" });
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

exports.Insert_vehicle_Details =  async(req, res) => {
    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Vehicle_Id = req.body.Vehicle_Id;
        var val_Plate_Number = req.body.Plate_Number;
        var val_Color = req.body.Color;
        var val_Is_Outsourcing = req.body.Is_Outsourcing;
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("vehicles_data",val_Vehicle_Id);
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
                new Promise(async (resolve, reject)=>{
                    var returnedList = await tbl_Service.check_vehicle_Detail_Existancy(val_Vehicle_Id,val_Plate_Number);
                    resolve(returnedList);
                }).then((Exist_Flg) => {
                    if (Exist_Flg.length>0) {
                        //#region row already exist
                        if (!Exist_Flg[0].Is_Suspended) {
                            //#region row already exist and active
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,226);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist activated" });
                            })
                            //#endregion
                        } else {
                            //#region row already exist and suspended
                            new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,227);
                                resolve(result);
                            }).then((msg) => {
                                res.status(200).json({ data: Exist_Flg , message: msg , status: "already exist suspended" });
                            })
                            //#endregion
                        }
                        //#endregion
                    } else {
                        //#region insert Process

                        //#region prepare Data Object for insertion
                        tbl_Model = require("../../models/vehicle_data_details");
                        let sentData = new tbl_Model({
                            Serial_Number: val_Serial_Number,                    
                            Vehicle_Id: val_Vehicle_Id,
                            Plate_Number: val_Plate_Number,
                            Color: val_Color,
                            Is_Outsourcing: val_Is_Outsourcing,
                            Inserted_By: val_Inserted_By,
                            Inserted_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended: false
                        });
                        //#endregion

                        new Promise(async (resolve, reject)=>{
                            const newList = await fun_insert_row.insert_row("vehicle_data_details",sentData);
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
                                    var result = await fun_handled_messages.get_handled_message(langTitle,228);
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

exports.update_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = (req.params.id).trim();
        var val_photo_Path = "";
        var val_Details_En = req.body.Details_En;
        var val_Details_Ar = req.body.Details_Ar;
        var val_Number_Of_Seats = req.body.Number_Of_Seats;
        var val_Number_Of_doors = req.body.Number_Of_doors;
        var val_Luggage_Capacity = req.body.Luggage_Capacity;
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("vehicles_data",val_ID);
            resolve(exist);
        }).then((id_Exist) => {
            if (!id_Exist) {
                //#region ID is not exist in DB msg 14
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,14);
                    resolve(result);
                }).then((msg) => {        
                    res.status(404).json({ data: [] , message: msg, status: "id not exist" });
                })
                //#endregion
            } else {

                const file = req.file;
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
                        const basePath = `${req.protocol}://${req.get('host')}/public/vehicles_photos/`;
                        val_photo_Path = `${basePath}${fileName}`
                        console.log("val_photo_Path = "+val_photo_Path)
                        //#endregion

                        //#region prepare Data Object for insertion
                        recievedData = new tbl_Model({
                            photo_Path: val_photo_Path,
                            Details_En: val_Details_En,
                            Details_Ar: val_Details_Ar,
                            Number_Of_Seats: val_Number_Of_Seats,    
                            Number_Of_doors: val_Number_Of_doors,    
                            Luggage_Capacity: val_Luggage_Capacity,
                            Updated_By: val_Updated_By,
                            Updated_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended: val_Is_Suspended
                        },{ new: true});
                        //#endregion
                    }  
                } else {
                     //#region prepare Data Object for insertion
                     recievedData = new tbl_Model({
                        Details_En: val_Details_En,
                        Details_Ar: val_Details_Ar,
                        Number_Of_Seats: val_Number_Of_Seats,    
                        Number_Of_doors: val_Number_Of_doors,    
                        Luggage_Capacity: val_Luggage_Capacity,
                        Updated_By: val_Updated_By,
                        Updated_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: val_Is_Suspended
                    },{ new: true});
                    //#endregion
                }

                //#region update process
                new Promise(async (resolve, reject)=>{
                    const newList = await fun_update_row.update_row(val_ID, "vehicles_data", recievedData , true);
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
                                var result = await fun_handled_messages.get_handled_message(langTitle,232);
                                resolve(result);
                            }).then((msg) => {
                                //#region Update Suspend Status for all Vehicle_Data_Details related to this Vehicle_Data
                                new Promise(async (resolve, reject)=>{
                                    var updated = await tbl_Service.Update_SuspendStatus_Vehicle_Data_Details(val_Is_Suspended,val_ID);
                                    resolve(updated);
                                }).then((updated) => {
                                    res.status(200).json({ data: update_flg , message: msg , status: "updated successed" }); 
                                })
                                //#endregion
                                                          
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

exports.update_vehicle_details =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        let val_ID = (req.params.id).trim();
        var val_Plate_Number = req.body.Plate_Number;
        var val_Color = req.body.Color;
        var val_Is_Outsourcing = req.body.Is_Outsourcing;
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        new Promise(async (resolve, reject)=>{
            var exist = await fun_check_Existancy_By_ID.check_Existancy_By_ID("vehicle_data_details",val_ID);
            resolve(exist);
        }).then((id_Exist) => {
            if (!id_Exist) {
                //#region ID is not exist in DB msg 14
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,14);
                    resolve(result);
                }).then((msg) => {        
                    res.status(404).json({ data: [] , message: msg, status: "id not exist" });
                })
                //#endregion
            } else {

                //#region prepare Data Object for update
                tbl_Model = require("../../models/vehicle_data_details");
                var recievedData = new tbl_Model({
                    Plate_Number: val_Plate_Number,
                    Color: val_Color,
                    Is_Outsourcing: val_Is_Outsourcing,
                    Updated_By: val_Updated_By,
                    Updated_DateTime: now_DateTime.get_DateTime(),
                    Is_Suspended: val_Is_Suspended
                },{ new: true});
                //#endregion

                //#region update process
                new Promise(async (resolve, reject)=>{
                    const newList = await fun_update_row.update_row(val_ID, "vehicle_data_details", recievedData , false);
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
                                var result = await fun_handled_messages.get_handled_message(langTitle,232);
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
        var val_Plate_Number = req.body.Plate_Number;
        var val_Is_Suspended = false;
        var val_Updated_By = req.body.Updated_By;
        //#endregion

        new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("vehicle_data_details",val_ID);
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
                        res.status(404).json({ data: [] , message: msg, status: "wrong url" });
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
                        const newList = await fun_update_row.update_row(val_ID, "vehicle_data_details", recievedData , false);
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,233);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,234);
                                }
                                resolve(result);
                            }).then((msg) => {
                                msg = msg.replace("Plate_Number", val_Plate_Number);
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
            let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS("vehicle_data_details",req.body.data);
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
                        res.status(404).json({ data: [] , message: msg, status: "wrong url" });
                    })
                    //#endregion
                } else {
                    //#region update process
                    new Promise(async (resolve, reject)=>{
                        var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , val_Updated_By , "vehicle_data_details");
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
                                    result = await fun_handled_messages.get_handled_message(langTitle,235);
                                } else {
                                    result = await fun_handled_messages.get_handled_message(langTitle,236);
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
