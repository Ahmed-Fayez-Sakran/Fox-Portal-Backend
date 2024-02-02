//#region Global Variables
const tbl_Service = require("../../services/service_settings");
//const common_functions = require("../../services/lkp_common_functions");
var tbl_Model = "";
var langTitle = "";
var recievedData = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');
const fun_Update_Suspend_Status_Many_Rows = require('../../helpers/fun_Update_Suspend_Status_Many_Rows');
const logger = require('../../utils/logger');
const { Console } = require("winston/lib/winston/transports");
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
                result = await fun_handled_messages.get_handled_message(langTitle,308);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,309);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,310);
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

exports.create_Row =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Serial_Number = req.body.Serial_Number;
        var val_Sub_Service_ID = req.body.Sub_Service_ID;
        var val_setting_Type = req.body.setting_Type;
        var val_User_ID = "";
        var val_Mini_Service_Duration_Per_Hours =  req.body.Mini_Service_Duration_Per_Hours;
        var val_Notice_Period_Per_Hours =  req.body.Notice_Period_Per_Hours;
        var val_Max_Cancellation_Duration_Per_Hours =  req.body.Max_Cancellation_Duration_Per_Hours;
        var val_Discount_ID = req.body.Discount_ID;
        var val_Inserted_By = req.body.Inserted_By;
        //#endregion
        
        if (val_setting_Type=="business") {
            //#region Business_Sub_Services_Settings_Log
            tbl_Model = require("../../models/business_sub_services_settings_log");
            val_User_ID = req.body.User_ID;

            let check_Sub_Service_ID_Promise = new Promise(async (resolve, reject)=>{
              let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
              resolve(returnedList);
            });

            let check_User_ID_Promise = new Promise(async (resolve, reject)=>{
              let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
              resolve(returnedList);
            });

            let check_Discount_ID_Promise = new Promise(async (resolve, reject)=>{
              let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("discount_method_lkp",val_Discount_ID);
              resolve(returnedList);
            });

            Promise.all([check_Sub_Service_ID_Promise , check_User_ID_Promise , check_Discount_ID_Promise]).then((results) => {
              if ( (!results[0]) || (!results[1]) || (!results[2]) ) {
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
                  var returnedList = await tbl_Service.check_Settings_Existancy("business_sub_services_settings_log" , val_Sub_Service_ID , val_User_ID );
                  resolve(returnedList);
              }).then((exist_Before) => {
                  if (exist_Before[1]) {
                      //#region suspend the old one then insert new row
                      let recievedData = new tbl_Model({
                          Updated_By: val_Inserted_By,
                          Updated_DateTime: now_DateTime.get_DateTime(),
                          Is_Suspended: true
                      },{ new: true});
  
                      new Promise(async (resolve, reject)=>{
                          const newList = await tbl_Service.update_DataRow("business_sub_services_settings_log" ,exist_Before[0] , recievedData);
                          resolve(newList);
                      }).then((Update_Flg) => {
                          if (!Update_Flg) {
                              //#region msg 2 update process failed
                              new Promise(async (resolve, reject)=>{
                                var result = await fun_handled_messages.get_handled_message(langTitle,2);
                                resolve(result);
                              }).then((msg) => {
                                  res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                              })           
                              //#endregion
                            } else {
                              //#region update process successed insert the new data
                              let sentData = new tbl_Model({
                                  Serial_Number: val_Serial_Number,
                                  Sub_Service_ID: val_Sub_Service_ID,
                                  User_ID: val_User_ID,
                                  Mini_Service_Duration_Per_Hours: val_Mini_Service_Duration_Per_Hours,
                                  Notice_Period_Per_Hours: val_Notice_Period_Per_Hours,
                                  Max_Cancellation_Duration_Per_Hours: val_Max_Cancellation_Duration_Per_Hours,
                                  Discount_ID: val_Discount_ID,                  
                                  Inserted_By: val_Inserted_By,
                                  Inserted_DateTime: now_DateTime.get_DateTime(),
                                  Is_Suspended: false
                              });
                              new Promise(async (resolve, reject)=>{
                                  const newList = await tbl_Service.create_Single_DataRow("business_sub_services_settings_log" ,sentData);
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
                                    //#region msg insert process successed
                                    new Promise(async (resolve, reject)=>{
                                      let result = await fun_handled_messages.get_handled_message(langTitle,311);
                                      resolve(result);
                                    }).then((msg) => {
                                      res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                    })       
                                    //#endregion
                                  }
                              })
                              //#endregion
                            }
                        })                        
                      //#endregion
                  } else {
                       //#region Not Exist before so --> insert directly
                       let sentData = new tbl_Model({
                          Serial_Number: val_Serial_Number,
                          Sub_Service_ID: val_Sub_Service_ID,
                          User_ID: val_User_ID,
                          Mini_Service_Duration_Per_Hours: val_Mini_Service_Duration_Per_Hours,
                          Notice_Period_Per_Hours: val_Notice_Period_Per_Hours,
                          Max_Cancellation_Duration_Per_Hours: val_Max_Cancellation_Duration_Per_Hours,
                          Discount_ID: val_Discount_ID,                  
                          Inserted_By: val_Inserted_By,
                          Inserted_DateTime: now_DateTime.get_DateTime(),
                          Is_Suspended: false
                      });
                      new Promise(async (resolve, reject)=>{
                          const newList = await tbl_Service.create_Single_DataRow("business_sub_services_settings_log" ,sentData);
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
                            //#region msg insert process successed
                            new Promise(async (resolve, reject)=>{
                              let result = await fun_handled_messages.get_handled_message(langTitle,311);
                              resolve(result);
                            }).then((msg) => {
                              res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
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
            //#endregion
        } else {
            //#region Client_Sub_Services_Settings_Log
            tbl_Model = require("../../models/client_sub_services_settings_log");           

            let check_Sub_Service_ID_Promise = new Promise(async (resolve, reject)=>{
              let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
              resolve(returnedList);
            });

            let check_Discount_ID_Promise = new Promise(async (resolve, reject)=>{
              let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("discount_method_lkp",val_Discount_ID);
              resolve(returnedList);
            });

            Promise.all([check_Sub_Service_ID_Promise , check_Discount_ID_Promise]).then((results) => {
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
                  var returnedList = await tbl_Service.check_Settings_Existancy("client_sub_services_settings_log" , val_Sub_Service_ID , val_User_ID );
                  resolve(returnedList);
                }).then((exist_Before) => {
                  if (exist_Before[1]) {
                      //#region suspend the old one then insert new row
                        let recievedData = new tbl_Model({
                            Updated_By: val_Inserted_By,
                            Updated_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended: true
                        },{ new: true});
    
                        new Promise(async (resolve, reject)=>{
                            const newList = await tbl_Service.update_DataRow("client_sub_services_settings_log" ,exist_Before[0] , recievedData);
                            resolve(newList);
                        }).then((Update_Flg) => {
                            if (!Update_Flg) {
                              //#region msg 2 update process failed
                                new Promise(async (resolve, reject)=>{
                                  var result = await fun_handled_messages.get_handled_message(langTitle,2);
                                  resolve(result);
                                }).then((msg) => {
                                    res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                                })           
                                //#endregion
                            } else {
                              //#region update process successed insert the new data
                                let sentData = new tbl_Model({
                                    Serial_Number: val_Serial_Number,
                                    Sub_Service_ID: val_Sub_Service_ID,
                                    Mini_Service_Duration_Per_Hours: val_Mini_Service_Duration_Per_Hours,
                                    Notice_Period_Per_Hours: val_Notice_Period_Per_Hours,
                                    Max_Cancellation_Duration_Per_Hours: val_Max_Cancellation_Duration_Per_Hours,
                                    Discount_ID: val_Discount_ID,                  
                                    Inserted_By: val_Inserted_By,
                                    Inserted_DateTime: now_DateTime.get_DateTime(),
                                    Is_Suspended: false
                                });
                                new Promise(async (resolve, reject)=>{
                                    const newList = await tbl_Service.create_Single_DataRow("client_sub_services_settings_log" ,sentData);
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
                                      //#region msg insert process successed
                                      new Promise(async (resolve, reject)=>{
                                        let result = await fun_handled_messages.get_handled_message(langTitle,312);
                                        resolve(result);
                                      }).then((msg) => {
                                        res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                      })       
                                      //#endregion
                                    }
                                })
                                //#endregion
                            }
                        })                        
                        //#endregion
                  } else {
                      //#region Not Exist before so --> insert directly
                        let sentData = new tbl_Model({
                            Serial_Number: val_Serial_Number,
                            Sub_Service_ID: val_Sub_Service_ID,
                            Mini_Service_Duration_Per_Hours: val_Mini_Service_Duration_Per_Hours,
                            Notice_Period_Per_Hours: val_Notice_Period_Per_Hours,
                            Max_Cancellation_Duration_Per_Hours: val_Max_Cancellation_Duration_Per_Hours,
                            Discount_ID: val_Discount_ID,                  
                            Inserted_By: val_Inserted_By,
                            Inserted_DateTime: now_DateTime.get_DateTime(),
                            Is_Suspended: false
                        });
                        new Promise(async (resolve, reject)=>{
                            const newList = await tbl_Service.create_Single_DataRow("client_sub_services_settings_log" ,sentData);
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
                              //#region msg insert process successed
                              new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,312);
                                resolve(result);
                              }).then((msg) => {
                                res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
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
            //#endregion            
        }
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
      var val_setting_Type = req.body.setting_Type;
      var val_Updated_By = req.body.Updated_By;
      var val_Is_Suspended = req.body.Is_Suspended;
      //#endregion

      if (val_setting_Type=="Business_Sub_Services_Settings_Log") {
        //#region Business_Sub_Services_Settings_Log
        tbl_Model = require("../../models/business_sub_services_settings_log");
          new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_sub_services_settings_log",val_ID);
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
              let recievedData = new tbl_Model({
                Updated_By: val_Updated_By,
                Updated_DateTime: now_DateTime.get_DateTime(),
                Is_Suspended: val_Is_Suspended
              },{ new: true});

              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.update_DataRow("business_sub_services_settings_log",val_ID, recievedData);
                resolve(newList);
                }).then((update_Flg) => {
                if (!update_Flg) {
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
                        var result = await fun_handled_messages.get_handled_message(langTitle,313);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: update_Flg , message: msg , status: "updated successed" });
                    })
                    //#endregion
                }
                })
              //#endregion
            }
          })
          //#endregion
      } else {
        //#region Client_Sub_Services_Settings_Log
        tbl_Model = require("../../models/client_sub_services_settings_log");
          new Promise(async (resolve, reject)=>{
            let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("client_sub_services_settings_log",val_ID);
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
              let recievedData = new tbl_Model({
                Updated_By: val_Updated_By,
                Updated_DateTime: now_DateTime.get_DateTime(),
                Is_Suspended: val_Is_Suspended
              },{ new: true});

              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.update_DataRow("client_sub_services_settings_log",val_ID, recievedData);
                resolve(newList);
                }).then((update_Flg) => {
                if (!update_Flg) {
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
                        var result = await fun_handled_messages.get_handled_message(langTitle,314);
                        resolve(result);
                    }).then((msg) => {
                        res.status(200).json({ data: update_Flg , message: msg , status: "updated successed" });
                    })
                    //#endregion
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

exports.updateMany_Rows_Data =  async(req, res) => {

    try {
      //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Services_Settings_Data= req.body.Services_Settings_Data;
        var val_Updated_By = req.body.Updated_By;
        var val_Setting_Type = "";
        var val_Id = "";
        var Business_Settings_Data = [];
        var Client_Settings_Data = [];
        var check_Business_Settings = [];
        var check_Client_Settings = [];
        //#endregion

      val_Services_Settings_Data.forEach(item => {
            
          //#region Set Variables
          val_Setting_Type = item.Setting_Type;
          val_Id = item.Id;
          //#endregion

          if (val_Setting_Type=="Business_Sub_Services_Settings_Log") {
              const savePromise_1 = new Promise(async(resolve, reject) => {
                var returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_sub_services_settings_log",val_Id);
                resolve(returnedList);
              });
              Business_Settings_Data.push(val_Id);
              check_Business_Settings.push(savePromise_1);
          } else {
              const savePromise_2 = new Promise(async(resolve, reject) => {
                var returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("client_sub_services_settings_log",val_Id);
                resolve(returnedList);
              });
              Client_Settings_Data.push(val_Id);
              check_Client_Settings.push(savePromise_2);
          }

      });
      
      Promise.all([
        Promise.all(check_Business_Settings), 
        Promise.all(check_Client_Settings)
      ]).then((results) => {
        var check_ID_Existancy_Flag = true;
        for (let i = 0; i < results.length; i++) 
        {
            for (let j = 0; j < results[i].length; j++)
            {
              if (!results[i][j]) {
                check_ID_Existancy_Flag = false;                        
              }
            }
        }
        if (!check_ID_Existancy_Flag) {
          //#region ID is not exist in DB msg 14
          new Promise(async (resolve, reject)=>{
            var result = await fun_handled_messages.get_handled_message(langTitle,14);
            resolve(result);
          }).then((msg) => {        
            res.status(400).json({ data: [] , message: msg, status: "wrong id" });
          })
          //#endregion
        } else {
          let business_Settings_Check_ID_Promise = new Promise(async (resolve, reject)=>{
            var exist = "";
            exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows("suspend" , Business_Settings_Data, val_Updated_By , "business_sub_services_settings_log");
            resolve(exist);
          });
          let client_Settings_Check_ID_Promise = new Promise(async (resolve, reject)=>{
            var exist = "";
            exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows("suspend" , Client_Settings_Data, val_Updated_By , "client_sub_services_settings_log");
            resolve(exist);
          });
          Promise.all([business_Settings_Check_ID_Promise,client_Settings_Check_ID_Promise]).then((Records_Updated) => {
              if(!Records_Updated){
                  //#region msg update process failed
                  new Promise(async (resolve, reject)=>{
                      var result = await fun_handled_messages.get_handled_message(langTitle,2);
                      resolve(result);
                  }).then((msg) => {
                      res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                  })          
                  //#endregion
              }else{
                  //#region msg update process successed
                  new Promise(async (resolve, reject)=>{
                  var result = await fun_handled_messages.get_handled_message(langTitle,315);
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

exports.add_New_Discount =  async(req, res) => {

  try {
      //#region Global Variables
      langTitle = req.params.langTitle;
      var val_Serial_Number = req.body.Serial_Number;
      var val_Method_Title_En = req.body.Method_Title_En;
      var val_Method_Title_Ar = req.body.Method_Title_Ar;
      var val_Discount_Type_ID = req.body.Discount_Type_ID;
      var val_Percentage_Rate = req.body.Percentage_Rate;
      var val_Fixed_Rate = req.body.Fixed_Rate;
      var val_Inserted_By = req.body.Inserted_By;
      tbl_Model = require("../../models/discount_method_lkp");
      //#endregion

      new Promise(async (resolve, reject)=>{
        let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("discount_type_lkp",val_Discount_Type_ID);
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
            var exist = await tbl_Service.check_Title_Existancy(val_Method_Title_En,val_Method_Title_Ar);
            resolve(exist);
            }).then((exist_Before) => {
              if (exist_Before[1]) {
                //#region suspend the old one then insert new row
                let recievedData = new tbl_Model({
                  Suspended_By: val_Inserted_By,
                  Suspended_DateTime: now_DateTime.get_DateTime(),
                  Is_Suspended: true
                },{ new: true});
      
                new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.update_DataRow("discount_method_lkp" ,exist_Before[0] , recievedData);
                    resolve(newList);
                }).then((Update_Flg) => {
                    if (!Update_Flg) {
                        //#region msg 2 update process failed
                        new Promise(async (resolve, reject)=>{
                        result = await fun_handled_messages.get_handled_message(langTitle,2);
                        resolve(result);
                        }).then((msg) => {
                            res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                        })           
                        //#endregion
                      } else {
                        //#region update process successed insert the new data
                        let sentData = new tbl_Model({
                          Serial_Number: val_Serial_Number,
                          Method_Title_En: val_Method_Title_En,
                          Method_Title_Ar: val_Method_Title_Ar,
                          Discount_Type_ID: val_Discount_Type_ID,
                          Percentage_Rate: val_Percentage_Rate,
                          Fixed_Rate: val_Fixed_Rate,
                          Inserted_By: val_Inserted_By,
                          Inserted_DateTime: now_DateTime.get_DateTime(),
                          Is_Suspended: false
                        });
                        new Promise(async (resolve, reject)=>{
                            const newList = await tbl_Service.create_Single_DataRow("discount_method_lkp" ,sentData);
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
                              //#region msg insert process successed
                              new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,316);
                                resolve(result);
                              }).then((msg) => {
                                if (langTitle=="en") {
                                  msg = msg.replace("Method_Title_En", val_Method_Title_En);
                                } else {
                                  msg = msg.replace("Method_Title_Ar", val_Method_Title_Ar);
                                }
                                res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                              })       
                              //#endregion
                            }
                        })
                        //#endregion
                      }
                })                        
                //#endregion
              } else {
                //#region Not Exist before so --> insert directly
                  let sentData = new tbl_Model({
                    Serial_Number: val_Serial_Number,
                    Method_Title_En: val_Method_Title_En,
                    Method_Title_Ar: val_Method_Title_Ar,
                    Discount_Type_ID: val_Discount_Type_ID,
                    Percentage_Rate: val_Percentage_Rate,
                    Fixed_Rate: val_Fixed_Rate,
                    Inserted_By: val_Inserted_By,
                    Inserted_DateTime: now_DateTime.get_DateTime(),
                    Is_Suspended: false
                  });
                  new Promise(async (resolve, reject)=>{
                      const newList = await tbl_Service.create_Single_DataRow("discount_method_lkp" ,sentData);
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
                        //#region msg insert process successed
                        new Promise(async (resolve, reject)=>{
                          let result = await fun_handled_messages.get_handled_message(langTitle,316);
                          resolve(result);
                        }).then((msg) => {
                          if (langTitle=="en") {
                            msg = msg.replace("Method_Title_En", val_Method_Title_En);
                          } else {
                            msg = msg.replace("Method_Title_Ar", val_Method_Title_Ar);
                          }
                          res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
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

exports.View_Discount_Details =  async(req, res) => {

  try {
      //#region Global Variables
      langTitle = req.params.langTitle;
      let val_Discount_ID = (req.params.id).trim();
      //#endregion

      new Promise(async (resolve, reject)=>{
        let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("discount_method_lkp",val_Discount_ID);
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
            var returnedList = await tbl_Service.get_Data_By_Discount_ID(val_Discount_ID);
            resolve(returnedList);
          }).then((returned_Data) => {
            if (returned_Data.length<=0) {
    
              new Promise(async (resolve, reject)=>{
                var result = await fun_handled_messages.get_handled_message(langTitle,317);
                resolve(result);
              }).then((msg) => {
                res.status(200).json({ data: [] , message: msg , status: "empty rows" });
              })
              
            } else {
              res.status(200).json({ data: returned_Data , message: "" , status: "rows selected" });
            }
          })
        }
      })

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }

};