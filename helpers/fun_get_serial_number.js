module.exports.get_Serial_Number = async (lkp_Table_Name) => {
    try {
        //#region Variables
        var tbl_Model = ""
        var counter = ""
        let item = ""
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
        else if (lkp_Table_Name=="addons_lkp") {
            tbl_Model = require("../models/addons_lkp");
        }
        else if (lkp_Table_Name=="services_with_addons") {
            tbl_Model = require("../models/services_with_addons");
        }
        else if (lkp_Table_Name=="trip_type_lkp") {
            tbl_Model = require("../models/trip_type_lkp");
        }
        else if (lkp_Table_Name=="rent_period") {
            tbl_Model = require("../models/rent_period");
        }        
        else if (lkp_Table_Name=="full_day_package_log") {
            tbl_Model = require("../models/full_day_package_log");
        }
        else if (lkp_Table_Name=="bus_trip_full_day_package_log") {
            tbl_Model = require("../models/bus_trip_full_day_package_log");
        }
        else if (lkp_Table_Name=="valet_schedule_package_log") {
            tbl_Model = require("../models/valet_schedule_package_log");
        }

        else if (lkp_Table_Name=="style_lkp") {
            tbl_Model = require("../models/style_lkp");
        }
        else if (lkp_Table_Name=="brand_name_lkp") {
            tbl_Model = require("../models/brand_name_lkp");
        }
        else if (lkp_Table_Name=="fuel_type_lkp") {
            tbl_Model = require("../models/fuel_type_lkp");
        }
        else if (lkp_Table_Name=="model_lkp") {
            tbl_Model = require("../models/model_lkp");
        }
        else if (lkp_Table_Name=="year_manufacturing_lkp") {
            tbl_Model = require("../models/year_manufacturing_lkp");
        }
        else if (lkp_Table_Name=="transmission_type_lkp") {
            tbl_Model = require("../models/transmission_type_lkp");
        }
        else if (lkp_Table_Name=="courier_categories_lkp") {
            tbl_Model = require("../models/courier_categories_lkp");
        }
        else if (lkp_Table_Name=="vehicles_data") {
            tbl_Model = require("../models/vehicles_data");
        }
        else if (lkp_Table_Name=="client_vehicles_advance_notice_period_log") {
            tbl_Model = require("../models/client_vehicles_advance_notice_period_log");
        }
        else if (lkp_Table_Name=="business_vehicles_advance_notice_period_log") {
            tbl_Model = require("../models/business_vehicles_advance_notice_period_log");
        }
        else if (lkp_Table_Name=="vehicles_categories_per_subservices") {
            tbl_Model = require("../models/vehicles_categories_per_subservices");
        }
        else if (lkp_Table_Name=="vehicles_classification") {
            tbl_Model = require("../models/vehicles_classification");
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
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};