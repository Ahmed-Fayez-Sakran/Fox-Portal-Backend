var mongoose = require('mongoose');
const logger = require('../utils/logger');
var ObjectId = require('mongodb').ObjectId;

module.exports.check_Existancy_By_ID = async (sent_Table,val_ID) => {
    try {
        var tbl_Model = ""
        
        //#region Assign tbl_Model for Tables
        if (sent_Table=="business_organizations_lkp") { 
            tbl_Model = require("../models/business_organizations_lkp");  
        }else if (sent_Table=="user_data") {
            tbl_Model = require("../models/user_data");
        }else if (sent_Table=="sub_services_lkp") {
            tbl_Model = require("../models/sub_services_lkp");
        }else if (sent_Table=="addons_lkp") {
            tbl_Model = require("../models/addons_lkp");
        } else if (sent_Table=="services_with_addons") {
            tbl_Model = require("../models/services_with_addons");
        } else if (sent_Table=="main_services_lkp") {
            tbl_Model = require("../models/main_services_lkp");
        } else if (sent_Table=="trip_type_lkp") {
            tbl_Model = require("../models/trip_type_lkp");
        } else if (sent_Table=="rent_period") {
            tbl_Model = require("../models/rent_period");
        } else if (sent_Table=="full_day_package_log") {
            tbl_Model = require("../models/full_day_package_log");
        } else if (sent_Table=="bus_trip_full_day_package_log") {
            tbl_Model = require("../models/bus_trip_full_day_package_log");
        } else if (sent_Table=="valet_schedule_package_log") {
            tbl_Model = require("../models/valet_schedule_package_log");
        } else if (sent_Table=="style_lkp") {
            tbl_Model = require("../models/style_lkp");
        } else if (sent_Table=="brand_name_lkp") {
            tbl_Model = require("../models/brand_name_lkp");
        } else if (sent_Table=="fuel_type_lkp") {
            tbl_Model = require("../models/fuel_type_lkp");
        } else if (sent_Table=="model_lkp") {
            tbl_Model = require("../models/model_lkp");
        } else if (sent_Table=="year_manufacturing_lkp") {
            tbl_Model = require("../models/year_manufacturing_lkp");
        } else if (sent_Table=="transmission_type_lkp") {
            tbl_Model = require("../models/transmission_type_lkp");
        } else if (sent_Table=="courier_categories_lkp") {
            tbl_Model = require("../models/courier_categories_lkp");
        } else if (sent_Table=="vehicles_data") {
            tbl_Model = require("../models/vehicles_data");
        } else if (sent_Table=="vehicles_categories_per_subservices") {
            tbl_Model = require("../models/vehicles_categories_per_subservices");
        } else if (sent_Table=="vehicles_classification") {
            tbl_Model = require("../models/vehicles_classification");
        } else if (sent_Table=="vehicle_data_details") {
            tbl_Model = require("../models/vehicle_data_details");
        } else if (sent_Table=="courier_details") {
            tbl_Model = require("../models/courier_details");
        } else if (sent_Table=="discount_type_lkp") {
            tbl_Model = require("../models/discount_type_lkp");
        } else if (sent_Table=="discount_method_lkp") {
            tbl_Model = require("../models/discount_method_lkp");
        } else if (sent_Table=="promo_code_data") {
            tbl_Model = require("../models/promo_code_data");
        } else if (sent_Table=="drivers_data") {
            tbl_Model = require("../models/drivers_data");
        } else if (sent_Table=="client_promo_code_log") {
            tbl_Model = require("../models/client_promo_code_log");
        } else if (sent_Table=="business_promo_code_log") {
            tbl_Model = require("../models/business_promo_code_log");
        } else if (sent_Table=="business_services_with_addons_prices_log") {
            tbl_Model = require("../models/business_services_with_addons_prices_log");
        } else if (sent_Table=="client_services_with_addons_prices_log") {
            tbl_Model = require("../models/client_services_with_addons_prices_log");
        } else if (sent_Table=="business_prices_log") {
            tbl_Model = require("../models/business_prices_log");
        } else if (sent_Table=="client_prices_log") {
            tbl_Model = require("../models/client_prices_log");
        }
        
        else if (sent_Table=="airline_lkp") {
            tbl_Model = require("../models/airline_lkp");
        } else if (sent_Table=="cancel_reason_lkp") {
            tbl_Model = require("../models/cancel_reason_lkp");
        } else if (sent_Table=="courier_categories_lkp") {
            tbl_Model = require("../models/courier_categories_lkp");
        } else if (sent_Table=="creditcard_type_lkp") {
            tbl_Model = require("../models/creditcard_type_lkp");
        } else if (sent_Table=="extra_reason_lkp") {
            tbl_Model = require("../models/extra_reason_lkp");
        } else if (sent_Table=="payment_method_lkp") {
            tbl_Model = require("../models/payment_method_lkp");
        } else if (sent_Table=="refund_reason_lkp") {
            tbl_Model = require("../models/refund_reason_lkp");
        } else if (sent_Table=="report_reason_lkp") {
            tbl_Model = require("../models/report_reason_lkp");
        } else if (sent_Table=="discount_type_lkp") {
            tbl_Model = require("../models/discount_type_lkp");
        } else if (sent_Table=="vehicle_change_reasons_lkp") {
            tbl_Model = require("../models/vehicle_change_reasons_lkp");
        } else if (sent_Table=="order_status_lkp") {
            tbl_Model = require("../models/order_status_lkp");
        } else if (sent_Table=="user_roles_lkp") {
            tbl_Model = require("../models/user_roles_lkp");
        }



        //#region Comments
        // else if (sent_Table=="addons_lkp") {
        //     tbl_Model = require("../models/addons_lkp");
        // } 
             
        // else if (sent_Table=="sub_services_lkp") {
        //     tbl_Model = require("../models/Sub_Services_LKP");
        // }
        // else if (sent_Table=="transmission_type_lkp") {
        //     tbl_Model = require("../models/transmission_type_lkp");
        // }        
        
        // else if (sent_Table=="business_sub_services_settings_log") {
        //     tbl_Model = require("../models/business_sub_services_settings_log");
        // }
        // else if (sent_Table=="client_sub_services_settings_log") {
        //     tbl_Model = require("../models/client_sub_services_settings_log");
        // }
        
        
        // else if (sent_Table=="orders_with_discount") {
        //     tbl_Model = require("../models/orders_with_discount");
        // } else if (sent_Table=="users_orders_main_log") {
        //     tbl_Model = require("../models/users_orders_main_log");
        // else if (sent_Table=="promo_code_data") {
        //     tbl_Model = require("../models/promo_code_data");
        // } else if (sent_Table=="useremailverification_log") {
        //     tbl_Model = require("../models/useremailverification_log");
        // } else if (sent_Table=="userphoneverification_log") {
        //     tbl_Model = require("../models/userphoneverification_log");
        // } else if (sent_Table=="user_data") {
        //     tbl_Model = require("../models/user_data");
        // } else if (sent_Table=="services_with_addons") {
        //     tbl_Model = require("../models/services_with_addons");
        // }
        
        //#endregion  
        else {
            tbl_Model = ""
        }
        //#endregion  
        
        if (mongoose.Types.ObjectId.isValid(val_ID)) {
            let returned_Date = ""
            if (sent_Table=="orders_with_discount") {
                returned_Date =  await tbl_Model.find({Order_ID:new ObjectId(val_ID)});
            } 
            // else if (sent_Table=="client_promo_code_log") {
            //     returned_Date =  await tbl_Model.find({Promo_Code_ID:new ObjectId(val_ID)});
            // } 
            else { 
                returned_Date =  await tbl_Model.find({_id:new ObjectId(val_ID)});
            }
            return (returned_Date.length <=0) ? false : true; 
        } else {
            return false;
        }

    } catch (error) {
        logger.error(error.message);
    }
};

