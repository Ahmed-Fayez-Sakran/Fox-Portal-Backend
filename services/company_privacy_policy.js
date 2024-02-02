//#region Global Variables
var tbl_Model = require("../models/company_privacy_policy");
const logger = require('../utils/logger');
var loggers_Model = require("../models/logger");
const now_DateTime = require('../helpers/fun_datetime');
//#endregion

exports.get_privacy_policy_By_SuspendStatus = async (suspendStatus,pageNumber) => {
    try {
        //#region Variables
        var val_Returned_Object = "";
        var pageSize = 10 ;
        var skip = (pageNumber - 1) * pageSize;
        //#endregion
        
        if (suspendStatus.trim() ==="only-true") {
            if (pageNumber=="0")
            {
                val_Returned_Object = await tbl_Model.aggregate
                ([
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
                ]);
            }
            else
            {
                val_Returned_Object = await tbl_Model.aggregate
                ([
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
                ]).skip(skip).limit(pageSize);
            }            
        } else if(suspendStatus.trim() ==="only-false") {
            if (pageNumber=="0")
            {
                val_Returned_Object = await tbl_Model.aggregate
                ([
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
                ]);
            }
            else
            {
                val_Returned_Object = await tbl_Model.aggregate
                ([
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
                ]).skip(skip).limit(pageSize);
            }
        } else {
            if (pageNumber=="0")
            {
                val_Returned_Object = await tbl_Model.aggregate
                ([
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
                ]);
            }
            else
            {
                val_Returned_Object = await tbl_Model.aggregate
                ([
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
                ]).skip(skip).limit(pageSize);
            }
        }
        return val_Returned_Object;  
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