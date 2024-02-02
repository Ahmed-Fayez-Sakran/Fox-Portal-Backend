//#region Global Variables
const tbl_Service = require("../../services/general_settings");
var tbl_Model = ""
var langTitle = ""
var lkp_Table_Name = ""
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const fun_check_Existancy_By_List_IDS = require('../../helpers/fun_check_Existancy_By_List_IDS');
const fun_check_existancy = require('../../helpers/fun_check_title_existancy');
const fun_insert_row = require('../../helpers/fun_insert_row');
const fun_update_row = require('../../helpers/fun_update_row');
const fun_get_serial_number = require('../../helpers/fun_get_serial_number');
const fun_Update_Suspend_Status_Many_Rows = require('../../helpers/fun_Update_Suspend_Status_Many_Rows');
//#endregion

exports.get_Data_By_SuspendStatus =  async(req, res) => {

//   try {
//     //#region Global Variables    
//     lkp_Table_Name = req.params.lkp_Table_Name;
//     langTitle = req.params.langTitle;
//     var suspendStatus = req.params.suspendStatus;
//     var val_Page_Number = req.params.page_number;
//     //#endregion

//     let check_Sent_LKP_Tables_Existancy_Promise = new Promise(async (resolve, reject)=>{
//         let returnedList = await tbl_Service.check_Sent_LKP_Tables_Existancy(lkp_Table_Name);
//         resolve(returnedList);
//     });
//     check_Sent_LKP_Tables_Existancy_Promise.then((tbl_Exist) => {
//         if (!tbl_Exist) {
//             //#region LKP_Table parameter wrong
//             let get_Message_Promise = new Promise(async (resolve, reject)=>{
//                 var result = await fun_handled_messages.get_handled_message(langTitle,22);
//                 resolve(result);
//             });
//             get_Message_Promise.then((msg) => {
//                 res.status(400).json({ data: [] , message: msg , status: "wrong url" });      
//             }).catch((err)=>{
//                 res.status(500).json({ message: err.message , status: "error" });
//             });
//             //#endregion                         
//         } else {
//             //#region LKP_Table parameter right
//             let get_DataTable_Promise = new Promise(async (resolve, reject)=>{
//                 var returnedList = await tbl_Service.get_Data_By_SuspendStatus(lkp_Table_Name,suspendStatus,val_Page_Number);
//                 resolve(returnedList);
//             });
          
//             let get_Message_Promise = new Promise(async (resolve, reject)=>{          
//                 var result = ""                
//                 //#region Create Model Object Based on Table Name
//                   if (lkp_Table_Name=="airline_lkp") {
                      
//                       if (suspendStatus=="only-true"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,322);
//                       }else if(suspendStatus=="only-false"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,323);
//                       }else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,321);
//                       }else{
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   }
//                   else if (lkp_Table_Name=="discount_type_lkp") {
          
//                       if (suspendStatus=="only-true") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,324);
//                       } else if(suspendStatus=="only-false") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,325);
//                       } else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,326);
//                       } else {
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   } 
//                   else if (lkp_Table_Name=="creditcard_type_lkp") {
          
//                       if (suspendStatus=="only-true") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,327);
//                       } else if(suspendStatus=="only-false") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,328);
//                       } else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,329);
//                       } else {
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   } 
//                   else if (lkp_Table_Name=="report_reason_lkp") {
          
//                       if (suspendStatus=="only-true") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,330);
//                       } else if(suspendStatus=="only-false") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,331);
//                       } else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,332);
//                       } else {
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   } 
//                   else if (lkp_Table_Name=="cancel_reason_lkp") {
          
//                       if (suspendStatus=="only-true") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,333);
//                       } else if(suspendStatus=="only-false") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,334);
//                       } else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,335);
//                       } else {
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   } 
//                   else if (lkp_Table_Name=="extra_reason_lkp") {
          
//                       if (suspendStatus=="only-true") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,336);
//                       } else if(suspendStatus=="only-false") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,337);
//                       } else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,338);
//                       } else {
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   }
//                   else if (lkp_Table_Name=="refund_reason_lkp") {
          
//                       if (suspendStatus=="only-true") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,339);
//                       } else if(suspendStatus=="only-false") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,340);
//                       } else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,341);
//                       } else {
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   }
//                   else if (lkp_Table_Name=="payment_method_lkp") {
          
//                       if (suspendStatus=="only-true") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,342);
//                       } else if(suspendStatus=="only-false") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,343);
//                       } else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,344);
//                       } else {
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   } 
//                   else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
          
//                       if (suspendStatus=="only-true") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,345);
//                       } else if(suspendStatus=="only-false") {
//                           result = await fun_handled_messages.get_handled_message(langTitle,346);
//                       } else if(suspendStatus=="all"){
//                           result = await fun_handled_messages.get_handled_message(langTitle,347);
//                       } else {
//                           result = await fun_handled_messages.get_handled_message(langTitle,22);
//                       }
                      
//                   }
//                   else if (lkp_Table_Name=="order_status_lkp") {
          
//                     if (suspendStatus=="only-true") {
//                         result = await fun_handled_messages.get_handled_message(langTitle,348);
//                     } else if(suspendStatus=="only-false") {
//                         result = await fun_handled_messages.get_handled_message(langTitle,349);
//                     } else if(suspendStatus=="all"){
//                         result = await fun_handled_messages.get_handled_message(langTitle,350);
//                     } else {
//                         result = await fun_handled_messages.get_handled_message(langTitle,22);
//                     }
                      
//                   }
//                   else if (lkp_Table_Name=="user_roles_lkp") {
          
//                     if (suspendStatus=="only-true") {
//                         result = await fun_handled_messages.get_handled_message(langTitle,351);
//                     } else if(suspendStatus=="only-false") {
//                         result = await fun_handled_messages.get_handled_message(langTitle,352);
//                     } else if(suspendStatus=="all"){
//                         result = await fun_handled_messages.get_handled_message(langTitle,353);
//                     } else {
//                         result = await fun_handled_messages.get_handled_message(langTitle,22);
//                     }
                      
