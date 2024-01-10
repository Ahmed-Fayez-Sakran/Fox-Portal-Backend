//#region Global Variables
const tbl_Service = require("../../services/service_prices");
var tbl_Model = "";
var langTitle = "";
var recievedData = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');
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
  
        // let get_DataTable_Promise = new Promise(async (resolve, reject)=>{
        //     var returnedList = await tbl_Service.get_Data_By_SuspendStatus(suspendStatus,val_Page_Number);
        //     resolve(returnedList);
        // });
          
        // let get_Message_Promise = new Promise(async (resolve, reject)=>{
        //     var result = ""
        //     //#region Get Message based on suspend Status and language Title
        //     if (suspendStatus=="only-true"){  // 251
        //         result = await fun_handled_messages.get_handled_message(langTitle,382);
        //     }else if(suspendStatus=="only-false"){
        //         result = await fun_handled_messages.get_handled_message(langTitle,383);
        //     }else if(suspendStatus=="all"){
        //         result = await fun_handled_messages.get_handled_message(langTitle,384);
        //     }else{
        //         result = await fun_handled_messages.get_handled_message(langTitle,201);
        //     }
        //     //#endregion
        //     resolve(result);
        // });

        // Promise.all([get_DataTable_Promise , get_Message_Promise]).then((results) => {console.log("results[0]:"+results[0])
        //     if (results[0].length<=0) {
        //         if ((suspendStatus.trim() ==="only-true")||(suspendStatus.trim() ==="only-false")||(suspendStatus.trim() ==="all")) {
        //           res.status(200).json({ data: [] , message: results[1] , status: "empty rows" });
        //         } else {
        //             res.status(404).json({ data: [] , message: results[1] , status: "wrong url" });
        //         }
        //     } else {
        //         res.status(200).json({ data: results[0] , message: "" , status: "rows selected" });
        //     }
        // });



    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};

