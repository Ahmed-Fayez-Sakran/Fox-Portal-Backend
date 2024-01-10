//#region Global Variables
var tbl_Model = require("../models/trip_type_lkp");
const now_DateTime = require('../helpers/fun_datetime');
const logger = require('../utils/logger');
//#endregion

exports.get_Data_By_SuspendStatus = async (suspendStatus) => {
    try {
        var tbl_Object = ""

        if (suspendStatus.trim() ==="only-true") {
            tbl_Object = await tbl_Model.aggregate
            ([
                { $match: { Is_Suspended: true } },
                {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Type_Title_En": 1,
                        "Type_Title_Ar": 1,
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
            tbl_Object = await tbl_Model.aggregate
            ([
                { $match: { Is_Suspended: false } },
                {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Type_Title_En": 1,
                        "Type_Title_Ar": 1,
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
            tbl_Object = await tbl_Model.aggregate
            ([
                {
                    "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Type_Title_En": 1,
                        "Type_Title_Ar": 1,
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