//                   }
//                   else {
//                       result="";
//                   }
//                   //#endregion
//                 resolve(result);
//             });
          
//             Promise.all([get_DataTable_Promise , get_Message_Promise]).then((results) => {
              
//                 if (results[0].length<=0) {
          
//                   if ((suspendStatus.trim() ==="only-true")||(suspendStatus.trim() ==="only-false")||(suspendStatus.trim() ==="all")) {
//                     res.status(200).json({ data: [] , message: results[1] , status: "empty rows" });
//                   } else {
//                       res.status(400).json({ data: [] , message: results[1] , status: "wrong url" });
//                   }
                  
//                 } else {
//                   res.status(200).json({ data: results[0] , message: "" , status: "rows selected" });
//                 }
          
//             })
//             //#endregion                         
//         }
//     }).catch((err)=>{
//         res.status(500).json({ message: err.message , status: "error" });
//     }); 
//   } catch (error) {
//     logger.error(err.message);
//     res.status(500).json({ data:[] , message:err.message , status: "error" });
//   }
    
};

exports.update_Data =  async(req, res) =>{
    // try {
    //   //#region Global Variables
    //   lkp_Table_Name = req.params.lkp_Table_Name;
    //   langTitle = req.params.langTitle;
    //   let val_ID = (req.params.id).trim();
    //   //#endregion      
      
    // new Promise(async (resolve, reject)=>{
    //     let returnedList = await tbl_Service.check_Sent_LKP_Tables_Existancy(lkp_Table_Name);
    //     resolve(returnedList);
    // }).then((tbl_Exist) => {
    //     if (!tbl_Exist) {
    //         //#region LKP_Table parameter wrong
    //         new Promise(async (resolve, reject)=>{
    //             var result = await fun_handled_messages.get_handled_message(langTitle,22);
    //             resolve(result);
    //         }).then((msg) => {
    //             res.status(400).json({ data: [] , message: msg , status: "wrong url" });      
    //         })
    //         //#endregion                         
    //     } else {
    //         //#region LKP_Table parameter right
    //             new Promise(async (resolve, reject)=>{
    //                 let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID(lkp_Table_Name,val_ID);
    //                 resolve(returnedList);
    //             }).then((returned_ID) => {
    //                 if (!returned_ID) {
    //                   //#region ID is not exist in DB msg 14
    //                   new Promise(async (resolve, reject)=>{
    //                     var result = await fun_handled_messages.get_handled_message(langTitle,14);
    //                     resolve(result);
    //                   }).then((msg) => {        
    //                     res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //                   })
    //                   //#endregion
    //                 }else{
    //                     //#region ID exist in DB
    //                     let check_Ar_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
    //                         var exist = "";
    //                         //#region lkp tables
    //                         if (lkp_Table_Name=="airline_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Airline_Title_Ar , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="discount_type_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Title_Ar , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="payment_method_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Payment_Method_Title_Ar , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="report_reason_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Report_Reason_Title_Ar , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Cancel_Reason_Title_Ar , "" , "" );
    //                         } 
    //                         else if (lkp_Table_Name=="extra_reason_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Extra_Reason_Title_Ar , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="refund_reason_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Refund_Reason_Title_Ar , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Type_Title_Ar , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Change_Reason_Title_Ar , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="order_status_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "ar" , req.body.Order_Status_Title_Ar , "" , "" );
    //                         }
    //                         //#endregion
    //                         resolve(exist);
    //                     });

    //                     let check_En_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
    //                         var exist = "";
    //                         //#region lkp tables
    //                         if (lkp_Table_Name=="airline_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Airline_Title_En , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="discount_type_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Title_En , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="payment_method_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Payment_Method_Title_En , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="report_reason_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Report_Reason_Title_En , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Cancel_Reason_Title_En , "" , "" );
    //                         } 
    //                         else if (lkp_Table_Name=="extra_reason_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Extra_Reason_Title_En , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="refund_reason_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Refund_Reason_Title_En , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Type_Title_En , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Change_Reason_Title_En , "" , "" );
    //                         }
    //                         else if (lkp_Table_Name=="order_status_lkp") {
    //                             exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "update" , "en" , req.body.Order_Status_Title_En , "" , "" );
    //                         }
    //                         //#endregion
    //                         resolve(exist);
    //                     });

    //                     Promise.all([check_Ar_Title_Existancy_Promise , check_En_Title_Existancy_Promise]).then((results) => {
    //                         console.log("check_Ar_Title_Existancy_Promise = "+results[0])
    //                         console.log("check_En_Title_Existancy_Promise = "+results[1])
    //                         if (results[0]==true && results[1]==true) {
    //                             //#region Both En & Ar already exist
    //                             new Promise(async (resolve, reject)=>{
    //                                 var msg = "";
    //                                 //#region get message from db
    //                                 if (lkp_Table_Name=="airline_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,354);
    //                                 } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,357);
    //                                 } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,360);
    //                                 } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,363);
    //                                 } else if (lkp_Table_Name=="payment_method_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,366);
    //                                 } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,369);
    //                                 } else if (lkp_Table_Name=="report_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,372);
    //                                 } else if (lkp_Table_Name=="discount_type_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,375);
    //                                 } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,378);
    //                                 } else if (lkp_Table_Name=="order_status_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,381);
    //                                 }
    //                                 //#endregion
    //                                 resolve(msg)
    //                             }).then((msg) => {
    //                                 //#region Replace Message Strings                                    
    //                                 if (lkp_Table_Name=="airline_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                     msg = msg.replace("Cancel_Reason_Title_Ar", req.body.Cancel_Reason_Title_Ar);
    //                                     msg = msg.replace("Cancel_Reason_Title_En", req.body.Cancel_Reason_Title_En);
    //                                 } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="payment_method_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="report_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="discount_type_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="order_status_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 }
    //                                 //#endregion
    //                                 res.status(200).json({ data:[], message: msg, status: "already exist" });
    //                             })
    //                             //#endregion
    //                         } else if (results[0]==true) {
    //                             //#region Ar already exist
    //                             new Promise(async (resolve, reject)=>{
    //                                 var msg = "";                                    
    //                                 //#region get message from db
    //                                 if (lkp_Table_Name=="airline_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,355);
    //                                 } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,358);
    //                                 } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,361);
    //                                 } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,364);
    //                                 } else if (lkp_Table_Name=="payment_method_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,367);
    //                                 } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,370);
    //                                 } else if (lkp_Table_Name=="report_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,373);
    //                                 } else if (lkp_Table_Name=="discount_type_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,376);
    //                                 } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,379);
    //                                 } else if (lkp_Table_Name=="order_status_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,382);
    //                                 }
    //                                 //#endregion
    //                                 resolve(msg)
    //                             }).then((msg) => {
    //                                 //#region Replace Message Strings                                    
    //                                 if (lkp_Table_Name=="airline_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                     msg = msg.replace("Cancel_Reason_Title_Ar", req.body.Cancel_Reason_Title_Ar);
    //                                 } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 } else if (lkp_Table_Name=="payment_method_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 } else if (lkp_Table_Name=="report_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 } else if (lkp_Table_Name=="discount_type_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 } else if (lkp_Table_Name=="order_status_lkp") {
    //                                     msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                 }
    //                                 //#endregion
    //                                 res.status(200).json({ data:[], message: msg, status: "already exist" });
    //                             })
    //                             //#endregion
    //                         } else if (results[1]==true) {
    //                             //#region En already exist
    //                             new Promise(async (resolve, reject)=>{
    //                                 var msg = "";                                    
    //                                 //#region get message from db
    //                                 if (lkp_Table_Name=="airline_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,356);
    //                                 } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,359);
    //                                 } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,362);
    //                                 } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,365);
    //                                 } else if (lkp_Table_Name=="payment_method_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,368);
    //                                 } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,371);
    //                                 } else if (lkp_Table_Name=="report_reason_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,374);
    //                                 } else if (lkp_Table_Name=="discount_type_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,377);
    //                                 } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,380);
    //                                 } else if (lkp_Table_Name=="order_status_lkp") {
    //                                     msg = await fun_handled_messages.get_handled_message(langTitle,383);
    //                                 }
    //                                 //#endregion
    //                                 resolve(msg)
    //                             }).then((msg) => {
    //                                 //#region Replace Message Strings
    //                                 if (lkp_Table_Name=="airline_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                     msg = msg.replace("Cancel_Reason_Title_En", req.body.Cancel_Reason_Title_En);
    //                                 } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="payment_method_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="report_reason_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="discount_type_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 } else if (lkp_Table_Name=="order_status_lkp") {
    //                                     msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                 }
    //                                 //#endregion
    //                                 res.status(200).json({ data:[], message: msg, status: "already exist" });
    //                             })
    //                             //#endregion
    //                         } else {
    //                             //#region update process

    //                             //#region fill recieved Data based on table name
    //                             let recievedData = ""
    //                             var is_Delete_Old_Image=false;
    //                             if (lkp_Table_Name=="airline_lkp") {
    //                                 tbl_Model = require("../../models/airline_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Airline_Title_En: req.body.Airline_Title_En,
    //                                     Airline_Title_Ar: req.body.Airline_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                                 console.log("recievedData = "+recievedData)
    //                             }
    //                             else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                 tbl_Model = require("../../models/creditcard_type_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Type_Title_En: req.body.Type_Title_En,
    //                                     Type_Title_Ar: req.body.Type_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             }
    //                             else if (lkp_Table_Name=="report_reason_lkp") {
    //                                 tbl_Model = require("../../models/report_reason_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Report_Reason_Title_En: req.body.Report_Reason_Title_En,
    //                                     Report_Reason_Title_Ar: req.body.Report_Reason_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             }
    //                             else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                 tbl_Model = require("../../models/cancel_reason_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Cancel_Reason_Title_En: req.body.Cancel_Reason_Title_En,
    //                                     Cancel_Reason_Title_Ar: req.body.Cancel_Reason_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             }
    //                             else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                 tbl_Model = require("../../models/extra_reason_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Extra_Reason_Title_En: req.body.Extra_Reason_Title_En,
    //                                     Extra_Reason_Title_Ar: req.body.Extra_Reason_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             }
    //                             else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                 tbl_Model = require("../../models/refund_reason_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Refund_Reason_Title_En: req.body.Refund_Reason_Title_En,
    //                                     Refund_Reason_Title_Ar: req.body.Refund_Reason_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             }
    //                             else if (lkp_Table_Name=="payment_method_lkp") {
    //                                 tbl_Model = require("../../models/payment_method_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Payment_Method_Title_En: req.body.Payment_Method_Title_En,
    //                                     Payment_Method_Title_Ar: req.body.Payment_Method_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             }
    //                             else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                 tbl_Model = require("../../models/vehicle_change_reasons_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Change_Reason_Title_En: req.body.Change_Reason_Title_En,
    //                                     Change_Reason_Title_Ar: req.body.Change_Reason_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             }
    //                             else if (lkp_Table_Name=="order_status_lkp") {
    //                                 tbl_Model = require("../../models/order_status_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Order_Status_Title_En: req.body.Order_Status_Title_En,
    //                                     Order_Status_Title_Ar: req.body.Order_Status_Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             }
    //                             else if (lkp_Table_Name=="discount_type_lkp") {
    //                                 tbl_Model = require("../../models/discount_type_lkp");
    //                                 recievedData = new tbl_Model({
    //                                     Title_En: req.body.Title_En,
    //                                     Title_Ar: req.body.Title_Ar,
    //                                     Updated_By: req.body.Updated_By,
    //                                     Updated_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 },{ new: true});
    //                             } else {
    //                                 result = "";
    //                             }
    //                             //#endregion

    //                             new Promise(async (resolve, reject)=>{
    //                                 const newList = await fun_update_row.update_row(val_ID, lkp_Table_Name, recievedData , is_Delete_Old_Image);
    //                                 resolve(newList);
    //                             }).then((update_flg) => {
    //                                 if (!update_flg) {
    //                                     //#region msg 2 update process failed
    //                                     new Promise(async (resolve, reject)=>{
    //                                     let result = await fun_handled_messages.get_handled_message(langTitle,2);
    //                                     resolve(result);
    //                                     }).then((msg) => {
    //                                         res.status(400).json({ data: [] , message: msg , status: "update failed" });    
    //                                     })          
    //                                     //#endregion
    //                                 } else {
    //                                     //#region msg update process successed
    //                                     new Promise(async (resolve, reject)=>{
    //                                         var result = "";
    //                                         //#region get message from db
    //                                         if (lkp_Table_Name=="airline_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,384);
    //                                         } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,385);
    //                                         } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,386);
    //                                         } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,387);
    //                                         } else if (lkp_Table_Name=="payment_method_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,388);
    //                                         } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,389);
    //                                         } else if (lkp_Table_Name=="report_reason_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,390);
    //                                         } else if (lkp_Table_Name=="discount_type_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,391);
    //                                         } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,392);
    //                                         } else if (lkp_Table_Name=="order_status_lkp") {
    //                                             result = await fun_handled_messages.get_handled_message(langTitle,393);
    //                                         } else {
    //                                             result = "";
    //                                         }
    //                                         resolve(result);
    //                                         //#endregion
    //                                     }).then((msg) => {
    //                                         res.status(200).json({ data: update_flg , message: msg , status: "updated successed" });
    //                                     })
    //                                     //#endregion
    //                                 }
    //                             })

    //                             //#endregion
    //                         }
    //                     })
    //                   //#endregion
    //                 }            
    //             })
    //         //#endregion                         
    //     }
    // })
  
    // } catch (error) {
    //     logger.error(err.message);
    //     res.status(500).json({ data:[] , message:err.message , status: "error" });
    // }
};

