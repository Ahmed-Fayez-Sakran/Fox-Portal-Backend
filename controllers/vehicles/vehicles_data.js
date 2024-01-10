//#region Global Variables
var tbl_Model = require("../../models/user_data");
const tbl_Service = require("../../services/vehicles_data");
const now_DateTime = require('../../helpers/fun_datetime');
const fun_handled_messages = require('../../helpers/fun_handled_messages');
const fun_get_serial_number = require('../../helpers/fun_get_serial_number');
const fun_check_Existancy_By_ID = require('../../helpers/fun_check_Existancy_By_ID');
const logger = require('../../utils/logger');
var loggers_Model = require("../../models/logger");
let loggers_Data = ""
var langTitle = ""
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const random = require('../../helpers/generate_random_text');
//#endregion


exports.get_vehicles_Data_Based_on_Subservice =  async(req, res) => {
    try {
       //#region Global Variables
       var val_Page_Number = req.params.page_number;
       var suspendStatus = req.params.suspendStatus;
       var sub_service_title = req.params.sub_service_title;
       //#endregion

        new Promise(async (resolve, reject)=>{
          var returnedList = await tbl_Service.get_Vehicles_Data_Based_on_Subservice(val_Page_Number,suspendStatus,sub_service_title);
          resolve(returnedList);
        }).then((returned_List) => {
          if (!returned_List){
            //#region Empty List
            new Promise(async (resolve, reject)=>{
              var result = await fun_handled_messages.get_handled_message(langTitle,41);
              resolve(result);
            }).then((msg) => {
              res.status(200).json({ data: [] , message: msg, status: "empty rows" });
            })
            //#endregion
          } else {
            res.status(200).json({ data: returned_List , message: "" , status: "rows selected" });
          }
        })
          
        
          
  
    } catch (error) {
      logger.error(err.message);
      res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};