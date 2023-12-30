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
            tbl_Model = require("../models/Sub_Services_LKP");
        }
        else if (lkp_Table_Name=="company_privacy_policy") {
            tbl_Model = require("../models/company_privacy_policy");
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