exports.create_Row = async(req, res) => {

    // try {
    //     //#region Global Variables
    //     lkp_Table_Name = req.params.lkp_Table_Name;
    //     langTitle = req.params.langTitle;
    //     //#endregion
        
    //     new Promise(async (resolve, reject)=>{
    //         let returnedList = await tbl_Service.check_Sent_LKP_Tables_Existancy(lkp_Table_Name);
    //         resolve(returnedList);
    //     }).then((tbl_Exist) => {
    //         if (!tbl_Exist) {
    //             //#region LKP_Table parameter wrong
    //             new Promise(async (resolve, reject)=>{
    //                 var result = await fun_handled_messages.get_handled_message(langTitle,22);
    //                 resolve(result);
    //             }).then((msg) => {
    //                 res.status(400).json({ data: [] , message: msg , status: "wrong url" });      
    //             })
    //             //#endregion                         
    //         } else {
    //             //#region LKP_Table parameter right
    //             let check_Ar_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
    //                 var exist = "";
    //                 //#region lkp tables
    //                 if (lkp_Table_Name=="airline_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Airline_Title_Ar , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="discount_type_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Title_Ar , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="payment_method_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Payment_Method_Title_Ar , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="report_reason_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Report_Reason_Title_Ar , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Cancel_Reason_Title_Ar , "" , "" );
    //                 } 
    //                 else if (lkp_Table_Name=="extra_reason_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Extra_Reason_Title_Ar , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="refund_reason_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Refund_Reason_Title_Ar , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Type_Title_Ar , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Change_Reason_Title_Ar , "" , "" );
    //                 }
    //                 // else if (lkp_Table_Name=="order_status_lkp") {
    //                 //     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "ar" , req.body.Order_Status_Title_Ar , "" , "" );
    //                 // }
    //                 //#endregion
    //                 resolve(exist);
    //             });

    //             let check_En_Title_Existancy_Promise = new Promise(async (resolve, reject)=>{
    //                 var exist = "";
    //                 //#region lkp tables
    //                 if (lkp_Table_Name=="airline_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Airline_Title_En , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="discount_type_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Title_En , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="payment_method_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Payment_Method_Title_En , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="report_reason_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Report_Reason_Title_En , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Cancel_Reason_Title_En , "" , "" );
    //                 } 
    //                 else if (lkp_Table_Name=="extra_reason_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Extra_Reason_Title_En , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="refund_reason_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Refund_Reason_Title_En , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Type_Title_En , "" , "" );
    //                 }
    //                 else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Change_Reason_Title_En , "" , "" );
    //                 }
    //                 // else if (lkp_Table_Name=="order_status_lkp") {
    //                 //     exist = await fun_check_existancy.check_title_existancy(lkp_Table_Name , val_ID , "insert" , "en" , req.body.Order_Status_Title_En , "" , "" );
    //                 // }
    //                 //#endregion
    //                 resolve(exist);
    //             });
                
    //             Promise.all([check_Ar_Title_Existancy_Promise , check_En_Title_Existancy_Promise]).then((results) => {

    //                 if (results[0]==true && results[1]==true) {
    //                     //#region Both En & Ar already exist
    //                     new Promise(async (resolve, reject)=>{
    //                         var msg = "";
    //                         //#region get message from db
    //                         if (lkp_Table_Name=="airline_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,354);
    //                         } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,357);
    //                         } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,360);
    //                         } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,363);
    //                         } else if (lkp_Table_Name=="payment_method_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,366);
    //                         } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,369);
    //                         } else if (lkp_Table_Name=="report_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,372);
    //                         } else if (lkp_Table_Name=="discount_type_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,375);
    //                         } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,378);
    //                         } else if (lkp_Table_Name=="order_status_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,381);
    //                         }
    //                         //#endregion
    //                         resolve(msg)
    //                     }).then((msg) => {
    //                         //#region Replace Message Strings                                    
    //                         if (lkp_Table_Name=="airline_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                             msg = msg.replace("Cancel_Reason_Title_Ar", req.body.Cancel_Reason_Title_Ar);
    //                             msg = msg.replace("Cancel_Reason_Title_En", req.body.Cancel_Reason_Title_En);
    //                         } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="payment_method_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="report_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="discount_type_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="order_status_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         }
    //                         //#endregion
    //                         res.status(200).json({ data:[], message: msg, status: "already exist" });
    //                     })
    //                     //#endregion
    //                 } else if (results[0]==true) {
    //                     //#region Ar already exist
    //                     new Promise(async (resolve, reject)=>{
    //                         var msg = "";                                    
    //                         //#region get message from db
    //                         if (lkp_Table_Name=="airline_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,355);
    //                         } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,358);
    //                         } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,361);
    //                         } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,364);
    //                         } else if (lkp_Table_Name=="payment_method_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,367);
    //                         } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,370);
    //                         } else if (lkp_Table_Name=="report_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,373);
    //                         } else if (lkp_Table_Name=="discount_type_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,376);
    //                         } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,379);
    //                         } else if (lkp_Table_Name=="order_status_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,382);
    //                         }
    //                         //#endregion
    //                         resolve(msg)
    //                     }).then((msg) => {
    //                         //#region Replace Message Strings                                    
    //                         if (lkp_Table_Name=="airline_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                             msg = msg.replace("Cancel_Reason_Title_Ar", req.body.Cancel_Reason_Title_Ar);
    //                         } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         } else if (lkp_Table_Name=="payment_method_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         } else if (lkp_Table_Name=="report_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         } else if (lkp_Table_Name=="discount_type_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         } else if (lkp_Table_Name=="order_status_lkp") {
    //                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                         }
    //                         //#endregion
    //                         res.status(200).json({ data:[], message: msg, status: "already exist" });
    //                     })
    //                     //#endregion
    //                 } else if (results[1]==true) {
    //                     //#region En already exist
    //                     new Promise(async (resolve, reject)=>{
    //                         var msg = "";                                    
    //                         //#region get message from db
    //                         if (lkp_Table_Name=="airline_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,356);
    //                         } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,359);
    //                         } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,362);
    //                         } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,365);
    //                         } else if (lkp_Table_Name=="payment_method_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,368);
    //                         } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,371);
    //                         } else if (lkp_Table_Name=="report_reason_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,374);
    //                         } else if (lkp_Table_Name=="discount_type_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,377);
    //                         } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,380);
    //                         } else if (lkp_Table_Name=="order_status_lkp") {
    //                             msg = await fun_handled_messages.get_handled_message(langTitle,383);
    //                         }
    //                         //#endregion
    //                         resolve(msg)
    //                     }).then((msg) => {
    //                         //#region Replace Message Strings
    //                         if (lkp_Table_Name=="airline_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                             msg = msg.replace("Cancel_Reason_Title_En", req.body.Cancel_Reason_Title_En);
    //                         } else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="extra_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="payment_method_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="refund_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="report_reason_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="discount_type_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         } else if (lkp_Table_Name=="order_status_lkp") {
    //                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                         }
    //                         //#endregion
    //                         res.status(200).json({ data:[], message: msg, status: "already exist" });
    //                     })
    //                     //#endregion
    //                 } else {
    //                     //#region insert process

    //                     let get_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
    //                         var exist = await fun_get_serial_number.get_Serial_Number(lkp_Table_Name);
    //                         resolve(exist);
    //                     });

    //                     let get_Message_Promise = new Promise(async (resolve, reject)=>{
    //                         let result = await fun_handled_messages.get_handled_message(langTitle,75);
    //                         resolve(result);
    //                     });

    //                     Promise.all([get_Serial_Number_Promise , get_Message_Promise]).then((results) => {
    //                         var new_Serial_Number = results[0]
    //                         //#region fill sent Data based on table name
    //                             let sentData = ""
    //                             if (lkp_Table_Name=="airline_lkp") {
    //                                 tbl_Model = require("../../models/airline_lkp");
    //                                 sentData = new tbl_Model({
    //                                     Serial_Number: new_Serial_Number,
    //                                     Airline_Title_En: req.body.Airline_Title_En,
    //                                     Airline_Title_Ar: req.body.Airline_Title_Ar,
    //                                     Inserted_By: req.body.Inserted_By,
    //                                     Inserted_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 });
    //                             }
    //                             else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                 tbl_Model = require("../../models/creditcard_type_lkp");
    //                                 sentData = new tbl_Model({
    //                                     Serial_Number: new_Serial_Number,
    //                                     Type_Title_En: req.body.Type_Title_En,
    //                                     Type_Title_Ar: req.body.Type_Title_Ar,
    //                                     Inserted_By: req.body.Inserted_By,
    //                                     Inserted_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 });
    //                             }
    //                             else if (lkp_Table_Name=="report_reason_lkp") {
    //                                 tbl_Model = require("../../models/report_reason_lkp");
    //                                 sentData = new tbl_Model({
    //                                     Serial_Number: new_Serial_Number,
    //                                     Report_Reason_Title_En: req.body.Report_Reason_Title_En,
    //                                     Report_Reason_Title_Ar: req.body.Report_Reason_Title_Ar,
    //                                     Inserted_By: req.body.Inserted_By,
    //                                     Inserted_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 });
    //                             }
    //                             else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                 tbl_Model = require("../../models/cancel_reason_lkp");
    //                                 sentData = new tbl_Model({
    //                                     Serial_Number: new_Serial_Number,
    //                                     Cancel_Reason_Title_En: req.body.Cancel_Reason_Title_En,
    //                                     Cancel_Reason_Title_Ar: req.body.Cancel_Reason_Title_Ar,
    //                                     Inserted_By: req.body.Inserted_By,
    //                                     Inserted_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 });
    //                             }
    //                             else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                 tbl_Model = require("../../models/extra_reason_lkp");
    //                                 sentData = new tbl_Model({
    //                                     Serial_Number: new_Serial_Number,
    //                                     Extra_Reason_Title_En: req.body.Extra_Reason_Title_En,
    //                                     Extra_Reason_Title_Ar: req.body.Extra_Reason_Title_Ar,
    //                                     Inserted_By: req.body.Inserted_By,
    //                                     Inserted_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 });
    //                             }
    //                             else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                 tbl_Model = require("../../models/refund_reason_lkp");
    //                                 sentData = new tbl_Model({
    //                                     Serial_Number: new_Serial_Number,
    //                                     Refund_Reason_Title_En: req.body.Refund_Reason_Title_En,
    //                                     Refund_Reason_Title_Ar: req.body.Refund_Reason_Title_Ar,
    //                                     Inserted_By: req.body.Inserted_By,
    //                                     Inserted_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 });
    //                             }
    //                             else if (lkp_Table_Name=="payment_method_lkp") {
    //                                 tbl_Model = require("../../models/payment_method_lkp");
    //                                 sentData = new tbl_Model({
    //                                     Serial_Number: new_Serial_Number,
    //                                     Payment_Method_Title_En: req.body.Payment_Method_Title_En,
    //                                     Payment_Method_Title_Ar: req.body.Payment_Method_Title_Ar,
    //                                     Inserted_By: req.body.Inserted_By,
    //                                     Inserted_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 });
    //                             }
    //                             else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                 tbl_Model = require("../../models/vehicle_change_reasons_lkp");
    //                                 sentData = new tbl_Model({
    //                                     Serial_Number: new_Serial_Number,
    //                                     Change_Reason_Title_En: req.body.Change_Reason_Title_En,
    //                                     Change_Reason_Title_Ar: req.body.Change_Reason_Title_Ar,
    //                                     Inserted_By: req.body.Inserted_By,
    //                                     Inserted_DateTime: now_DateTime.get_DateTime(),
    //                                     Is_Suspended: req.body.Is_Suspended
    //                                 });
    //                             }
    //                             else {
    //                                 sentData = "";
    //                             }
    //                             //#endregion
                            
    //                         new Promise(async (resolve, reject)=>{
    //                             const newList = await fun_insert_row.insert_row(lkp_Table_Name,sentData);
    //                             resolve(newList);
    //                         }).then((insert_Flg) => {
    //                             if (!insert_Flg) {
    //                                 //#region msg 1 insert process failed
    //                                 new Promise(async (resolve, reject)=>{
    //                                 let result = await fun_handled_messages.get_handled_message(langTitle,1);
    //                                 resolve(result);
    //                                 }).then((msg) => {
    //                                     res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
    //                                 })
    //                                 //#endregion
    //                             } else {
    //                                 //#region msg insert process successed
    //                                 new Promise(async (resolve, reject)=>{
    //                                     var result = "";
    //                                     //#region get nessages based on tables
    //                                     if (lkp_Table_Name=="airline_lkp") {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,394);
    //                                     }
    //                                     else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,396);
    //                                     }
    //                                     else if (lkp_Table_Name=="report_reason_lkp") {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,400);
    //                                     }
    //                                     else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,395);
    //                                     }
    //                                     else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,397);
    //                                     }
    //                                     else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,399);
    //                                     }
    //                                     else if (lkp_Table_Name=="payment_method_lkp") {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,398);
    //                                     }
    //                                     else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,402);
    //                                     }
    //                                     else {
    //                                         result = await fun_handled_messages.get_handled_message(langTitle,22);
    //                                     }
    //                                     //#endregion
    //                                     resolve(result);
    //                                 }).then((msg) => {
    //                                     //#region replace messages based on table name
    //                                     if (lkp_Table_Name=="airline_lkp") {
    //                                         if (langTitle=="en") {
    //                                             msg = msg.replace("Airline_Title_En", req.body.Airline_Title_En);
    //                                         } else {
    //                                             msg = msg.replace("Airline_Title_Ar", req.body.Airline_Title_Ar);
    //                                         }
    //                                     }
    //                                     else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                         if (langTitle=="en") {
    //                                             msg = msg.replace("Type_Title_En", req.body.Type_Title_En);
    //                                         } else {
    //                                             msg = msg.replace("Type_Title_Ar", req.body.Type_Title_Ar);
    //                                         }
    //                                     }
    //                                     else if (lkp_Table_Name=="report_reason_lkp") {
    //                                         if (langTitle=="en") {
    //                                             msg = msg.replace("Report_Reason_Title_En", req.body.Report_Reason_Title_En);
    //                                         } else {
    //                                             msg = msg.replace("Report_Reason_Title_Ar", req.body.Report_Reason_Title_Ar);
    //                                         }
    //                                     }
    //                                     else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                         if (langTitle=="en") {
    //                                             msg = msg.replace("Cancel_Reason_Title_En", req.body.Cancel_Reason_Title_En);
    //                                         } else {
    //                                             msg = msg.replace("Cancel_Reason_Title_Ar", req.body.Cancel_Reason_Title_Ar);
    //                                         }
    //                                     }
    //                                     else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                         if (langTitle=="en") {
    //                                             msg = msg.replace("Extra_Reason_Title_En", req.body.Extra_Reason_Title_En);
    //                                         } else {
    //                                             msg = msg.replace("Extra_Reason_Title_Ar", req.body.Extra_Reason_Title_Ar);
    //                                         }
    //                                     }
    //                                     else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                         if (langTitle=="en") {
    //                                             msg = msg.replace("Refund_Reason_Title_En", req.body.Refund_Reason_Title_En);
    //                                         } else {
    //                                             msg = msg.replace("Refund_Reason_Title_Ar", req.body.Refund_Reason_Title_Ar);
    //                                         }
    //                                     }
    //                                     else if (lkp_Table_Name=="payment_method_lkp") {
    //                                         if (langTitle=="en") {
    //                                             msg = msg.replace("Payment_Method_Title_En", req.body.Payment_Method_Title_En);
    //                                         } else {
    //                                             msg = msg.replace("Payment_Method_Title_Ar", req.body.Payment_Method_Title_Ar);
    //                                         }
    //                                     }
    //                                     else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                         if (langTitle=="en") {
    //                                             msg = msg.replace("Change_Reason_Title_En", req.body.Change_Reason_Title_En);
    //                                         } else {
    //                                             msg = msg.replace("Change_Reason_Title_Ar", req.body.Change_Reason_Title_Ar);
    //                                         }
    //                                     }
    //                                     else {
    //                                         msg = "";
    //                                     }
    //                                     //#endregion
    //                                     res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
    //                                 })
    //                                 //#endregion
    //                             }
    //                         })
    //                     })

    //                     //#endregion
    //                 }
                        
    //             })
    //             //#endregion                         
    //         }
    //     })

    // } catch (error) {
    //     logger.error(err.message);
    //     res.status(500).json({ data:[] , message:err.message , status: "error" });
    // }

};

