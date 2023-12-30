var mongoose = require('mongoose');


module.exports.check_Existancy_By_List_IDS = async (sent_Table,val_Array_IDs) => {
    try {
        var tbl_Model = ""
        var is_Valid_Size = 0

        //#region Assign tbl_Model for Tables
        if (sent_Table=="business_organizations_lkp") { 
            tbl_Model = require("../models/business_organizations_lkp");  
        }
        else if (sent_Table=="sub_services_lkp") {
            tbl_Model = require("../models/Sub_Services_LKP");
        }
        //#region comments
        // else if (sent_Table=="airline_lkp") {
        //     tbl_Model = require("../models/airline_lkp");
        // }
        // else if (sent_Table=="brand_name_lkp") {
        //     tbl_Model = require("../models/brand_name_lkp");
        // }
        // else if (sent_Table=="addons_lkp") {
        //     tbl_Model = require("../models/addons_lkp");
        // } 
        // else if (sent_Table=="cancel_reason_lkp") {
        //     tbl_Model = require("../models/cancel_reason_lkp");
        // }
        // else if (sent_Table=="courier_categories_lkp") {
        //     tbl_Model = require("../models/courier_categories_lkp");
        // }
        // else if (sent_Table=="creditcard_type_lkp") {
        //     tbl_Model = require("../models/creditcard_type_lkp");
        // }
        // else if (sent_Table=="discount_type_lkp") {
        //     tbl_Model = require("../models/discount_type_lkp");
        // }
        // else if (sent_Table=="discount_method_lkp") {
        //     tbl_Model = require("../models/discount_method_lkp");
        // }
        // else if (sent_Table=="extra_reason_lkp") {
        //     tbl_Model = require("../models/extra_reason_lkp");
        // }
        // else if (sent_Table=="fuel_type_lkp") {
        //     tbl_Model = require("../models/fuel_type_lkp");
        // }
        // else if (sent_Table=="model_lkp") {
        //     tbl_Model = require("../models/model_lkp");
        // }
        // else if (sent_Table=="main_services_lkp") {
        //     tbl_Model = require("../models/main_services_lkp");
        // }
        // else if (sent_Table=="payment_method_lkp") {
        //     tbl_Model = require("../models/payment_method_lkp");
        // }
        // else if (sent_Table=="refund_reason_lkp") {
        //     tbl_Model = require("../models/refund_reason_lkp");
        // }
        // else if (sent_Table=="report_reason_lkp") {
        //     tbl_Model = require("../models/report_reason_lkp");
        // }
        // else if (sent_Table=="style_lkp") {
        //     tbl_Model = require("../models/style_lkp");
        // }
        // else if (sent_Table=="transmission_type_lkp") {
        //     tbl_Model = require("../models/transmission_type_lkp");
        // }
        // else if (sent_Table=="trip_type_lkp") {
        //     tbl_Model = require("../models/trip_type_lkp");
        // }
        // else if (sent_Table=="vehicle_change_reasons_lkp") {
        //     tbl_Model = require("../models/vehicle_change_reasons_lkp");
        // }
        // else if (sent_Table=="year_manufacturing_lkp") {
        //     tbl_Model = require("../models/year_manufacturing_lkp");
        // }
        // else if (sent_Table=="order_status_lkp") {
        //     tbl_Model = require("../models/order_status_lkp");
        // }
        // else if (sent_Table=="services_with_addons") {
        //     tbl_Model = require("../models/services_with_addons");
        // }
        // else if (sent_Table=="full_day_package_log") {
        //     tbl_Model = require("../models/sub_services_packages_log");
        // }
        // else if (sent_Table=="bus_trip_full_day_package_log") {
        //     tbl_Model = require("../models/bus_trip_full_day_package_log");
        // }
        // else if (sent_Table=="valet_schedule_package_log") {
        //     tbl_Model = require("../models/valet_schedule_package_log");
        // }
        // else if (sent_Table=="rent_period") {
        //     tbl_Model = require("../models/rent_period");
        // }
        // else if (sent_Table=="client_services_with_addons_prices_log") {
        //     tbl_Model = require("../models/client_services_with_addons_prices_log");
        // }
        // else if (sent_Table=="business_services_with_addons_prices_log") {
        //     tbl_Model = require("../models/business_services_with_addons_prices_log");
        // }
        // else if (sent_Table=="orders_with_discount") {
        //     tbl_Model = require("../models/orders_with_discount");
        // } else if (sent_Table=="users_orders_main_log") {
        //     tbl_Model = require("../models/users_orders_main_log");
        // } else if (sent_Table=="discount_method_lkp") {
        //     tbl_Model = require("../models/discount_method_lkp");
        // } else if (sent_Table=="promo_code_data") {
        //     tbl_Model = require("../models/promo_code_data");
        // }
        //#endregion   
        else {
            tbl_Model = ""
        }
        //#endregion  

        for (i in val_Array_IDs) {
            val_ID = val_Array_IDs[i];
            if (mongoose.Types.ObjectId.isValid(val_ID)) {
                is_Valid_Size = is_Valid_Size+1
            } 
        }

        if (is_Valid_Size==val_Array_IDs.length) {
            let returned_Date =  "";
            returned_Date =  await tbl_Model.find({ _id: { $in: val_Array_IDs } });
            return (returned_Date.length <=0) ? false : true; 
        } 
        else {
            return false;
        }
        
    } catch (error) {
        console.log(error.message);
    }
};