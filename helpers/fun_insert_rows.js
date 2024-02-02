module.exports.insert_rows = async (lkp_Table_Name,DataRows_Collection) => {
    try {
        //#region Variables
        var ObjectId = require('mongodb').ObjectId;
        var tbl_Model = "";        
        //#endregion

        //#region set model based on table name
        if (lkp_Table_Name=="client_vehicles_advance_notice_period_log") {
            tbl_Model = require("../models/client_vehicles_advance_notice_period_log");
        }
        else if (lkp_Table_Name=="business_vehicles_advance_notice_period_log"){
            tbl_Model = require("../models/business_vehicles_advance_notice_period_log");
        }
        else if (lkp_Table_Name=="client_prices_log"){
            tbl_Model = require("../models/client_prices_log");
        }
        else if (lkp_Table_Name=="business_prices_log"){
            tbl_Model = require("../models/business_prices_log");
        }
        else if (lkp_Table_Name=="courier_details"){
            tbl_Model = require("../models/courier_details");
        }        
        else {
            return"";
        }
        //#endregion

        return await tbl_Model.insertMany(DataRows_Collection);

    } catch (error) {
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};