exports.updateMany_Rows_Data =  async(req, res) =>{

    // try {
    //     //#region Global Variables
    //     lkp_Table_Name = req.params.lkp_Table_Name;
    //     langTitle = req.params.langTitle;
    //     var status = req.params.status;
    //     //#endregion
        
    //     new Promise(async (resolve, reject)=>{
    //         let returnedList = await tbl_Service.check_Sent_LKP_Tables_Existancy(lkp_Table_Name);
    //         resolve(returnedList);
    //     }).then((tbl_Exist) => {
    //         if (!tbl_Exist) {
    //             //#region LKP_Table parameter wrong
    //             new Promise(async (resolve, reject)=>{
    //                 var result = await fun_handled_messages.get_handled_message(langTitle,22);
    //                 resolve(result);
    //             }).then((msg) => {
    //                 res.status(400).json({ data: [] , message: msg , status: "wrong url" });      
    //             })
    //             //#endregion                         
    //         } else {
    //             //#region LKP_Table parameter right
    //             new Promise(async (resolve, reject)=>{
    //                 let returnedList = await fun_check_Existancy_By_List_IDS.check_Existancy_By_List_IDS(lkp_Table_Name,req.body.data);
    //                 resolve(returnedList);
    //             }).then((returned_ID) => { console.log("returned_ID : "+returned_ID)
    //                 if (returned_ID) {
    //                     //#region ID exist in DB
    //                     let updateMany_DataTable_Promise = new Promise(async (resolve, reject)=>{
    //                         var exist = await fun_Update_Suspend_Status_Many_Rows.Update_Suspend_Status_Many_Rows(status , req.body.data , req.body.Updated_By , lkp_Table_Name);
    //                         resolve(exist);
    //                     });  
    //                     updateMany_DataTable_Promise.then((Records_Updated) => {
    //                         if(!Records_Updated){
    //                         //#region msg update process failed
    //                         let get_Message_Promise = new Promise(async (resolve, reject)=>{
    //                             result = await fun_handled_messages.get_handled_message(langTitle,2);
    //                             resolve(result);
    //                         });
    //                         get_Message_Promise.then((msg) => {
    //                             res.status(400).json({ data: [] , message: msg , status: "update failed" });    
    //                         }).catch((err)=>{
    //                             res.status(500).json({ message: err.message , status: "error" });
    //                         });            
    //                         //#endregion
    //                         }else{
    //                         //#region msg update process successed
    //                         new Promise(async (resolve, reject)=>{
    //                             //#region lkp tables
    //                             let result=""
    //                             if (lkp_Table_Name=="airline_lkp") {
    //                                 if (status=="activate") {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,403);
    //                                 } else {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,404);
    //                                 }
    //                             } 
    //                             else if (lkp_Table_Name=="cancel_reason_lkp") {
    //                                 if (status=="activate") {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,405);
    //                                 } else {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,406);
    //                                 }
    //                             } 
    //                             else if (lkp_Table_Name=="creditcard_type_lkp") {
    //                                 if (status=="activate") {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,407);
    //                                 } else {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,408);
    //                                 }
    //                             }
    //                             else if (lkp_Table_Name=="extra_reason_lkp") {
    //                                 if (status=="activate") {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,409);
    //                                 } else {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,410);
    //                                 }
    //                             } 
    //                             else if (lkp_Table_Name=="payment_method_lkp") {
    //                                 if (status=="activate") {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,411);
    //                                 } else {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,412);
    //                                 }
    //                             } 
    //                             else if (lkp_Table_Name=="refund_reason_lkp") {
    //                                 if (status=="activate") {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,413);
    //                                 } else {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,414);
    //                                 }
    //                             } 
    //                             else if (lkp_Table_Name=="report_reason_lkp") {
    //                                 if (status=="activate") {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,415);
    //                                 } else {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,416);
    //                                 }
    //                             } 
    //                             else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
    //                                 if (status=="activate") {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,417);
    //                                 } else {
    //                                     result = await fun_handled_messages.get_handled_message(langTitle,418);
    //                                 }
    //                             }
    //                             //#endregion                                
    //                             resolve(result);
    //                         }).then((msg) => {
    //                             res.status(200).json({ data: Records_Updated , message: msg , status: "updated successed" });
    //                         })
    //                         //#endregion
    //                         }
    //                     })
    //                     //#endregion                        
    //                 } else {
    //                     //#region ID is not exist in DB msg 14
    //                     new Promise(async (resolve, reject)=>{
    //                         var result = await fun_handled_messages.get_handled_message(langTitle,14);
    //                         resolve(result);
    //                     }).then((msg) => {        
    //                         res.status(400).json({ data: [] , message: msg, status: "wrong id" });
    //                     })
    //                     //#endregion
    //                 }
    //             })
    //             //#endregion                         
    //         }
    //     })
    // } catch (error) {
    //     logger.error(err.message);
    //     res.status(500).json({ data:[] , message:err.message , status: "error" });
    // }
  
};

