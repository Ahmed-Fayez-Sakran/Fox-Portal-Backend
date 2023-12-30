module.exports.get_Serial_Number = async (lkp_Table_Name) => {
    try {
        //#region Variables
        var tbl_Model = ""
        var counter = ""
        let item = ""
        const logger = require('../utils/logger');
        //#endregion

        //#region Define Models
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
        else if (lkp_Table_Name=="company_privacy_policy") {
            tbl_Model = require("../models/company_privacy_policy");
        }
        else if (lkp_Table_Name=="user_tokens_log") {
            tbl_Model = require("../models/user_tokens_log");
        }
        //#endregion

        counter = await tbl_Model.find().count()
        
        if (counter>=1) {
            item = await tbl_Model.find().sort({ _id: -1 }).limit(1);

            if (lkp_Table_Name=="business_organizations_lkp" && item[0].Serial_Number=="000") {
                return counter+1;
            } else {
                return (item[0].Serial_Number)<=0? 1:+(item[0].Serial_Number)+1; 
            }

        } else {
            return 1;
        }
        
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};