exports.create_Row =  async(req, res) => {

    // try {
    //     //#region Global Variables
    //     langTitle = req.params.langTitle;
    //     var val_Price_Type = req.body.Price_Type;
    //     var val_User_ID = req.body.User_ID;
    //     var val_Sub_Service_ID = req.body.Sub_Service_ID;
    //     var val_Prices_Data =  req.body.Prices_Data;
    //     var val_Inserted_By = req.body.Inserted_By;
        
    //     var val_Table_Name = "";
    //     var val_Serial_Number = "";
    //     var val_Vehicle_ID = "";
    //     var val_Open_Gauge_Price = "";
    //     var val_Fixed_KM_Price = "";
    //     var val_Fixed_Minute_Price = "";
    //     var val_Mini_Price = "";
    //     var val_Airport_Fees = "";
    //     var val_Normal_Hour_Rate_Price = "";
    //     var val_Package_ID = "";
    //     var val_Package_Price = "";
    //     var val_Is_Fixed_Value = "";
    //     var val_Flat_Schedule_Price = "";
    //     var val_Fixed_Trip_Price = "";

    //     var val_Daily_Price = "";
    //     var val_Weekly_Price = "";
    //     var val_Monthly_Price = "";

    //     const check_Prices_Promises = [];

    //     const Business_Full_Day_Details_Log_check_Prices_Promises = [];
    //     const Business_Bus_Trip_Full_Day_Details_Log_check_Prices_Promises = [];
    //     const Business_Valet_Schedule_Details_Log_check_Prices_Promises = [];

    //     const Client_Full_Day_Details_Log_check_Prices_Promises = [];
    //     const Client_Bus_Trip_Full_Day_Details_Log_check_Prices_Promises = [];
    //     const Client_Valet_Schedule_Details_Log_check_Prices_Promises = [];        

    //     const sentData = [];

    //     const Business_Full_Day_Details_Log_sentData = [];
    //     const Business_Bus_Trip_Full_Day_Details_Log_sentData = [];
    //     const Business_Valet_Schedule_Details_Log_sentData = [];
        
    //     const Client_Full_Day_Details_Log_sentData = [];
    //     const Client_Bus_Trip_Full_Day_Details_Log_sentData = [];
    //     const Client_Valet_Schedule_Details_Log_sentData = [];

    //     var Rows_ID_To_Suspend = [];

    //     var Business_Full_Day_Details_Log_Rows_ID_To_Suspend = [];
    //     var Business_Bus_Trip_Full_Day_Details_Log_Rows_ID_To_Suspend = [];
    //     var Business_Valet_Schedule_Details_Log_Rows_ID_To_Suspend = [];

    //     var Client_Full_Day_Details_Log_Rows_ID_To_Suspend = [];
    //     var Client_Bus_Trip_Full_Day_Details_Log_Rows_ID_To_Suspend = [];
    //     var Client_Valet_Schedule_Details_Log_Rows_ID_To_Suspend = [];

        

    //     var insert_object = "";

    //     var Business_Full_Day_Details_Log_insert_object = "";
    //     var Business_Bus_Trip_Full_Day_Details_Log_insert_object = "";
    //     var Business_Valet_Schedule_Details_Log_insert_object = ""; 

        
    //     var Client_Full_Day_Details_Log_insert_object = "";
    //     var Client_Bus_Trip_Full_Day_Details_Log_insert_object = "";
    //     var Client_Valet_Schedule_Details_Log_insert_object = ""; 

    //     var val_exist_Before = "";

    //     var val_Business_Full_Day_Details_Log_exist_Before = "";
    //     var val_Business_Bus_Trip_Full_Day_Details_Log_exist_Before = "";
    //     var val_Business_Valet_Schedule_Details_Log_exist_Before = "";

    //     var val_Client_Full_Day_Details_Log_exist_Before = "";
    //     var val_Client_Bus_Trip_Full_Day_Details_Log_exist_Before = "";
    //     var val_Client_Valet_Schedule_Details_Log_exist_Before = "";

    //     //#endregion
        
    //     if (val_Price_Type=="business") {
    //         //#region Business_Prices_Log
            
    //         let check_Sub_Service_ID_Promise = new Promise(async (resolve, reject)=>{
    //             let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
    //             resolve(returnedList);
    //         });
  
    //         let check_User_ID_Promise = new Promise(async (resolve, reject)=>{
    //             let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
    //             resolve(returnedList);
    //         });

    //         Promise.all([check_Sub_Service_ID_Promise , check_User_ID_Promise]).then((results) => {
    //             if ( (!results[0]) || (!results[1]) ) {
    //                 //#region ID is not exist in DB msg 75
    //                 new Promise(async (resolve, reject)=>{
    //                   var result = await fun_handled_messages.get_handled_message(langTitle,75);
    //                   resolve(result);
    //                 }).then((msg) => {        
    //                     res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //                 })
    //                 //#endregion
    //             } else {
    //                 //#region ID exist in DB
                    
    //                 // //#region Set Models Objects Variables
    //                 // tbl_Model = require("../../models/business_prices_log");
    //                 // var Business_Full_Day_Details_Log_Model = require("../../models/business_full_day_details_log");
    //                 // var Business_Bus_Trip_Full_Day_Details_Log_Model = require("../../models/business_bus_trip_full_day_details_log");
    //                 // var Business_Valet_Schedule_Details_Log_Model = require("../../models/business_valet_schedule_details_log");
    //                 // //#endregion 
                    
    //                 // val_Prices_Data.forEach(item => {

    //                 //     //#region Check Price Existancy  -->  business_prices_log Table "Schedule Valet=65200ef56be397bb41100891"
    //                 //     if (val_Sub_Service_ID !="65200ef56be397bb41100891"){
    //                 //         const savePromise_1 = new Promise(async(resolve, reject) => {
    //                 //             //#region Set Variables
    //                 //             val_Table_Name = "business_prices_log";
    //                 //             val_Vehicle_ID = item.Vehicle_ID;
    //                 //             //#endregion
    //                 //             var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_Sub_Service_ID , val_User_ID , val_Vehicle_ID , val_Package_ID , val_Package_Price);
    //                 //             resolve(returnedList);
    //                 //         });
    //                 //         check_Prices_Promises.push(savePromise_1);
    //                 //     }                
    //                 //     //#endregion

    //                 //     //#region Check Price Existancy  -->  business_full_day_details_log Table
    //                 //     if (val_Sub_Service_ID =="65200ef56be397bb41100889") {
    //                 //         const savePromise_2 = new Promise(async(resolve, reject) => {                    
    //                 //             //#region Set Variables
    //                 //             val_Table_Name = "business_full_day_details_log";
    //                 //             val_Vehicle_ID = item.Vehicle_ID;
    //                 //             val_Package_ID = item.Package_ID;
    //                 //             val_Package_Price = item.Package_Price;
    //                 //             //#endregion
    //                 //             var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_Sub_Service_ID , val_User_ID , val_Vehicle_ID , val_Package_ID , val_Package_Price);
    //                 //             resolve(returnedList);
    //                 //         });
    //                 //         Business_Full_Day_Details_Log_check_Prices_Promises.push(savePromise_2);
    //                 //     }
    //                 //     //#endregion 
                        
    //                 //     //#region Check Price Existancy  -->  business_bus_trip_full_day_details_log Table
    //                 //     if (val_Sub_Service_ID =="65200ef56be397bb4110088e") {
    //                 //         const savePromise_3 = new Promise(async(resolve, reject) => {
    //                 //             //#region Set Variables
    //                 //             val_Table_Name = "business_bus_trip_full_day_details_log";
    //                 //             val_Vehicle_ID = item.Vehicle_ID;
    //                 //             val_Package_ID = item.Package_ID;
    //                 //             val_Package_Price = item.Package_Price;
    //                 //             //#endregion
    //                 //             var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_Sub_Service_ID , val_User_ID , val_Vehicle_ID , val_Package_ID , val_Package_Price);
    //                 //             resolve(returnedList);
    //                 //         });
    //                 //         Business_Bus_Trip_Full_Day_Details_Log_check_Prices_Promises.push(savePromise_3);
    //                 //     }
    //                 //     //#endregion 
                        
    //                 //     //#region Check Price Existancy  -->  business_valet_schedule_details_log Table
    //                 //     if (val_Sub_Service_ID =="65200ef56be397bb41100891") {
    //                 //         const savePromise_4 = new Promise(async(resolve, reject) => {
    //                 //             //#region Set Variables
    //                 //             val_Table_Name = "business_valet_schedule_details_log";
    //                 //             val_Package_ID = item.Package_ID;
    //                 //             val_Package_Price = item.Package_Price;
    //                 //             //#endregion                        
    //                 //             var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_Sub_Service_ID , val_User_ID , val_Vehicle_ID , val_Package_ID , val_Package_Price);
    //                 //             resolve(returnedList);
    //                 //         });
    //                 //         Business_Valet_Schedule_Details_Log_check_Prices_Promises.push(savePromise_4);
    //                 //     }
    //                 //     //#endregion 
                        
    //                 // });
                                
    //                 // Promise.all
    //                 // ([
    //                 //     Promise.all(check_Prices_Promises), 
    //                 //     Promise.all(Business_Full_Day_Details_Log_check_Prices_Promises), 
    //                 //     Promise.all(Business_Bus_Trip_Full_Day_Details_Log_check_Prices_Promises), 
    //                 //     Promise.all(Business_Valet_Schedule_Details_Log_check_Prices_Promises)
    //                 // ]).then(results => {

    //                 //     var val_Row_ID = "";                
    //                 //     for (let i = 0; i < results.length; i++) 
    //                 //     {
    //                 //         for (let j = 0; j < results[i].length; j++)
    //                 //         {
    //                 //             //#region set values
    //                 //             val_Row_ID = results[i][j][0];
    //                 //             val_Serial_Number = val_Prices_Data[j].Serial_Number;
    //                 //             val_Vehicle_ID = val_Prices_Data[j].Vehicle_ID;
    //                 //             //#endregion

    //                 //             //#region Set Unique Fields based on sub service ID
    //                 //             if (val_Sub_Service_ID =="65200ef56be397bb41100884")
    //                 //             {
    //                 //                 //#region rent_car
    //                 //                 if (i == 0) { 
    //                 //                     val_Daily_Price = val_Prices_Data[j].Daily_Price;
    //                 //                     val_Weekly_Price = val_Prices_Data[j].Weekly_Price;
    //                 //                     val_Monthly_Price = val_Prices_Data[j].Monthly_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Daily_Price: val_Daily_Price,
    //                 //                         Weekly_Price: val_Weekly_Price,
    //                 //                         Monthly_Price: val_Monthly_Price,

    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100885")
    //                 //             {
    //                 //                 //#region city_trip
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];                           
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100886")
    //                 //             {
    //                 //                 //#region airport_pickup
    //                 //                 if (i == 0) { 
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Airport_Fees = val_Prices_Data[j].Airport_Fees;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Airport_Fees: val_Airport_Fees,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];                       
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100887")
    //                 //             {
    //                 //                 //#region airport_drop_off
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];      
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100888")
    //                 //             {
    //                 //                 //#region hours_booking
    //                 //                 if (i == 0) {
    //                 //                     val_Normal_Hour_Rate_Price = val_Prices_Data[j].Normal_Hour_Rate_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Normal_Hour_Rate_Price: val_Normal_Hour_Rate_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100889")
    //                 //             {
    //                 //                 //#region full_day_booking
    //                 //                 val_Package_ID = val_Prices_Data[j].Package_ID;
    //                 //                 val_Package_Price = val_Prices_Data[j].Package_Price;
    //                 //                 val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                 if (i == 0) {
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 } else if (i == 1) {
    //                 //                     Business_Full_Day_Details_Log_insert_object = new Business_Full_Day_Details_Log_Model({
    //                 //                         Package_ID: val_Package_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
    //                 //                         Package_Price: val_Package_Price,
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     Business_Full_Day_Details_Log_sentData.push(Business_Full_Day_Details_Log_insert_object);
    //                 //                     val_Business_Full_Day_Details_Log_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088a")
    //                 //             {
    //                 //                 //#region school_schedule
    //                 //                 if (i == 0) {
    //                 //                     val_Is_Fixed_Value = val_Prices_Data[j].Is_Fixed_Value;
    //                 //                     if (val_Is_Fixed_Value) {
    //                 //                         val_Flat_Schedule_Price = val_Prices_Data[j].Flat_Schedule_Price;        
    //                 //                         val_Fixed_Trip_Price = val_Prices_Data[j].Fixed_Trip_Price;
    //                 //                         insert_object = new tbl_Model({
    //                 //                             Serial_Number: val_Serial_Number,
    //                 //                             Sub_Service_ID: val_Sub_Service_ID,
    //                 //                             User_ID: val_User_ID,
    //                 //                             Vehicle_ID: val_Vehicle_ID,
                                                
    //                 //                             Is_Fixed_Value: val_Is_Fixed_Value,
    //                 //                             Flat_Schedule_Price: val_Flat_Schedule_Price,
    //                 //                             Fixed_Trip_Price: val_Fixed_Trip_Price,
                    
    //                 //                             Inserted_By: val_Inserted_By,
    //                 //                             Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                         });
    //                 //                     } else {
    //                 //                         val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                         val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                         val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                         val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                         insert_object = new tbl_Model({
    //                 //                             Serial_Number: val_Serial_Number,
    //                 //                             Sub_Service_ID: val_Sub_Service_ID,
    //                 //                             User_ID: val_User_ID,
    //                 //                             Vehicle_ID: val_Vehicle_ID,
                                                
    //                 //                             Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                             Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                             Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                             Mini_Price: val_Mini_Price,
                    
    //                 //                             Inserted_By: val_Inserted_By,
    //                 //                             Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                         });
    //                 //                     }
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088b")
    //                 //             {
    //                 //                 //#region bus_city_trip
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088c")
    //                 //             {
    //                 //                 //#region bus_airport_pickup
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Airport_Fees = val_Prices_Data[j].Airport_Fees;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Airport_Fees: val_Airport_Fees,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088d")
    //                 //             {
    //                 //                 //#region bus_airport_drop_off
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088e")
    //                 //             {
    //                 //                 //#region bus_full_day_booking
    //                 //                 val_Package_ID = val_Prices_Data[j].Package_ID;
    //                 //                 val_Package_Price = val_Prices_Data[j].Package_Price;
    //                 //                 val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                 if (i == 0) {
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 } else if (i == 2) {
    //                 //                     Business_Bus_Trip_Full_Day_Details_Log_insert_object = new Business_Bus_Trip_Full_Day_Details_Log_Model({
    //                 //                         Package_ID: val_Package_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
    //                 //                         Package_Price: val_Package_Price,
    //                 //                         Is_Suspended: false,
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     Business_Bus_Trip_Full_Day_Details_Log_sentData.push(Business_Bus_Trip_Full_Day_Details_Log_insert_object);
    //                 //                     val_Business_Bus_Trip_Full_Day_Details_Log_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088f")
    //                 //             {
    //                 //                 //#region bus_schedule
    //                 //                 if (i == 0) {
    //                 //                     val_Is_Fixed_Value = val_Prices_Data[j].Is_Fixed_Value;
    //                 //                     if (val_Is_Fixed_Value) {
    //                 //                         val_Flat_Schedule_Price = val_Prices_Data[j].Flat_Schedule_Price;        
    //                 //                         val_Fixed_Trip_Price = val_Prices_Data[j].Fixed_Trip_Price;
    //                 //                         insert_object = new tbl_Model({
    //                 //                             Serial_Number: val_Serial_Number,
    //                 //                             Sub_Service_ID: val_Sub_Service_ID,
    //                 //                             User_ID: val_User_ID,
    //                 //                             Vehicle_ID: val_Vehicle_ID,
                                                
    //                 //                             Is_Fixed_Value: val_Is_Fixed_Value,
    //                 //                             Flat_Schedule_Price: val_Flat_Schedule_Price,
    //                 //                             Fixed_Trip_Price: val_Fixed_Trip_Price,
                    
    //                 //                             Inserted_By: val_Inserted_By,
    //                 //                             Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                         });
    //                 //                     } else {
    //                 //                         val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                         val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                         val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                         val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                         insert_object = new tbl_Model({
    //                 //                             Serial_Number: val_Serial_Number,
    //                 //                             Sub_Service_ID: val_Sub_Service_ID,
    //                 //                             User_ID: val_User_ID,
    //                 //                             Vehicle_ID: val_Vehicle_ID,
                                                
    //                 //                             Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                             Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                             Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                             Mini_Price: val_Mini_Price,
                    
    //                 //                             Inserted_By: val_Inserted_By,
    //                 //                             Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                         });
    //                 //                     }
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
                                    
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100890")
    //                 //             {
    //                 //                 //#region spot_valet
    //                 //                 if (i == 0) {
    //                 //                     val_Normal_Hour_Rate_Price = val_Prices_Data[j].Normal_Hour_Rate_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Normal_Hour_Rate_Price: val_Normal_Hour_Rate_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }                            
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100891")
    //                 //             {
    //                 //                 //#region schedule_valet
    //                 //                 if (i == 3) {
    //                 //                     val_Package_ID = val_Prices_Data[j].Package_ID;
    //                 //                     val_Package_Price = val_Prices_Data[j].Package_Price;
    //                 //                     Business_Valet_Schedule_Details_Log_insert_object = new Business_Valet_Schedule_Details_Log_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Package_ID: val_Package_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Package_Price: val_Package_Price,
    //                 //                         Is_Suspended: false,
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     Business_Valet_Schedule_Details_Log_sentData.push(Business_Valet_Schedule_Details_Log_insert_object)
    //                 //                     val_Business_Valet_Schedule_Details_Log_exist_Before = results[i][j][1];
    //                 //                 }                            
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100892")
    //                 //             {
    //                 //                 //#region courier_booking
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         User_ID: val_User_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }                            
    //                 //                 //#endregion
    //                 //             }
    //                 //             //#endregion
                                
    //                 //             //#region check if exist Before set ID to suspend then insert new row
    //                 //             if (val_exist_Before) {
    //                 //                 Rows_ID_To_Suspend[j] = val_Row_ID;                            
    //                 //             }
    //                 //             if (val_Business_Full_Day_Details_Log_exist_Before) {
    //                 //                 Business_Full_Day_Details_Log_Rows_ID_To_Suspend[j] = val_Row_ID;
    //                 //                 console.log("val_Row_ID : "+val_Row_ID)
    //                 //             }
    //                 //             if (val_Business_Bus_Trip_Full_Day_Details_Log_exist_Before) {
    //                 //                 Business_Bus_Trip_Full_Day_Details_Log_Rows_ID_To_Suspend[j] = val_Row_ID;                            
    //                 //             }
    //                 //             if (val_Business_Valet_Schedule_Details_Log_exist_Before) {
    //                 //                 Business_Valet_Schedule_Details_Log_Rows_ID_To_Suspend[j] = val_Row_ID;                            
    //                 //             }
    //                 //             //#endregion
    //                 //         }
    //                 //         val_Row_ID = "";
    //                 //         val_exist_Before = "";
    //                 //     }

    //                 //     //#region msg insert process successed then suspend rows already exist before
    //                 //     if (Business_Valet_Schedule_Details_Log_sentData.length>0) {
    //                 //         new Promise(async (resolve, reject)=>{
    //                 //             const newList = await tbl_Service.create_Many_DataRows("business_valet_schedule_details_log" , Business_Valet_Schedule_Details_Log_sentData);
    //                 //             resolve(newList);
    //                 //         }).then((insert_Flg_3) => {
    //                 //             if (Business_Valet_Schedule_Details_Log_Rows_ID_To_Suspend.length>0) {
    //                 //                 new Promise(async (resolve, reject)=>{
    //                 //                     const newList = await tbl_Service.Suspend_Many_DataRows("business_valet_schedule_details_log" , Business_Valet_Schedule_Details_Log_Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
    //                 //                     resolve(newList);
    //                 //                 }).then((update_Flg) => {
    //                 //                     new Promise(async (resolve, reject)=>{
    //                 //                         let result = await fun_handled_messages.get_handled_message(langTitle,412);
    //                 //                         resolve(result);
    //                 //                     }).then((msg) => {
    //                 //                         res.status(200).json({ data: insert_Flg_3 , message: msg , status: "insert successed" });
    //                 //                     })
    //                 //                 })
    //                 //             } else{
    //                 //                 new Promise(async (resolve, reject)=>{
    //                 //                     let result = await fun_handled_messages.get_handled_message(langTitle,412);
    //                 //                     resolve(result);
    //                 //                 }).then((msg) => {
    //                 //                     res.status(200).json({ data: insert_Flg_3 , message: msg , status: "insert successed" });
    //                 //                 })
    //                 //             }
    //                 //         })
    //                 //     }
    //                 //     else {
    //                 //         var concate_Data ="";
    //                 //         if (Business_Full_Day_Details_Log_sentData.length>0) {
    //                 //             new Promise(async (resolve, reject)=>{
    //                 //                 const newList = await tbl_Service.create_Many_DataRows("business_full_day_details_log" , Business_Full_Day_Details_Log_sentData);
    //                 //                 resolve(newList);
    //                 //             }).then((insert_Flg_1) => {
    //                 //                 concate_Data =insert_Flg_1;
    //                 //                 if (Business_Full_Day_Details_Log_Rows_ID_To_Suspend.length>0) {
    //                 //                     new Promise(async (resolve, reject)=>{
    //                 //                         const newList = await tbl_Service.Suspend_Many_DataRows("business_full_day_details_log" , Business_Full_Day_Details_Log_Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
    //                 //                         resolve(newList);
    //                 //                     })
    //                 //                 }
    //                 //             })
    //                 //         }
    //                 //         if (Business_Bus_Trip_Full_Day_Details_Log_sentData.length>0) {
    //                 //             new Promise(async (resolve, reject)=>{
    //                 //                 const newList = await tbl_Service.create_Many_DataRows("business_bus_trip_full_day_details_log" , Business_Bus_Trip_Full_Day_Details_Log_sentData);
    //                 //                 resolve(newList);
    //                 //             }).then((insert_Flg_2) => {
    //                 //                 concate_Data =insert_Flg_2;
    //                 //                 if (Business_Bus_Trip_Full_Day_Details_Log_Rows_ID_To_Suspend.length>0) {
    //                 //                     new Promise(async (resolve, reject)=>{
    //                 //                         const newList = await tbl_Service.Suspend_Many_DataRows("business_bus_trip_full_day_details_log" , Business_Bus_Trip_Full_Day_Details_Log_Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
    //                 //                         resolve(newList);
    //                 //                     })
    //                 //                 }
    //                 //             })
    //                 //         }
    //                 //         if (sentData.length>0) {
    //                 //             new Promise(async (resolve, reject)=>{
    //                 //                 const newList = await tbl_Service.create_Many_DataRows("business_prices_log" , sentData);
    //                 //                 resolve(newList);
    //                 //             }).then((insert_Flg) => {
    //                 //                 if (!insert_Flg) {
    //                 //                     //#region msg 1 insert process failed
    //                 //                     new Promise(async (resolve, reject)=>{
    //                 //                         let result = await fun_handled_messages.get_handled_message(langTitle,1);
    //                 //                         resolve(result);
    //                 //                     }).then((msg) => {
    //                 //                         res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
    //                 //                     })
    //                 //                     //#endregion
    //                 //                 } else {
    //                 //                     //#region msg insert process successed then suspend rows already exist before
    //                 //                     if (Rows_ID_To_Suspend.length>0) {
    //                 //                         new Promise(async (resolve, reject)=>{
    //                 //                             const newList = await tbl_Service.Suspend_Many_DataRows("business_prices_log" , Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
    //                 //                             resolve(newList);
    //                 //                         }).then((update_Flg) => {
    //                 //                             new Promise(async (resolve, reject)=>{
    //                 //                                 let result = await fun_handled_messages.get_handled_message(langTitle,282);
    //                 //                                 resolve(result);
    //                 //                             }).then((msg) => {
    //                 //                                 if (Business_Full_Day_Details_Log_sentData.length>0){
    //                 //                                     res.status(200).json({ data: insert_Flg, Details_Log:concate_Data , message: msg , status: "insert successed" });
    //                 //                                 }else if (Business_Bus_Trip_Full_Day_Details_Log_sentData.length>0){
    //                 //                                     res.status(200).json({ data: insert_Flg, Details_Log:concate_Data , message: msg , status: "insert successed" });
    //                 //                                 }else{
    //                 //                                     res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
    //                 //                                 }
    //                 //                             })
    //                 //                         })
    //                 //                     } else{
    //                 //                         new Promise(async (resolve, reject)=>{
    //                 //                             let result = await fun_handled_messages.get_handled_message(langTitle,282);
    //                 //                             resolve(result);
    //                 //                         }).then((msg) => {
    //                 //                             if (Business_Full_Day_Details_Log_sentData.length>0){
    //                 //                                 res.status(200).json({ data: insert_Flg, Details_Log:concate_Data , message: msg , status: "insert successed" });
    //                 //                             }else if (Business_Bus_Trip_Full_Day_Details_Log_sentData.length>0){
    //                 //                                 res.status(200).json({ data: insert_Flg, Details_Log:concate_Data , message: msg , status: "insert successed" });
    //                 //                             }else{
    //                 //                                 res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
    //                 //                             }
    //                 //                         })
    //                 //                     }
    //                 //                     //#endregion
    //                 //                 }
    //                 //             })
    //                 //         }
    //                 //     }
    //                 //     //#endregion
                        
    //                 // })

    //                 //#endregion
    //             }
    //         })

    //         //#endregion
    //     } else {
    //         //#region Client_Prices_Log

    //         new Promise(async (resolve, reject)=>{
    //             let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
    //             resolve(returnedList);
    //           }).then((returned_ID) => {
    //             if (!returned_ID) {
    //               //#region ID is not exist in DB msg 75
    //               new Promise(async (resolve, reject)=>{
    //                   var result = await fun_handled_messages.get_handled_message(langTitle,75);
    //                   resolve(result);
    //               }).then((msg) => {        
    //                   res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //               })
    //               //#endregion
    //             } else {
    //               //#region ID exist in DB
                  
    //                 // //#region Set Models Objects Variables
    //                 // tbl_Model = require("../../models/client_prices_log");
    //                 // var Client_Full_Day_Details_Log_Model = require("../../models/client_full_day_details_log");
    //                 // var Client_Bus_Trip_Full_Day_Details_Log_Model = require("../../models/client_bus_trip_full_day_details_log");
    //                 // var Client_Valet_Schedule_Details_Log_Model = require("../../models/client_valet_schedule_details_log");
    //                 // //#endregion
                    
    //                 // val_Prices_Data.forEach(item => {

    //                 //     //#region Check Price Existancy  -->  client_prices_log Table "Schedule Valet=65200ef56be397bb41100891"
    //                 //     if (val_Sub_Service_ID !="65200ef56be397bb41100891"){
    //                 //         const savePromise_1 = new Promise(async(resolve, reject) => {
    //                 //             //#region Set Variables
    //                 //             val_Table_Name = "client_prices_log";
    //                 //             val_Vehicle_ID = item.Vehicle_ID;
    //                 //             //#endregion
    //                 //             var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_Sub_Service_ID , val_User_ID , val_Vehicle_ID , val_Package_ID , val_Package_Price);
    //                 //             resolve(returnedList);
    //                 //         });
    //                 //         check_Prices_Promises.push(savePromise_1);
    //                 //     }                
    //                 //     //#endregion

    //                 //     //#region Check Price Existancy  -->  client_full_day_details_log Table
    //                 //     if (val_Sub_Service_ID =="65200ef56be397bb41100889") {
    //                 //         const savePromise_2 = new Promise(async(resolve, reject) => {                    
    //                 //             //#region Set Variables
    //                 //             val_Table_Name = "client_full_day_details_log";
    //                 //             val_Vehicle_ID = item.Vehicle_ID;
    //                 //             val_Package_ID = item.Package_ID;
    //                 //             val_Package_Price = item.Package_Price;
    //                 //             //#endregion
    //                 //             var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_Sub_Service_ID , val_User_ID , val_Vehicle_ID , val_Package_ID , val_Package_Price);
    //                 //             resolve(returnedList);
    //                 //         });
    //                 //         Client_Full_Day_Details_Log_check_Prices_Promises.push(savePromise_2);
    //                 //     }
    //                 //     //#endregion 
                        
    //                 //     //#region Check Price Existancy  -->  Client_Bus_Trip_Full_Day_Details_Log Table
    //                 //     if (val_Sub_Service_ID =="65200ef56be397bb4110088e") {
    //                 //         const savePromise_3 = new Promise(async(resolve, reject) => {
    //                 //             //#region Set Variables
    //                 //             val_Table_Name = "Client_Bus_Trip_Full_Day_Details_Log";
    //                 //             val_Vehicle_ID = item.Vehicle_ID;
    //                 //             val_Package_ID = item.Package_ID;
    //                 //             val_Package_Price = item.Package_Price;
    //                 //             //#endregion
    //                 //             var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_Sub_Service_ID , val_User_ID , val_Vehicle_ID , val_Package_ID , val_Package_Price);
    //                 //             resolve(returnedList);
    //                 //         });
    //                 //         Client_Bus_Trip_Full_Day_Details_Log_check_Prices_Promises.push(savePromise_3);
    //                 //     }
    //                 //     //#endregion 
                        
    //                 //     //#region Check Price Existancy  -->  client_valet_schedule_details_log Table
    //                 //     if (val_Sub_Service_ID =="65200ef56be397bb41100891") {
    //                 //         const savePromise_4 = new Promise(async(resolve, reject) => {
    //                 //             //#region Set Variables
    //                 //             val_Table_Name = "client_valet_schedule_details_log";
    //                 //             val_Package_ID = item.Package_ID;
    //                 //             val_Package_Price = item.Package_Price;
    //                 //             //#endregion                        
    //                 //             var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_Sub_Service_ID , val_User_ID , val_Vehicle_ID , val_Package_ID , val_Package_Price);
    //                 //             resolve(returnedList);
    //                 //         });
    //                 //         Client_Valet_Schedule_Details_Log_check_Prices_Promises.push(savePromise_4);
    //                 //     }
    //                 //     //#endregion 
                        
    //                 // });
                                
    //                 // Promise.all
    //                 // ([
    //                 //     Promise.all(check_Prices_Promises), 
    //                 //     Promise.all(Client_Full_Day_Details_Log_check_Prices_Promises), 
    //                 //     Promise.all(Client_Bus_Trip_Full_Day_Details_Log_check_Prices_Promises), 
    //                 //     Promise.all(Client_Valet_Schedule_Details_Log_check_Prices_Promises)
    //                 // ]).then(results => {

    //                 //     var val_Row_ID = "";                
    //                 //     for (let i = 0; i < results.length; i++) 
    //                 //     {
    //                 //         for (let j = 0; j < results[i].length; j++)
    //                 //         {
    //                 //             //#region set values
    //                 //             val_Row_ID = results[i][j][0];
    //                 //             val_Serial_Number = val_Prices_Data[j].Serial_Number;
    //                 //             val_Vehicle_ID = val_Prices_Data[j].Vehicle_ID;
    //                 //             //#endregion

    //                 //             //#region Set Unique Fields based on sub service ID
    //                 //             if (val_Sub_Service_ID =="65200ef56be397bb41100884")
    //                 //             {
    //                 //                 //#region rent_car
    //                 //                 if (i == 0) { 
    //                 //                     val_Daily_Price = val_Prices_Data[j].Daily_Price;
    //                 //                     val_Weekly_Price = val_Prices_Data[j].Weekly_Price;
    //                 //                     val_Monthly_Price = val_Prices_Data[j].Monthly_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Daily_Price: val_Daily_Price,
    //                 //                         Weekly_Price: val_Weekly_Price,
    //                 //                         Monthly_Price: val_Monthly_Price,

    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100885")
    //                 //             {
    //                 //                 //#region city_trip
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];                           
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100886")
    //                 //             {
    //                 //                 //#region airport_pickup
    //                 //                 if (i == 0) { 
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Airport_Fees = val_Prices_Data[j].Airport_Fees;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Airport_Fees: val_Airport_Fees,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];                       
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100887")
    //                 //             {
    //                 //                 //#region airport_drop_off
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];      
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100888")
    //                 //             {
    //                 //                 //#region hours_booking
    //                 //                 if (i == 0) {
    //                 //                     val_Normal_Hour_Rate_Price = val_Prices_Data[j].Normal_Hour_Rate_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Normal_Hour_Rate_Price: val_Normal_Hour_Rate_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100889")
    //                 //             {
    //                 //                 //#region full_day_booking
    //                 //                 val_Package_ID = val_Prices_Data[j].Package_ID;
    //                 //                 val_Package_Price = val_Prices_Data[j].Package_Price;
    //                 //                 val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                 if (i == 0) {
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 } else if (i == 1) {
    //                 //                     Client_Full_Day_Details_Log_insert_object = new Client_Full_Day_Details_Log_Model({
    //                 //                         Package_ID: val_Package_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
    //                 //                         Package_Price: val_Package_Price,
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     Client_Full_Day_Details_Log_sentData.push(Client_Full_Day_Details_Log_insert_object);
    //                 //                     val_Client_Full_Day_Details_Log_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088a")
    //                 //             {
    //                 //                 //#region school_schedule
    //                 //                 if (i == 0) {
    //                 //                     val_Is_Fixed_Value = val_Prices_Data[j].Is_Fixed_Value;
    //                 //                     if (val_Is_Fixed_Value) {
    //                 //                         val_Flat_Schedule_Price = val_Prices_Data[j].Flat_Schedule_Price;        
    //                 //                         val_Fixed_Trip_Price = val_Prices_Data[j].Fixed_Trip_Price;
    //                 //                         insert_object = new tbl_Model({
    //                 //                             Serial_Number: val_Serial_Number,
    //                 //                             Sub_Service_ID: val_Sub_Service_ID,
    //                 //                             Vehicle_ID: val_Vehicle_ID,
                                                
    //                 //                             Is_Fixed_Value: val_Is_Fixed_Value,
    //                 //                             Flat_Schedule_Price: val_Flat_Schedule_Price,
    //                 //                             Fixed_Trip_Price: val_Fixed_Trip_Price,
                    
    //                 //                             Inserted_By: val_Inserted_By,
    //                 //                             Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                         });
    //                 //                     } else {
    //                 //                         val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                         val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                         val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                         val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                         insert_object = new tbl_Model({
    //                 //                             Serial_Number: val_Serial_Number,
    //                 //                             Sub_Service_ID: val_Sub_Service_ID,
    //                 //                             Vehicle_ID: val_Vehicle_ID,
                                                
    //                 //                             Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                             Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                             Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                             Mini_Price: val_Mini_Price,
                    
    //                 //                             Inserted_By: val_Inserted_By,
    //                 //                             Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                         });
    //                 //                     }
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088b")
    //                 //             {
    //                 //                 //#region bus_city_trip
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088c")
    //                 //             {
    //                 //                 //#region bus_airport_pickup
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Airport_Fees = val_Prices_Data[j].Airport_Fees;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Airport_Fees: val_Airport_Fees,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088d")
    //                 //             {
    //                 //                 //#region bus_airport_drop_off
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088e")
    //                 //             {
    //                 //                 //#region bus_full_day_booking
    //                 //                 val_Package_ID = val_Prices_Data[j].Package_ID;
    //                 //                 val_Package_Price = val_Prices_Data[j].Package_Price;
    //                 //                 val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                 if (i == 0) {
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 } else if (i == 2) {
    //                 //                     Client_Bus_Trip_Full_Day_Details_Log_insert_object = new Client_Bus_Trip_Full_Day_Details_Log_Model({
    //                 //                         Package_ID: val_Package_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
    //                 //                         Package_Price: val_Package_Price,
    //                 //                         Is_Suspended: false,
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     Client_Bus_Trip_Full_Day_Details_Log_sentData.push(Client_Bus_Trip_Full_Day_Details_Log_insert_object);
    //                 //                     val_Client_Bus_Trip_Full_Day_Details_Log_exist_Before = results[i][j][1];
    //                 //                 }
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb4110088f")
    //                 //             {
    //                 //                 //#region bus_schedule
    //                 //                 if (i == 0) {
    //                 //                     val_Is_Fixed_Value = val_Prices_Data[j].Is_Fixed_Value;
    //                 //                     if (val_Is_Fixed_Value) {
    //                 //                         val_Flat_Schedule_Price = val_Prices_Data[j].Flat_Schedule_Price;        
    //                 //                         val_Fixed_Trip_Price = val_Prices_Data[j].Fixed_Trip_Price;
    //                 //                         insert_object = new tbl_Model({
    //                 //                             Serial_Number: val_Serial_Number,
    //                 //                             Sub_Service_ID: val_Sub_Service_ID,
    //                 //                             Vehicle_ID: val_Vehicle_ID,
                                                
    //                 //                             Is_Fixed_Value: val_Is_Fixed_Value,
    //                 //                             Flat_Schedule_Price: val_Flat_Schedule_Price,
    //                 //                             Fixed_Trip_Price: val_Fixed_Trip_Price,
                    
    //                 //                             Inserted_By: val_Inserted_By,
    //                 //                             Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                         });
    //                 //                     } else {
    //                 //                         val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                         val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                         val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                         val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                         insert_object = new tbl_Model({
    //                 //                             Serial_Number: val_Serial_Number,
    //                 //                             Sub_Service_ID: val_Sub_Service_ID,
    //                 //                             Vehicle_ID: val_Vehicle_ID,
                                                
    //                 //                             Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                             Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                             Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                             Mini_Price: val_Mini_Price,
                    
    //                 //                             Inserted_By: val_Inserted_By,
    //                 //                             Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                         });
    //                 //                     }
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }
                                    
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100890")
    //                 //             {
    //                 //                 //#region spot_valet
    //                 //                 if (i == 0) {
    //                 //                     val_Normal_Hour_Rate_Price = val_Prices_Data[j].Normal_Hour_Rate_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Normal_Hour_Rate_Price: val_Normal_Hour_Rate_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }                            
    //                 //                 //#endregion
    //                 //             } 
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100891")
    //                 //             {
    //                 //                 //#region schedule_valet
    //                 //                 if (i == 3) {
    //                 //                     val_Package_ID = val_Prices_Data[j].Package_ID;
    //                 //                     val_Package_Price = val_Prices_Data[j].Package_Price;
    //                 //                     Client_Valet_Schedule_Details_Log_insert_object = new Client_Valet_Schedule_Details_Log_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Package_ID: val_Package_ID,
    //                 //                         Package_Price: val_Package_Price,
    //                 //                         Is_Suspended: false,
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     Client_Valet_Schedule_Details_Log_sentData.push(Client_Valet_Schedule_Details_Log_insert_object)
    //                 //                     val_Client_Valet_Schedule_Details_Log_exist_Before = results[i][j][1];
    //                 //                 }                            
    //                 //                 //#endregion
    //                 //             }
    //                 //             else if (val_Sub_Service_ID =="65200ef56be397bb41100892")
    //                 //             {
    //                 //                 //#region courier_booking
    //                 //                 if (i == 0) {
    //                 //                     val_Open_Gauge_Price = val_Prices_Data[j].Open_Gauge_Price;
    //                 //                     val_Fixed_KM_Price = val_Prices_Data[j].Fixed_KM_Price;
    //                 //                     val_Fixed_Minute_Price = val_Prices_Data[j].Fixed_Minute_Price;
    //                 //                     val_Mini_Price = val_Prices_Data[j].Mini_Price;
    //                 //                     insert_object = new tbl_Model({
    //                 //                         Serial_Number: val_Serial_Number,
    //                 //                         Sub_Service_ID: val_Sub_Service_ID,
    //                 //                         Vehicle_ID: val_Vehicle_ID,
                                            
    //                 //                         Open_Gauge_Price: val_Open_Gauge_Price,
    //                 //                         Fixed_KM_Price: val_Fixed_KM_Price,
    //                 //                         Fixed_Minute_Price: val_Fixed_Minute_Price,
    //                 //                         Mini_Price: val_Mini_Price,
                
    //                 //                         Inserted_By: val_Inserted_By,
    //                 //                         Inserted_DateTime: now_DateTime.get_DateTime()
    //                 //                     });
    //                 //                     sentData.push(insert_object);
    //                 //                     val_exist_Before = results[i][j][1];
    //                 //                 }                            
    //                 //                 //#endregion
    //                 //             }
    //                 //             //#endregion
                                
    //                 //             //#region check if exist Before set ID to suspend then insert new row
    //                 //             if (val_exist_Before) {
    //                 //                 Rows_ID_To_Suspend[j] = val_Row_ID;                            
    //                 //             }
    //                 //             if (val_Client_Full_Day_Details_Log_exist_Before) {
    //                 //                 Client_Full_Day_Details_Log_Rows_ID_To_Suspend[j] = val_Row_ID;
    //                 //                 console.log("val_Row_ID : "+val_Row_ID)
    //                 //             }
    //                 //             if (val_Client_Bus_Trip_Full_Day_Details_Log_exist_Before) {
    //                 //                 Client_Bus_Trip_Full_Day_Details_Log_Rows_ID_To_Suspend[j] = val_Row_ID;                            
    //                 //             }
    //                 //             if (val_Client_Valet_Schedule_Details_Log_exist_Before) {
    //                 //                 Client_Valet_Schedule_Details_Log_Rows_ID_To_Suspend[j] = val_Row_ID;                            
    //                 //             }
    //                 //             //#endregion
    //                 //         }
    //                 //         val_Row_ID = "";
    //                 //         val_exist_Before = "";
    //                 //     }

    //                 //     //#region msg insert process successed then suspend rows already exist before
    //                 //     if (Client_Valet_Schedule_Details_Log_sentData.length>0) {
    //                 //         new Promise(async (resolve, reject)=>{
    //                 //             const newList = await tbl_Service.create_Many_DataRows("client_valet_schedule_details_log" , Client_Valet_Schedule_Details_Log_sentData);
    //                 //             resolve(newList);
    //                 //         }).then((insert_Flg_3) => {
    //                 //             if (Client_Valet_Schedule_Details_Log_Rows_ID_To_Suspend.length>0) {
    //                 //                 new Promise(async (resolve, reject)=>{
    //                 //                     const newList = await tbl_Service.Suspend_Many_DataRows("client_valet_schedule_details_log" , Client_Valet_Schedule_Details_Log_Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
    //                 //                     resolve(newList);
    //                 //                 }).then((update_Flg) => {
    //                 //                     new Promise(async (resolve, reject)=>{
    //                 //                         let result = await fun_handled_messages.get_handled_message(langTitle,412);
    //                 //                         resolve(result);
    //                 //                     }).then((msg) => {
    //                 //                         res.status(200).json({ data: insert_Flg_3 , message: msg , status: "insert successed" });
    //                 //                     })
    //                 //                 })
    //                 //             } else{
    //                 //                 new Promise(async (resolve, reject)=>{
    //                 //                     let result = await fun_handled_messages.get_handled_message(langTitle,412);
    //                 //                     resolve(result);
    //                 //                 }).then((msg) => {
    //                 //                     res.status(200).json({ data: insert_Flg_3 , message: msg , status: "insert successed" });
    //                 //                 })
    //                 //             }
    //                 //         })
    //                 //     }
    //                 //     else {
    //                 //         var concate_Data ="";
    //                 //         if (Client_Full_Day_Details_Log_sentData.length>0) {
    //                 //             new Promise(async (resolve, reject)=>{
    //                 //                 const newList = await tbl_Service.create_Many_DataRows("client_full_day_details_log" , Client_Full_Day_Details_Log_sentData);
    //                 //                 resolve(newList);
    //                 //             }).then((insert_Flg_1) => {
    //                 //                 concate_Data =insert_Flg_1;
    //                 //                 if (Client_Full_Day_Details_Log_Rows_ID_To_Suspend.length>0) {
    //                 //                     new Promise(async (resolve, reject)=>{
    //                 //                         const newList = await tbl_Service.Suspend_Many_DataRows("client_full_day_details_log" , Client_Full_Day_Details_Log_Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
    //                 //                         resolve(newList);
    //                 //                     })
    //                 //                 }
    //                 //             })
    //                 //         }
    //                 //         if (Client_Bus_Trip_Full_Day_Details_Log_sentData.length>0) {
    //                 //             new Promise(async (resolve, reject)=>{
    //                 //                 const newList = await tbl_Service.create_Many_DataRows("client_bus_trip_full_day_details_log" , Client_Bus_Trip_Full_Day_Details_Log_sentData);
    //                 //                 resolve(newList);
    //                 //             }).then((insert_Flg_2) => {
    //                 //                 concate_Data =insert_Flg_2;
    //                 //                 if (Client_Bus_Trip_Full_Day_Details_Log_Rows_ID_To_Suspend.length>0) {
    //                 //                     new Promise(async (resolve, reject)=>{
    //                 //                         const newList = await tbl_Service.Suspend_Many_DataRows("client_bus_trip_full_day_details_log" , Client_Bus_Trip_Full_Day_Details_Log_Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
    //                 //                         resolve(newList);
    //                 //                     })
    //                 //                 }
    //                 //             })
    //                 //         }
    //                 //         if (sentData.length>0) {
    //                 //             new Promise(async (resolve, reject)=>{
    //                 //                 const newList = await tbl_Service.create_Many_DataRows("client_prices_log" , sentData);
    //                 //                 resolve(newList);
    //                 //             }).then((insert_Flg) => {
    //                 //                 if (!insert_Flg) {
    //                 //                     //#region msg 1 insert process failed
    //                 //                     new Promise(async (resolve, reject)=>{
    //                 //                         let result = await fun_handled_messages.get_handled_message(langTitle,1);
    //                 //                         resolve(result);
    //                 //                     }).then((msg) => {
    //                 //                         res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
    //                 //                     })
    //                 //                     //#endregion
    //                 //                 } else {
    //                 //                     //#region msg insert process successed then suspend rows already exist before
    //                 //                     if (Rows_ID_To_Suspend.length>0) {
    //                 //                         new Promise(async (resolve, reject)=>{
    //                 //                             const newList = await tbl_Service.Suspend_Many_DataRows("client_prices_log" , Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
    //                 //                             resolve(newList);
    //                 //                         }).then((update_Flg) => {
    //                 //                             new Promise(async (resolve, reject)=>{
    //                 //                                 let result = await fun_handled_messages.get_handled_message(langTitle,282);
    //                 //                                 resolve(result);
    //                 //                             }).then((msg) => {
    //                 //                                 if (Client_Full_Day_Details_Log_sentData.length>0){
    //                 //                                     res.status(200).json({ data: insert_Flg, Details_Log:concate_Data , message: msg , status: "insert successed" });
    //                 //                                 }else if (Client_Bus_Trip_Full_Day_Details_Log_sentData.length>0){
    //                 //                                     res.status(200).json({ data: insert_Flg, Details_Log:concate_Data , message: msg , status: "insert successed" });
    //                 //                                 }else{
    //                 //                                     res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
    //                 //                                 }
    //                 //                             })
    //                 //                         })
    //                 //                     } else{
    //                 //                         new Promise(async (resolve, reject)=>{
    //                 //                             let result = await fun_handled_messages.get_handled_message(langTitle,282);
    //                 //                             resolve(result);
    //                 //                         }).then((msg) => {
    //                 //                             if (Client_Full_Day_Details_Log_sentData.length>0){
    //                 //                                 res.status(200).json({ data: insert_Flg, Details_Log:concate_Data , message: msg , status: "insert successed" });
    //                 //                             }else if (Client_Bus_Trip_Full_Day_Details_Log_sentData.length>0){
    //                 //                                 res.status(200).json({ data: insert_Flg, Details_Log:concate_Data , message: msg , status: "insert successed" });
    //                 //                             }else{
    //                 //                                 res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
    //                 //                             }
    //                 //                         })
    //                 //                     }
    //                 //                     //#endregion
    //                 //                 }
    //                 //             })
    //                 //         }
    //                 //     }
    //                 //     //#endregion
    //                 // })

    //               //#endregion
    //             }
    //           })

    //         //#endregion
    //     }

    // } catch (err) {
    //     logger.error(err.message);
    //     res.status(500).json({ data:[] , message:err.message , status: "error" });
    // }

};

