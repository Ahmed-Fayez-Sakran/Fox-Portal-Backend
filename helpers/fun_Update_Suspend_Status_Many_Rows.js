module.exports.Update_Suspend_Status_Many_Rows = async (status, data , Updated_By , lkp_Table_Name) => {
    try {
        //#region Global Variables
        var tbl_Model = ""
        const now_DateTime = require('../helpers/fun_datetime');
        var val_IDs = data;
        var Updated_DateTime =now_DateTime.get_DateTime()
        //#endregion
    
        //#region Define Models
        if (lkp_Table_Name=="sub_services_lkp") {
          tbl_Model = require("../models/sub_services_lkp");
        } else if (lkp_Table_Name=="addons_lkp") {
          tbl_Model = require("../models/addons_lkp");
        } else if (lkp_Table_Name=="business_organizations_lkp") {
          tbl_Model = require("../models/business_organizations_lkp"); 
        } else if (lkp_Table_Name=="services_with_addons") {
          tbl_Model = require("../models/services_with_addons");
        } else if (lkp_Table_Name=="main_services_lkp") {
          tbl_Model = require("../models/main_services_lkp");
        } else if (lkp_Table_Name=="trip_type_lkp") {
          tbl_Model = require("../models/trip_type_lkp");
        } else if (lkp_Table_Name=="rent_period") {
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

        else if (lkp_Table_Name=="client_vehicles_advance_notice_period_log") {
          tbl_Model = require("../models/client_vehicles_advance_notice_period_log");
        }
        else if (lkp_Table_Name=="business_vehicles_advance_notice_period_log") {
            tbl_Model = require("../models/business_vehicles_advance_notice_period_log");
        }
        else if (lkp_Table_Name=="vehicles_classification") {
            tbl_Model = require("../models/vehicles_classification");
        }
        else if (lkp_Table_Name=="vehicles_categories_per_subservices") {
            tbl_Model = require("../models/vehicles_categories_per_subservices");
        }
        else if (lkp_Table_Name=="vehicle_data_details") {
            tbl_Model = require("../models/vehicle_data_details");
        }
        else if (lkp_Table_Name=="client_prices_log") {
            tbl_Model = require("../models/client_prices_log");
        }
        else if (lkp_Table_Name=="business_prices_log") {
            tbl_Model = require("../models/business_prices_log");
        }
        else if (lkp_Table_Name=="courier_details") {
            tbl_Model = require("../models/courier_details");
        }
        else if (lkp_Table_Name=="discount_method_lkp") {
          tbl_Model = require("../models/discount_method_lkp");
        }
        
        else if (lkp_Table_Name=="drivers_data") {
          tbl_Model = require("../models/drivers_data");
        }
        else if (lkp_Table_Name=="promo_code_data") {
          tbl_Model = require("../models/promo_code_data");
        }
        else if (lkp_Table_Name=="business_sub_services_settings_log") 
        {
          tbl_Model = require("../models/business_sub_services_settings_log");
        }
        else if (lkp_Table_Name=="client_sub_services_settings_log") 
        {
          tbl_Model = require("../models/client_sub_services_settings_log");
        }
        
        else if (lkp_Table_Name=="airline_lkp") {
          tbl_Model = require("../models/airline_lkp");
      } else if (lkp_Table_Name=="cancel_reason_lkp") {
          tbl_Model = require("../models/cancel_reason_lkp");
      } else if (lkp_Table_Name=="courier_categories_lkp") {
          tbl_Model = require("../models/courier_categories_lkp");
      } else if (lkp_Table_Name=="creditcard_type_lkp") {
          tbl_Model = require("../models/creditcard_type_lkp");
      } else if (lkp_Table_Name=="extra_reason_lkp") {
          tbl_Model = require("../models/extra_reason_lkp");
      } else if (lkp_Table_Name=="payment_method_lkp") {
          tbl_Model = require("../models/payment_method_lkp");
      } else if (lkp_Table_Name=="refund_reason_lkp") {
          tbl_Model = require("../models/refund_reason_lkp");
      } else if (lkp_Table_Name=="report_reason_lkp") {
          tbl_Model = require("../models/report_reason_lkp");
      } else if (lkp_Table_Name=="discount_type_lkp") {
          tbl_Model = require("../models/discount_type_lkp");
      } else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
          tbl_Model = require("../models/vehicle_change_reasons_lkp");
      } else if (lkp_Table_Name=="order_status_lkp") {
          tbl_Model = require("../models/order_status_lkp");
      } else if (lkp_Table_Name=="user_roles_lkp") {
          tbl_Model = require("../models/user_roles_lkp");
      }

        //#region Comments
          
        //   else if (lkp_Table_Name=="airline_lkp") {
        //       tbl_Model = require("../models/airline_lkp");
        //   }
        //   else if (lkp_Table_Name=="brand_name_lkp") {
        //       tbl_Model = require("../models/brand_name_lkp");
        //   }
        //   else if (lkp_Table_Name=="cancel_reason_lkp") {
        //       tbl_Model = require("../models/cancel_reason_lkp");
        //   }
        //   else if (lkp_Table_Name=="courier_categories_lkp") {
        //       tbl_Model = require("../models/courier_categories_lkp");
        //   }
        //   else if (lkp_Table_Name=="creditcard_type_lkp") {
        //       tbl_Model = require("../models/creditcard_type_lkp");
        //   }
        
        //   else if (lkp_Table_Name=="extra_reason_lkp") {
        //       tbl_Model = require("../models/extra_reason_lkp");
        //   }
        //   else if (lkp_Table_Name=="fuel_type_lkp") {
        //       tbl_Model = require("../models/fuel_type_lkp");
        //   }
        //   else if (lkp_Table_Name=="model_lkp") {
        //       tbl_Model = require("../models/model_lkp");
        //   }
        
        //   else if (lkp_Table_Name=="payment_method_lkp") {
        //       tbl_Model = require("../models/payment_method_lkp");
        //   }
        //   else if (lkp_Table_Name=="refund_reason_lkp") {
        //       tbl_Model = require("../models/refund_reason_lkp");
        //   }
        //   else if (lkp_Table_Name=="report_reason_lkp") {
        //       tbl_Model = require("../models/report_reason_lkp");
        //   }
        //   else if (lkp_Table_Name=="style_lkp") {
        //       tbl_Model = require("../models/style_lkp");
        //   }
        
        
        //   else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
        //       tbl_Model = require("../models/vehicle_change_reasons_lkp");
        //   }
        //   else if (lkp_Table_Name=="year_manufacturing_lkp") {
        //       tbl_Model = require("../models/year_manufacturing_lkp");
        //   }
        //   else if (lkp_Table_Name=="services_with_addons") {
        //       tbl_Model = require("../models/services_with_addons");
        //   }
        
        
        //   else if (lkp_Table_Name=="client_services_with_addons_prices_log") {
        //       tbl_Model = require("../models/client_services_with_addons_prices_log");
        //   }
        //   else if (lkp_Table_Name=="business_services_with_addons_prices_log") {
        //       tbl_Model = require("../models/business_services_with_addons_prices_log");
        //   }
        
        //#endregion
        else {
            return"";
        }
        //#endregion
        
        if (status=="activate") {
          //#region activate
          return await tbl_Model.updateMany(
            { 
              $and: [
                { Is_Suspended: true },
                { _id: { $in: val_IDs } }
              ]
            }, 
            { $set: { Is_Suspended: false , Updated_By:Updated_By , Updated_DateTime:Updated_DateTime }}
          )
          //#endregion
        } else {
            //#region suspend
            return await tbl_Model.updateMany(
              { 
                $and: 
                [
                  { Is_Suspended: false },
                  { _id: { $in: val_IDs } }
                ]
              }, 
              { $set: { Is_Suspended: true , Updated_By:Updated_By , Updated_DateTime:Updated_DateTime }}
            )
            //#endregion
        }

    } catch (error) {
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};