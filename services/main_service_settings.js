//#region Global Variables
var tbl_Model = require("../models/main_services_lkp");
const now_DateTime = require('../helpers/fun_datetime');
var ObjectId = require('mongodb').ObjectId;
const logger = require('../utils/logger');
//#endregion

exports.get_Data_By_SuspendStatus = async (suspendStatus) => {
    try {
        var tbl_Object = ""

        if (suspendStatus.trim() ==="only-true") {
            tbl_Object = await tbl_Model.aggregate([
                { $match: { Is_Suspended: true } },
                {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Service_Title_En": 1,
                        "Service_Title_Ar": 1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                    }
                }
            ]) ;
        } else if(suspendStatus.trim() ==="only-false") {
            tbl_Object = await tbl_Model.aggregate([
                { $match: { Is_Suspended: false } },
                {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Service_Title_En": 1,
                        "Service_Title_Ar": 1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                    }
                }
            ]) ;
        } else if(suspendStatus.trim() ==="all")  {
            tbl_Object = await tbl_Model.aggregate([
                {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Service_Title_En": 1,
                        "Service_Title_Ar": 1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                    }
                }
            ]) ;
        }else {
            return "" ;
        }
        
        return tbl_Object;

    } catch (err) {
        logger.error(err.message);
    }
     
};

exports.Update_SuspendStatus_SubServices_In_Main_Service = async (val_Is_Suspended,val_Main_Service_Id) => {

    try 
    { 
        tbl_Model = require("../models/sub_services_lkp");

        return await tbl_Model.updateMany(
            { 
                Main_Service_Id:  new ObjectId(val_Main_Service_Id)
            },
            { $set: { Updated_DateTime : now_DateTime.get_DateTime() , Is_Suspended : val_Is_Suspended }}
          );

    } catch (error) {
        logger.error(error.message);
    }
     
};

exports.Update_SuspendStatus_SubServices_In_Main_Services = async (val_Is_Suspended,val_Array_IDs) => {

    try 
    { 
        tbl_Model = require("../models/sub_services_lkp");

        return await tbl_Model.updateMany(
            {
                Main_Service_Id:  { $in: val_Array_IDs }
            },
            { $set: { Updated_DateTime : now_DateTime.get_DateTime() , Is_Suspended : val_Is_Suspended }}
          );

    } catch (error) {
        logger.error(error.message);
    }
     
};