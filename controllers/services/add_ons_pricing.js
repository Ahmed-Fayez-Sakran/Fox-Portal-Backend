//#region Global Variables
const tbl_Service = require("../../services/add_ons_pricing");
//const common_functions = require("../../services/lkp_common_functions");
var tbl_Model = "";
var langTitle = "";
var recievedData = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');
const logger = require('../../utils/logger');
const { Console } = require("winston/lib/winston/transports");
const ObjectId = require('mongodb').ObjectId;
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
                result = await fun_handled_messages.get_handled_message(langTitle,300);
            }else if(suspendStatus=="only-false"){
                result = await fun_handled_messages.get_handled_message(langTitle,301);
            }else if(suspendStatus=="all"){
                result = await fun_handled_messages.get_handled_message(langTitle,302);
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
        var val_Price_Type = req.body.Price_Type;
        var val_User_ID = req.body.User_ID;
        var val_Sub_Service_ID = req.body.Sub_Service_ID;
        var val_Prices_Data =  req.body.Prices_Data;
        var val_Inserted_By = req.body.Inserted_By;        
        var val_Table_Name = "";
        var val_Addons_ID = "";
        var val_Addons_Title = "";
        var val_Serial_Number = "";
        var val_Services_With_Addons_ID = "";
        var val_Daily_Price = "";
        var val_Weekly_Price = "";
        var val_Monthly_Price = "";
        var val_Fixed_Price = "";
        var val_Price_In_Doha = "";
        var val_Price_Out_Doha = "";
        var check_Prices_Promises = [];
        var val_exist_Before = "";
        const sentData = [];
        var insert_object = "";
        var Rows_ID_To_Suspend = [];
        //#endregion
        
        if (val_Price_Type=="business") {
            //#region Business_Services_With_Addons_Prices_Log
            
            //#region Set Models Objects Variables
            tbl_Model = require("../../models/business_services_with_addons_prices_log");
            val_Table_Name = "business_services_with_addons_prices_log";
            //#endregion

            val_Prices_Data.forEach(item => {
                const savePromise = new Promise(async(resolve, reject) => {
                    //#region Set Variables
                    val_Services_With_Addons_ID = item.Services_With_Addons_ID;
                    //#endregion
                    var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_User_ID , val_Services_With_Addons_ID);
                    resolve(returnedList);
                });
                check_Prices_Promises.push(savePromise);
            });
            
            Promise.all([Promise.all(check_Prices_Promises)]).then(results => {
                var val_Row_ID = "";
                for (let i = 0; i < results.length; i++) 
                {
                    for (let j = 0; j < results[i].length; j++)
                    {
                        //#region set Shared values
                        val_Row_ID = results[i][j][0];
                        val_Serial_Number = val_Prices_Data[j].Serial_Number;
                        val_Addons_ID = val_Prices_Data[j].Addons_ID;
                        val_Services_With_Addons_ID = val_Prices_Data[j].Services_With_Addons_ID;
                        //#endregion

                        //#region Set Unique Fields based on Addons_ID
                        if (val_Addons_ID =="651ec5e86be397bb4110055e"){
                            //#region Baby Seat
                            
                            //#region set values
                            val_Daily_Price = val_Prices_Data[j].Daily_Price;
                            val_Weekly_Price = val_Prices_Data[j].Weekly_Price;
                            val_Monthly_Price = val_Prices_Data[j].Monthly_Price;
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Daily_Price: val_Daily_Price,
                                Weekly_Price: val_Weekly_Price,
                                Monthly_Price: val_Monthly_Price,
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                            //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110055f"){
                            //#region Additional Driver
                        
                            //#region set values
                            val_Daily_Price = val_Prices_Data[j].Daily_Price;
                            val_Weekly_Price = val_Prices_Data[j].Weekly_Price;
                            val_Monthly_Price = val_Prices_Data[j].Monthly_Price;
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Daily_Price: val_Daily_Price,
                                Weekly_Price: val_Weekly_Price,
                                Monthly_Price: val_Monthly_Price,
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                            //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100561"){
                            //#region Car Delivery
                        
                            //#region set values
                            val_Price_In_Doha = val_Prices_Data[j].Price_In_Doha;
                            val_Price_Out_Doha = val_Prices_Data[j].Price_Out_Doha;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Price_In_Doha: val_Price_In_Doha,
                                Price_Out_Doha: val_Price_Out_Doha,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                            //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100562"){
                        //#region Car Pickup
                        
                            //#region set values
                            val_Price_In_Doha = val_Prices_Data[j].Price_In_Doha;
                            val_Price_Out_Doha = val_Prices_Data[j].Price_Out_Doha;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Price_In_Doha: val_Price_In_Doha,
                                Price_Out_Doha: val_Price_Out_Doha,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100563"){
                        //#region Loss Damage Waiver
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100564"){
                        //#region Snacks & Drinks
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100565"){
                        //#region Signboard
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100566"){
                        //#region WIFI
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100567"){
                        //#region Podium
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100568"){
                        //#region Valet Tickets
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100569"){
                        //#region Provide Accomudation
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110056b"){
                        //#region Provide Transportation
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110056a"){
                        //#region Provide Meals
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110056c"){
                        //#region Extra Labor
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110056d"){
                        //#region Gift Card
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                User_ID:  new ObjectId(val_User_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        //#endregion
                                
                        //#region check if exist Before set ID to suspend then insert new row
                        if (val_exist_Before) {
                            Rows_ID_To_Suspend[j] = val_Row_ID;                            
                        }
                        //#endregion

                    }
                    val_Row_ID = "";
                    val_exist_Before = "";
                }
                //#region msg insert process successed then suspend rows already exist before
                if (sentData.length>0) {
                    new Promise(async (resolve, reject)=>{
                        const newList = await tbl_Service.create_Many_DataRows("business_services_with_addons_prices_log" , sentData);
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
                            //#region msg insert process successed then suspend rows already exist before
                            new Promise(async (resolve, reject)=>{
                                const newList = await tbl_Service.Suspend_Many_DataRows("business_services_with_addons_prices_log" , Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
                                resolve(newList);
                            }).then((update_Flg) => {
                                new Promise(async (resolve, reject)=>{
                                    let result = await fun_handled_messages.get_handled_message(langTitle,304);
                                    resolve(result);
                                }).then((msg) => {
                                    res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                })
                            })
                            //#endregion
                        }
                    })
                }
                //#endregion
            })
            
            //#endregion
        } else {
            //#region Client_Services_With_Addons_Prices_Log
            
            //#region Set Models Objects Variables
            tbl_Model = require("../../models/client_services_with_addons_prices_log");
            val_Table_Name = "client_services_with_addons_prices_log";
            //#endregion
            
            val_Prices_Data.forEach(item => {
                const savePromise = new Promise(async(resolve, reject) => {
                    //#region Set Variables
                    val_Services_With_Addons_ID = item.Services_With_Addons_ID;
                    //#endregion
                    var returnedList = await tbl_Service.check_Price_Existancy(val_Table_Name , val_User_ID , val_Services_With_Addons_ID);
                    resolve(returnedList);
                });
                check_Prices_Promises.push(savePromise);
            });
            
            Promise.all([Promise.all(check_Prices_Promises)]).then(results => {
                var val_Row_ID = "";
                for (let i = 0; i < results.length; i++) 
                {
                    for (let j = 0; j < results[i].length; j++)
                    {
                        //#region set Shared values
                        val_Row_ID = results[i][j][0];
                        val_Serial_Number = val_Prices_Data[j].Serial_Number;
                        val_Addons_ID = val_Prices_Data[j].Addons_ID;
                        val_Services_With_Addons_ID = val_Prices_Data[j].Services_With_Addons_ID;
                        //#endregion

                        //#region Set Unique Fields based on Addons_ID
                        if (val_Addons_ID =="651ec5e86be397bb4110055e"){
                            //#region Baby Seat
                            
                            //#region set values
                            val_Daily_Price = val_Prices_Data[j].Daily_Price;
                            val_Weekly_Price = val_Prices_Data[j].Weekly_Price;
                            val_Monthly_Price = val_Prices_Data[j].Monthly_Price;
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Daily_Price: val_Daily_Price,
                                Weekly_Price: val_Weekly_Price,
                                Monthly_Price: val_Monthly_Price,
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                            //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110055f"){
                            //#region Additional Driver
                        
                            //#region set values
                            val_Daily_Price = val_Prices_Data[j].Daily_Price;
                            val_Weekly_Price = val_Prices_Data[j].Weekly_Price;
                            val_Monthly_Price = val_Prices_Data[j].Monthly_Price;
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Daily_Price: val_Daily_Price,
                                Weekly_Price: val_Weekly_Price,
                                Monthly_Price: val_Monthly_Price,
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                            //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100561"){
                            //#region Car Delivery
                        
                            //#region set values
                            val_Price_In_Doha = val_Prices_Data[j].Price_In_Doha;
                            val_Price_Out_Doha = val_Prices_Data[j].Price_Out_Doha;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Price_In_Doha: val_Price_In_Doha,
                                Price_Out_Doha: val_Price_Out_Doha,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                            //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100562"){
                        //#region Car Pickup
                        
                            //#region set values
                            val_Price_In_Doha = val_Prices_Data[j].Price_In_Doha;
                            val_Price_Out_Doha = val_Prices_Data[j].Price_Out_Doha;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Price_In_Doha: val_Price_In_Doha,
                                Price_Out_Doha: val_Price_Out_Doha,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100563"){
                        //#region Loss Damage Waiver
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100564"){
                        //#region Snacks & Drinks
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100565"){
                        //#region Signboard
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100566"){
                        //#region WIFI
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100567"){
                        //#region Podium
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100568"){
                        //#region Valet Tickets
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb41100569"){
                        //#region Provide Accomudation
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110056b"){
                        //#region Provide Transportation
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110056a"){
                        //#region Provide Meals
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110056c"){
                        //#region Extra Labor
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        else if(val_Addons_ID =="651ec5e86be397bb4110056d"){
                        //#region Gift Card
                        
                            //#region set values
                            val_Fixed_Price = val_Prices_Data[j].Fixed_Price;
                            //#endregion

                            insert_object = new tbl_Model({
                                Serial_Number: val_Serial_Number,
                                Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID),
                                            
                                Fixed_Price: val_Fixed_Price,

                                Inserted_By: val_Inserted_By,
                                Inserted_DateTime: now_DateTime.get_DateTime()
                            });
                            sentData.push(insert_object);
                            val_exist_Before = results[i][j][1];

                        //#endregion
                        }
                        //#endregion
                                
                        //#region check if exist Before set ID to suspend then insert new row
                        if (val_exist_Before) {
                            Rows_ID_To_Suspend[j] = val_Row_ID;                            
                        }
                        //#endregion
                    }
                    val_Row_ID = "";
                    val_exist_Before = "";
                }
                //#region msg insert process successed then suspend rows already exist before
                if (sentData.length>0) {
                    new Promise(async (resolve, reject)=>{
                        const newList = await tbl_Service.create_Many_DataRows("client_services_with_addons_prices_log" , sentData);
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
                            //#region msg insert process successed then suspend rows already exist before
                            new Promise(async (resolve, reject)=>{
                                const newList = await tbl_Service.Suspend_Many_DataRows("client_services_with_addons_prices_log" , Rows_ID_To_Suspend , val_Inserted_By , now_DateTime.get_DateTime() );
                                resolve(newList);
                            }).then((update_Flg) => {
                                new Promise(async (resolve, reject)=>{
                                    let result = await fun_handled_messages.get_handled_message(langTitle,303);
                                    resolve(result);
                                }).then((msg) => {
                                    res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                })
                            })
                            //#endregion
                        }
                    })
                }
                //#endregion
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
        var val_Price_Type = req.body.Price_Type;
        var val_Updated_By = req.body.Updated_By;
        var val_Is_Suspended = req.body.Is_Suspended;
        //#endregion

        if (val_Price_Type=="business") {
            //#region Business_Services_With_Addons_Prices_Log

            //#region Set Models Objects Variables
            tbl_Model = require("../../models/business_services_with_addons_prices_log");
            val_Table_Name = "business_services_with_addons_prices_log";
            //#endregion

            new Promise(async (resolve, reject)=>{
                let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_services_with_addons_prices_log",val_ID);
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
                    //#region update process
                    let recievedData = new tbl_Model({
                        Updated_By: val_Updated_By,
                        Updated_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: val_Is_Suspended
                    },{ new: true});

                    new Promise(async (resolve, reject)=>{
                        const newList = await tbl_Service.update_DataRow("business_services_with_addons_prices_log",val_ID, recievedData);
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
                                var result = await fun_handled_messages.get_handled_message(langTitle,305);
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
        else {
            //#region Client_Services_With_Addons_Prices_Log
            
            //#region Set Models Objects Variables
            tbl_Model = require("../../models/client_services_with_addons_prices_log");
            val_Table_Name = "client_services_with_addons_prices_log";
            //#endregion

            new Promise(async (resolve, reject)=>{
                let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("client_services_with_addons_prices_log",val_ID);
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
                    //#region update process
                    let recievedData = new tbl_Model({
                        Updated_By: val_Updated_By,
                        Updated_DateTime: now_DateTime.get_DateTime(),
                        Is_Suspended: val_Is_Suspended
                    },{ new: true});

                    new Promise(async (resolve, reject)=>{
                        const newList = await tbl_Service.update_DataRow("client_services_with_addons_prices_log",val_ID, recievedData);
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
                                var result = await fun_handled_messages.get_handled_message(langTitle,306);
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
        var val_Prices_Data= req.body.Prices_Data;
        var val_Updated_By = req.body.Updated_By;
        var val_Price_Type = "";
        var val_Id = "";
        var Add_Ons_Business_Prices_Data = [];
        var Add_Ons_Client_Prices_Data = [];
        var check_Business_Prices = [];
        var check_Client_Prices = [];
        //#endregion

        val_Prices_Data.forEach(item => {
            
            //#region Set Variables
            val_Price_Type = item.Price_Type;
            val_Id = item.Id;
            //#endregion

            if (val_Price_Type=="business") {
                const savePromise_1 = new Promise(async(resolve, reject) => {
                    var returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_services_with_addons_prices_log",val_Id);
                    resolve(returnedList);
                });
                Add_Ons_Business_Prices_Data.push(val_Id);
                check_Business_Prices.push(savePromise_1);
            } else {
                const savePromise_2 = new Promise(async(resolve, reject) => {
                    var returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("client_services_with_addons_prices_log",val_Id);
                    resolve(returnedList);
                });
                Add_Ons_Client_Prices_Data.push(val_Id);
                check_Client_Prices.push(savePromise_2);
            }

        });

        Promise.all([
            Promise.all(check_Business_Prices), 
            Promise.all(check_Client_Prices)
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
                let business_addons_prices_Check_ID_Promise = new Promise(async (resolve, reject)=>{
                    var exist = "";
                    exist = await tbl_Service.updateMany_DataRows("suspend" , Add_Ons_Business_Prices_Data, val_Updated_By , "business_services_with_addons_prices_log");
                    resolve(exist);
                });
                let client_addons_prices_Check_ID_Promise = new Promise(async (resolve, reject)=>{
                    var exist = "";
                    exist = await tbl_Service.updateMany_DataRows("suspend" , Add_Ons_Client_Prices_Data, val_Updated_By , "client_services_with_addons_prices_log");
                    resolve(exist);
                });
                Promise.all([business_addons_prices_Check_ID_Promise,client_addons_prices_Check_ID_Promise]).then((Records_Updated) => {
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
                        var result = await fun_handled_messages.get_handled_message(langTitle,307);
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
