module.exports.insert_row = async (lkp_Table_Name,row_Data_Object) => {
    try {
        //#region Variables
        var ObjectId = require('mongodb').ObjectId;
        var tbl_Model = "";        
        //#endregion

        //#region set model based on table name
        if (lkp_Table_Name=="business_organizations_lkp") {
            tbl_Model = require("../models/business_organizations_lkp");
        }
        else if (lkp_Table_Name=="user_data") {
            tbl_Model = require("../models/user_data");
        }
        else if (lkp_Table_Name=="useremailverification_log") {
            tbl_Model = require("../models/useremailverification_log");
        }
        else if (lkp_Table_Name=="userphoneverification_log") {
            tbl_Model = require("../models/userphoneverification_log");
        }
        else if (lkp_Table_Name=="sms_message") {
            tbl_Model = require("../models/sms_message");
        }
        else if (lkp_Table_Name=="company_privacy_policy") {
            tbl_Model = require("../models/company_privacy_policy");
        }
        else if (lkp_Table_Name=="user_tokens_log") {
            tbl_Model = require("../models/user_tokens_log");
        }        
        else {
            return"";
        }
        //#endregion

        return await tbl_Model.create(row_Data_Object);

    } catch (error) {
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};