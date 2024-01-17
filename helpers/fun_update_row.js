module.exports.update_row = async (id , lkp_Table_Name , tblObject , is_Delete_Old_Image) => {
    try {
        //#region Variables
        var ObjectId = require('mongodb').ObjectId;
        var tbl_Model = "";
        var filePathToDelete = "";
        const obj_Get_Photo_Path = require('../helpers/fun_get_photo_path');
        //#endregion

        //#region set model based on table name
        if (lkp_Table_Name=="business_organizations_lkp") {
            tbl_Model = require("../models/business_organizations_lkp");
        }
        else if (lkp_Table_Name=="user_data") {
            tbl_Model = require("../models/user_data");
        }
        else if (lkp_Table_Name=="sub_services_lkp") {
            tbl_Model = require("../models/sub_services_lkp");
        }
        else if (lkp_Table_Name=="company_privacy_policy") {
            tbl_Model = require("../models/company_privacy_policy");
        }
        else if (lkp_Table_Name=="addons_lkp") {
            tbl_Model = require("../models/addons_lkp");
        }
        else if (lkp_Table_Name=="services_with_addons") {
            tbl_Model = require("../models/services_with_addons");
        }
        else if (lkp_Table_Name=="main_services_lkp") {
            tbl_Model = require("../models/main_services_lkp");
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
        else if (lkp_Table_Name=="vehicles_categories_per_subservices") {
            tbl_Model = require("../models/vehicles_categories_per_subservices");
        }
        else if (lkp_Table_Name=="vehicles_classification") {
            tbl_Model = require("../models/vehicles_classification");
        }
        else if (lkp_Table_Name=="vehicles_data") {
            tbl_Model = require("../models/vehicles_data");
        } 
        else if (lkp_Table_Name=="vehicle_data_details") {
            tbl_Model = require("../models/vehicle_data_details");
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
               
        
        else {
            return"";
        }
        //#endregion

        const updatedDoc = await tbl_Model.findByIdAndUpdate(id, tblObject, { new: true });

        if (is_Delete_Old_Image) {

            //#region filePathToDelete
            let get_Photo_Path_Promise = new Promise(async (resolve, reject)=>{
                filePathToDelete = obj_Get_Photo_Path.get_Photo_Path(id,lkp_Table_Name);
                resolve(filePathToDelete);
            });
            get_Photo_Path_Promise.then((flg) => {                
                filePathToDelete=flg
            })
            //#endregion
            console.log("filePathToDelete = "+filePathToDelete)
            const fs = require('fs');
            //await fs.promises.unlink(flg);
        }

        return updatedDoc;

    } catch (error) {
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};