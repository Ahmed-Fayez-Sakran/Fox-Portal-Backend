//#region Global Variables
var tbl_Model = require("../models/promo_code_data");
const now_DateTime = require('../helpers/fun_datetime');
const logger = require('../utils/logger');
const ObjectId = require('mongodb').ObjectId;
//#endregion


exports.get_Data_By_SuspendStatus = async (suspendStatus,pageNumber) => {
    try {  
      //#region Variables
      var val_Returned_Object = "";
      var pageSize = 10 ;
      var skip = (pageNumber - 1) * pageSize;
      //#endregion
  
      //#region suspendStatus Cases
      if (suspendStatus.trim()==="only-true")
      {
        if (pageNumber=="0")
        {
            val_Returned_Object = await tbl_Model.aggregate
            ([
                { $match: { Is_Suspended: true } },
                {
                    "$project": {
                    "id": "$_id",
                    "Serial_Number": 1,
                    "Code": 1,
                    "Title_En": 1,
                    "Title_Ar": 1,
                    "Percentage_Rate": 1,
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
                "Code": 1,
                "Title_En": 1,
                "Title_Ar": 1,
                "Percentage_Rate": 1,
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
      else if(suspendStatus.trim()==="only-false")
      {
        if (pageNumber=="0")
        {
            val_Returned_Object = await tbl_Model.aggregate
            ([
                { $match: { Is_Suspended: false } },
                {
                    "$project": {
                    "id": "$_id",
                    "Serial_Number": 1,
                    "Code": 1,
                    "Title_En": 1,
                    "Title_Ar": 1,
                    "Percentage_Rate": 1,
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
                "Code": 1,
                "Title_En": 1,
                "Title_Ar": 1,
                "Percentage_Rate": 1,
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
      else if(suspendStatus.trim()==="all")
      {
        if (pageNumber=="0")
        {
            val_Returned_Object = await tbl_Model.aggregate
            ([
                {
                    "$project": {
                    "id": "$_id",
                    "Serial_Number": 1,
                    "Code": 1,
                    "Title_En": 1,
                    "Title_Ar": 1,
                    "Percentage_Rate": 1,
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
                "Code": 1,
                "Title_En": 1,
                "Title_Ar": 1,
                "Percentage_Rate": 1,
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
      else
      {
        val_Returned_Object="";
      }
      //#endregion
  
      return val_Returned_Object;
  
    } catch (err) {
      logger.error(err.message);
    }     
};

exports.check_Existancy = async (val_Operation  , val_Id , val_Code  , val_Title_En , val_Title_Ar , val_Percentage_Rate) => {
    try {
      if (val_Operation=="insert")
      {
        //#region insert
        return await tbl_Model.find
        ({
          $and:
          [
            {Code: val_Code},
            {Title_En: val_Title_En},
            {Title_Ar: val_Title_Ar},
            {Percentage_Rate: val_Percentage_Rate},
          ]      
        });
        //#endregion
      }
      else
      {
        //#region update
        return await tbl_Model.find
        ({
          $and:
          [
            {Code: val_Code},
            {Title_En: val_Title_En},
            {Title_Ar: val_Title_Ar},
            {Percentage_Rate: val_Percentage_Rate},
            {'_id': {$ne : new ObjectId(val_Id)}}
          ]      
        });
        //#endregion
      }
      
  
    } catch (error) {
        logger.error(error.message);
    }
};