exports.Suspend_Row =  async(req, res) => {

    // try {
    //     //#region Global Variables
    //     langTitle = req.params.langTitle;
    //     let val_ID = (req.params.id).trim();
    //     var val_Sub_Service_ID = req.body.Sub_Service_ID;
    //     var val_Price_Type = req.body.Price_Type;
    //     var val_Updated_By = req.body.Updated_By;
    //     var val_Is_Suspended = req.body.Is_Suspended;
    //     //#endregion

    //     if (val_Price_Type=="business") {
    //         //#region Business_Prices_Log

    //         new Promise(async (resolve, reject)=>{
    //             let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("sub_services_lkp",val_Sub_Service_ID);
    //             resolve(returnedList);
    //         }).then((returned_ID) => {
    //             if (!returned_ID) {
    //                 //#region ID is not exist in DB msg 75
    //                 new Promise(async (resolve, reject)=>{
    //                     var result = await fun_handled_messages.get_handled_message(langTitle,75);
    //                     resolve(result);
    //                 }).then((msg) => {        
    //                     res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //                 })
    //                 //#endregion
    //             } else {                    

    //                 //#region Set Unique Fields based on sub service ID
    //                 var recievedData = "";
    //                 var recievedData_full_day_booking = "";
    //                 var recievedData_bus_full_day_booking = "";
    //                 var recievedData_schedule_valet = "";
    //                 var Updated_Succeeded_Flag = false;

    //                 if ( (val_Sub_Service_ID =="65200ef56be397bb41100884") || (val_Sub_Service_ID =="65200ef56be397bb41100885") || (val_Sub_Service_ID =="65200ef56be397bb41100886") || (val_Sub_Service_ID =="65200ef56be397bb41100887") || (val_Sub_Service_ID =="65200ef56be397bb41100888") || (val_Sub_Service_ID =="65200ef56be397bb4110088a") || (val_Sub_Service_ID =="65200ef56be397bb4110088b") || (val_Sub_Service_ID =="65200ef56be397bb4110088c") || (val_Sub_Service_ID =="65200ef56be397bb4110088d") || (val_Sub_Service_ID =="65200ef56be397bb4110088f") || (val_Sub_Service_ID =="65200ef56be397bb41100890") || (val_Sub_Service_ID =="65200ef56be397bb41100892") )
    //                 {
    //                     //#region Common Services
    //                     new Promise(async (resolve, reject)=>{
    //                         let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_prices_log",val_ID);
    //                         resolve(returnedList);
    //                     }).then((returned_ID) => {
    //                         if (!returned_ID) {
    //                             //#region ID is not exist in DB msg 75
    //                             new Promise(async (resolve, reject)=>{
    //                                 var result = await fun_handled_messages.get_handled_message(langTitle,75);
    //                                 resolve(result);
    //                             }).then((msg) => {        
    //                                 res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //                             })
    //                             //#endregion
    //                         } else {
    //                             //#region update proces
    //                             tbl_Model = require("../../models/business_prices_log");
    //                             recievedData = new tbl_Model({
    //                                 Updated_By: val_Updated_By,
    //                                 Updated_DateTime: now_DateTime.get_DateTime(),
    //                                 Is_Suspended: val_Is_Suspended
    //                             },{ new: true});
    //                             new Promise(async (resolve, reject)=>{
    //                                 const newList = await tbl_Service.update_DataRow("business_prices_log",val_ID, recievedData);
    //                                 resolve(newList);
    //                             }).then((update_Flg) => {
    //                                 if (!update_Flg) {
    //                                     //#region msg 2 update process failed
    //                                     new Promise(async (resolve, reject)=>{
    //                                         let result = await fun_handled_messages.get_handled_message(langTitle,2);
    //                                         resolve(result);
    //                                     }).then((msg) => {
    //                                         res.status(400).json({ data: [] , message: msg , status: "update failed" }); 
    //                                     })
    //                                     //#endregion
    //                                 } else {
    //                                     //#region msg update process successed
    //                                     new Promise(async (resolve, reject)=>{
    //                                         var result = await fun_handled_messages.get_handled_message(langTitle,427);
    //                                         resolve(result);
    //                                     }).then((msg) => {
    //                                         res.status(200).json({ data: update_Flg , message: msg , status: "updated successed" });
    //                                     })
    //                                     //#endregion
    //                                 }
    //                             })
    //                             //#endregion
    //                         }
    //                     })
    //                     //#endregion
    //                 }
    //                 else if ( (val_Sub_Service_ID =="65200ef56be397bb41100889"))
    //                 {
    //                     //#region full_day_booking
    //                     // tbl_Model = require("../../models/business_prices_log");
    //                     // recievedData = new tbl_Model({
    //                     //     Updated_By: val_Updated_By,
    //                     //     Updated_DateTime: now_DateTime.get_DateTime(),
    //                     //     Is_Suspended: val_Is_Suspended
    //                     // },{ new: true});

    //                     // var Business_Full_Day_Details_Log_Model = require("../../models/business_full_day_details_log");
    //                     // recievedData_full_day_booking = new Business_Full_Day_Details_Log_Model({
    //                     //     Updated_By: val_Updated_By,
    //                     //     Updated_DateTime: now_DateTime.get_DateTime(),
    //                     //     Is_Suspended: val_Is_Suspended
    //                     // },{ new: true});
    //                     //#endregion
    //                 }
    //                 else if ( (val_Sub_Service_ID =="65200ef56be397bb4110088e"))
    //                 {
    //                     //#region bus_full_day_booking
    //                     // tbl_Model = require("../../models/business_prices_log");
    //                     // recievedData = new tbl_Model({
    //                     //     Updated_By: val_Updated_By,
    //                     //     Updated_DateTime: now_DateTime.get_DateTime(),
    //                     //     Is_Suspended: val_Is_Suspended
    //                     // },{ new: true});

    //                     // var Business_Bus_Trip_Full_Day_Details_Log_Model = require("../../models/business_bus_trip_full_day_details_log");
    //                     // recievedData_bus_full_day_booking = new Business_Bus_Trip_Full_Day_Details_Log_Model({
    //                     //     Updated_By: val_Updated_By,
    //                     //     Updated_DateTime: now_DateTime.get_DateTime(),
    //                     //     Is_Suspended: val_Is_Suspended
    //                     // },{ new: true});
    //                     //#endregion
    //                 }
    //                 else if ( (val_Sub_Service_ID =="65200ef56be397bb41100891"))
    //                 {
    //                     //#region schedule_valet
    //                     var Business_Valet_Schedule_Details_Log_Model = require("../../models/business_valet_schedule_details_log");
    //                     recievedData_schedule_valet = new Business_Valet_Schedule_Details_Log_Model({
    //                         Updated_By: val_Updated_By,
    //                         Updated_DateTime: now_DateTime.get_DateTime(),
    //                         Is_Suspended: val_Is_Suspended
    //                     },{ new: true});
    //                     //#endregion
    //                 }
    //                 //#endregion


    //             }
    //         })


    //         // //#region Set Models Objects Variables
    //         // tbl_Model = require("../../models/business_prices_log");
    //         // val_Table_Name = "business_prices_log";
    //         // //#endregion

    //         // new Promise(async (resolve, reject)=>{
    //         //     let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_prices_log",val_ID);
    //         //     resolve(returnedList);
    //         // }).then((returned_ID) => {
    //         //     if (!returned_ID) {
    //         //         //#region ID is not exist in DB msg 75
    //         //         new Promise(async (resolve, reject)=>{
    //         //             var result = await fun_handled_messages.get_handled_message(langTitle,75);
    //         //             resolve(result);
    //         //         }).then((msg) => {        
    //         //             res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //         //         })
    //         //         //#endregion
    //         //     } else {
    //         //         //#region update process
    //         //         let recievedData = new tbl_Model({
    //         //             Updated_By: val_Updated_By,
    //         //             Updated_DateTime: now_DateTime.get_DateTime(),
    //         //             Is_Suspended: val_Is_Suspended
    //         //         },{ new: true});

    //         //         new Promise(async (resolve, reject)=>{
    //         //             const newList = await tbl_Service.update_DataRow("business_prices_log",val_ID, recievedData);
    //         //             resolve(newList);
    //         //         }).then((update_Flg) => {
    //         //             if (!update_Flg) {
    //         //                 //#region msg 2 update process failed
    //         //                 new Promise(async (resolve, reject)=>{
    //         //                     let result = await fun_handled_messages.get_handled_message(langTitle,2);
    //         //                     resolve(result);
    //         //                 }).then((msg) => {
    //         //                     res.status(400).json({ data: [] , message: msg , status: "update failed" }); 
    //         //                 })
    //         //                 //#endregion
    //         //             } else {
    //         //                 //#region msg update process successed
    //         //                 new Promise(async (resolve, reject)=>{
    //         //                     var result = await fun_handled_messages.get_handled_message(langTitle,427);
    //         //                     resolve(result);
    //         //                 }).then((msg) => {
    //         //                     res.status(200).json({ data: update_Flg , message: msg , status: "updated successed" });
    //         //                 })
    //         //                 //#endregion
    //         //             }
    //         //         })
    //         //         //#endregion
    //         //     }
    //         // })

    //         //#endregion
    //     }    
    //     else {
    //         //#region Client_Prices_Log
            
    //         //#region Set Models Objects Variables
    //         tbl_Model = require("../../models/client_prices_log");
    //         val_Table_Name = "client_prices_log";
    //         //#endregion

    //         new Promise(async (resolve, reject)=>{
    //             let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("client_prices_log",val_ID);
    //             resolve(returnedList);
    //         }).then((returned_ID) => {
    //             if (!returned_ID) {
    //                 //#region ID is not exist in DB msg 75
    //                 new Promise(async (resolve, reject)=>{
    //                     var result = await fun_handled_messages.get_handled_message(langTitle,75);
    //                     resolve(result);
    //                 }).then((msg) => {        
    //                     res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //                 })
    //                 //#endregion
    //             } else {
    //                 //#region update process
    //                 let recievedData = new tbl_Model({
    //                     Updated_By: val_Updated_By,
    //                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                     Is_Suspended: val_Is_Suspended
    //                 },{ new: true});

    //                 new Promise(async (resolve, reject)=>{
    //                     const newList = await tbl_Service.update_DataRow("client_prices_log",val_ID, recievedData);
    //                     resolve(newList);
    //                 }).then((update_Flg) => {
    //                     if (!update_Flg) {
    //                         //#region msg 2 update process failed
    //                         new Promise(async (resolve, reject)=>{
    //                             let result = await fun_handled_messages.get_handled_message(langTitle,2);
    //                             resolve(result);
    //                         }).then((msg) => {
    //                             res.status(400).json({ data: [] , message: msg , status: "update failed" }); 
    //                         })
    //                         //#endregion
    //                     } else {
    //                         //#region msg update process successed
    //                         new Promise(async (resolve, reject)=>{
    //                             var result = await fun_handled_messages.get_handled_message(langTitle,428);
    //                             resolve(result);
    //                         }).then((msg) => {
    //                             res.status(200).json({ data: update_Flg , message: msg , status: "updated successed" });
    //                         })
    //                         //#endregion
    //                     }
    //                 })
    //                 //#endregion
    //             }
    //         })

    //         //#endregion
    //     }
        
    // } catch (err) {
    //     logger.error(err.message);
    //     res.status(500).json({ data:[] , message:err.message , status: "error" });
    // }

};

exports.updateMany_Rows_Data =  async(req, res) => {

    try {
        //#region Global Variables
        langTitle = req.params.langTitle;
        var val_Price_Type = req.body.Price_Type;
        var status = req.params.status;
        var val_Updated_By = req.body.Updated_By;
        //#endregion
        

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};