exports.search_data =  async(req, res) => {
    // try {
    //     //#region Global Variables
    //      lkp_Table_Name = req.params.lkp_Table_Name;
    //      langTitle = req.params.langTitle;
    //      const suspendStatus = req.params.suspendStatus;
    //      const val_Search_KeyWord = req.body.Search_KeyWord;
    //      var val_Sub_Service_ID = req.body.Sub_Service_ID;
    //      var val_Main_Service_IDs = req.body.Main_Service_IDs;
    //      var val_Sub_Service_IDs = req.body.Sub_Service_IDs;
    //      var val_Is_Reviewed = req.body.Is_Reviewed;
    //      var val_Admin_User = req.body.Admin_User;
    //     //#endregion

    //     let check_Sent_LKP_Tables_Existancy_Promise = new Promise(async (resolve, reject)=>{
    //         let returnedList = await tbl_Service.check_Sent_LKP_Tables_Existancy(lkp_Table_Name);
    //         resolve(returnedList);
    //     });
    //     check_Sent_LKP_Tables_Existancy_Promise.then((tbl_Exist) => {
    //         if (!tbl_Exist) {
    //             //#region LKP_Table parameter wrong
    //             let get_Message_Promise = new Promise(async (resolve, reject)=>{
    //                 var result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                 resolve(result);
    //             });
    //             get_Message_Promise.then((msg) => {
    //                 res.status(400).json({ data: [] , message: msg , status: "wrong url" });      
    //             }).catch((err)=>{
    //                 res.status(500).json({ message: err.message , status: "error" });
    //             });
    //             //#endregion                         
    //         } else {
    //             //#region LKP_Table parameter right
    //             let get_DataTable_Promise = new Promise(async (resolve, reject)=>{
    //                 var returnedList = await tbl_Service.get_Data_By_SuspendStatus_AND_Title( lkp_Table_Name , suspendStatus , val_Search_KeyWord , langTitle , val_Sub_Service_ID , val_Main_Service_IDs , val_Sub_Service_IDs , val_Is_Reviewed , val_Admin_User );
    //                 resolve(returnedList);
    //             });
            
    //             let get_Message_Promise = new Promise(async (resolve, reject)=>{
            
    //                 var result = ""
                    
    //                 //#region Create Model Object Based on Table Name
    //                 if (lkp_Table_Name=="addons_lkp") {
            
    //                     if (suspendStatus=="only-true"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,206);
    //                     }else if(suspendStatus=="only-false"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,207);
    //                     }else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,12);
    //                     }else{
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="airline_lkp") {
                        
    //                     if (suspendStatus=="only-true"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,196);
    //                     }else if(suspendStatus=="only-false"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,197);
    //                     }else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,10);
    //                     }else{
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 }
    //                 else if (lkp_Table_Name=="brand_name_lkp") {
            
    //                     if (suspendStatus=="only-true"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,208);
    //                     }else if(suspendStatus=="only-false"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,209);                
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,41);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="business_organizations_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,210);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,211);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,19);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="cancel_reason_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,212);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,213);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,28);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="courier_categories_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,214);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,215);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,216);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="creditcard_type_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,217);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,218);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,20);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="discount_method_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,252);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,253);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,56);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="discount_type_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,219);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,220);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,221);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="extra_reason_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,222);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,223);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,32);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="fuel_type_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,224);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,225);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,53);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="main_services_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,226);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,227);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,17);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="model_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,228);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,229);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,44);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="payment_method_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,230);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,231);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,59);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="refund_reason_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,232);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,233);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,35);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="report_reason_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,234);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,235);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,25);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="style_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,236);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,237);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,38);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="Sub_Services_LKP") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,238);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,239);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,18);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="templates_forms_title_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,240);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,241);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,242);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="transmission_type_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,243);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,244);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,50);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="trip_type_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,249);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,250);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,68);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="user_roles_lkp") {
            
    //                     result = await fun_handled_messages.get_handled_message(langTitle,201);
                        
    //                 } 
    //                 else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,245);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,246);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,62);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else if (lkp_Table_Name=="year_manufacturing_lkp") {
            
    //                     if (suspendStatus=="only-true") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,247);
    //                     } else if(suspendStatus=="only-false") {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,248);
    //                     } else if(suspendStatus=="all"){
    //                         result = await fun_handled_messages.get_handled_message(langTitle,47);
    //                     } else {
    //                         result = await fun_handled_messages.get_handled_message(langTitle,201);
    //                     }
                        
    //                 } 
    //                 else {
    //                     result="";
    //                 }
    //                 //#endregion
            
    //                 resolve(result);
    //             });
            
    //             Promise.all([get_DataTable_Promise , get_Message_Promise]).then((results) => {
                
    //                 if (results[0].length<=0) {
            
    //                 if ((suspendStatus=="only-true")||(suspendStatus=="only-false")||(suspendStatus=="all")) {
    //                     res.status(200).json({ data: [] , message: results[1] , status: "empty rows" });
    //                 } else {
    //                     res.status(400).json({ data: [] , message: results[1] , status: "wrong url" });
    //                 }
                    
    //                 } else {
    //                 res.status(200).json({ data: results[0] , message: "" , status: "rows selected" });
    //                 }
            
    //             }).catch((err)=>{
    //                 res.status(500).json({ message: err.message , status: "error" });
    //             });
    //             //#endregion                         
    //         }
    //     }).catch((err)=>{
    //         res.status(500).json({ message: err.message , status: "error" });
    //     }); 

        
    // } catch (error) {
    //     logger.error(err.message);
    //     res.status(500).json({ data:[] , message:err.message , status: "error" });
    // }
};