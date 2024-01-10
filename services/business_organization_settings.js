//#region Global Variables
var tbl_Model = "";
const logger = require('../utils/logger');
var loggers_Model = require("../models/logger");
const now_DateTime = require('../helpers/fun_datetime');
var ObjectId = require('mongodb').ObjectId;
//#endregion

exports.Suspend_Users_In_Organization = async (val_Business_Organization_ID) => {

    try 
    {
        tbl_Model = require("../models/user_data");

        return await tbl_Model.updateMany(
            { 
                Business_Organization_ID:  new ObjectId(val_Business_Organization_ID) 
            },
            { $set: { LastUpdate_DateTime : now_DateTime.get_DateTime() , Is_Suspended : true }}
          );

    } catch (error) {
        logger.error(error.message);
    }
     
};