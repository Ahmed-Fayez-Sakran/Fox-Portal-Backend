//#region Global Variables
var tbl_Model = require("../models/addons_lkp");
const now_DateTime = require('../helpers/fun_datetime');
const obj_Get_Photo_Path = require('../helpers/fun_get_photo_path');
const logger = require('../utils/logger');
//#endregion

exports.get_Data_By_SuspendStatus = async (suspendStatus,pageNumber) => {

    try
    {
        //#region Define Variables
        var pageSize = 10 ;
        var skip = (pageNumber - 1) * pageSize;
        //#endregion

        if (suspendStatus.trim() ==="only-true") 
        {
            //#region only-true
            if (pageNumber=="0") {
                return await tbl_Model.aggregate([
                    { $match: { Is_Suspended: true } },
                    {
                        "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Addons_Title_En": 1,
                        "Addons_Title_Ar": 1,
                        "Addons_Description_En": 1,
                        "Addons_Description_Ar": 1,
                        "Photo_Path":1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                        }
                    }
                ]);
            } else {
                return await tbl_Model.aggregate([
                    { $match: { Is_Suspended: true } },
                    {
                        "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Addons_Title_En": 1,
                        "Addons_Title_Ar": 1,
                        "Addons_Description_En": 1,
                        "Addons_Description_Ar": 1,
                        "Photo_Path":1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                        }
                    }
                ]).skip(skip).limit(pageSize);
            }
            //#endregion
        } 
        else if(suspendStatus.trim() ==="only-false") 
        {
            //#region only-false
            if (pageNumber=="0") {
                return await tbl_Model.aggregate([
                    { $match: { Is_Suspended: false } },
                    {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Addons_Title_En": 1,
                        "Addons_Title_Ar": 1,
                        "Addons_Description_En": 1,
                        "Addons_Description_Ar": 1,
                        "Photo_Path":1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                    }
                    }
                ]);
            } else {
                return await tbl_Model.aggregate([
                    { $match: { Is_Suspended: false } },
                    {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Addons_Title_En": 1,
                        "Addons_Title_Ar": 1,
                        "Addons_Description_En": 1,
                        "Addons_Description_Ar": 1,
                        "Photo_Path":1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                    }
                    }
                ]).skip(skip).limit(pageSize);
            }
            //#endregion            
        } 
        else if(suspendStatus.trim() ==="all") 
        {
            //#region all
            if (pageNumber=="0") {
                return await tbl_Model.aggregate([
                    {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Addons_Title_En": 1,
                        "Addons_Title_Ar": 1,
                        "Addons_Description_En": 1,
                        "Addons_Description_Ar": 1,
                        "Photo_Path":1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                    }
                    }
                ]);
            } else {
                return await tbl_Model.aggregate([
                    {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Addons_Title_En": 1,
                        "Addons_Title_Ar": 1,
                        "Addons_Description_En": 1,
                        "Addons_Description_Ar": 1,
                        "Photo_Path":1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                    }
                    }
                ]).skip(skip).limit(pageSize);
            }
            //#endregion
        } 
        else {
            return "" ;
        }
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};

