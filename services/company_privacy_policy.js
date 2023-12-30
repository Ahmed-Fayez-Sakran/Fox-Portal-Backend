//#region Global Variables
var tbl_Model = require("../models/company_privacy_policy");
const logger = require('../utils/logger');
var loggers_Model = require("../models/logger");
const now_DateTime = require('../helpers/fun_datetime');
//#endregion

exports.get_privacy_policy_By_SuspendStatus = async (suspendStatus) => {
    try {
        if (suspendStatus.trim() ==="only-true") {
            return await tbl_Model.aggregate([
                { $match: { Is_Suspended: true } },
                {
                    "$project": {
                    "id": "$_id",
                    "Serial_Number": 1,
                    "Policy_Title_En": 1,
                    "Policy_Title_Ar": 1,
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
            return await tbl_Model.aggregate([
                { $match: { Is_Suspended: false } },
                {
                    "$project": {
                    "id": "$_id",
                    "Serial_Number": 1,
                    "Policy_Title_En": 1,
                    "Policy_Title_Ar": 1,
                    "Inserted_By": 1,
                    "Inserted_DateTime": 1,
                    "Updated_By": 1,
                    "Updated_DateTime": 1,
                    "Is_Suspended": 1,
                    "_id": 0
                    }
                }
            ]) ;
        } else {
            return await tbl_Model.aggregate([
                {
                    "$project": {
                    "id": "$_id",
                    "Serial_Number": 1,
                    "Policy_Title_En": 1,
                    "Policy_Title_Ar": 1,
                    "Inserted_By": 1,
                    "Inserted_DateTime": 1,
                    "Updated_By": 1,
                    "Updated_DateTime": 1,
                    "Is_Suspended": 1,
                    "_id": 0
                    }
                }
            ]) ;
        } 
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }     
};

exports.get_Last_privacy_policy = async () => {
    try {
        var item = await tbl_Model.find().sort({ _id: -1 }).limit(1);
        if (item.length<=0) {
            return false;
        } else {
            return item;
        }
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};