//#region Global Variables
var tbl_Model = require("../models/rent_period");
const now_DateTime = require('../helpers/fun_datetime');
const logger = require('../utils/logger');
const ObjectId = require('mongodb').ObjectId;
//#endregion

exports.get_Data_By_SuspendStatus = async (suspendStatus,pageNumber) => {
  try {
    //#region Variables
    var val_Is_Suspended = "";
    var val_Returned_Object = "";
    var pageSize = 10 ;
    var skip = (pageNumber - 1) * pageSize;
    //#endregion

    if (suspendStatus.trim()==="only-true") 
    {
      //#region only-true
      val_Is_Suspended = true
      if (pageNumber=="0")
      {
        val_Returned_Object = await tbl_Model.aggregate
        ([
            { $match: { Is_Suspended: true } },
            {
              "$project": 
              {
                "id": "$_id",
                "Serial_Number": 1,
                "Period_Ar": 1,
                "Period_En": 1,
                "Start_Range_Per_Day": 1,
                "End_Range_Per_Day": 1,
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
              "$project": 
              {
                "id": "$_id",
                "Serial_Number": 1,
                "Period_Ar": 1,
                "Period_En": 1,
                "Start_Range_Per_Day": 1,
                "End_Range_Per_Day": 1,
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
    else if(suspendStatus.trim()==="only-false")
    {
      //#region only-false
      val_Is_Suspended = false
      if (pageNumber=="0")
      {
        val_Returned_Object = await tbl_Model.aggregate
        ([
            { $match: { Is_Suspended: false } },
            {
              "$project": 
              {
                "id": "$_id",
                "Serial_Number": 1,
                "Period_Ar": 1,
                "Period_En": 1,
                "Start_Range_Per_Day": 1,
                "End_Range_Per_Day": 1,
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
              "$project": 
              {
                "id": "$_id",
                "Serial_Number": 1,
                "Period_Ar": 1,
                "Period_En": 1,
                "Start_Range_Per_Day": 1,
                "End_Range_Per_Day": 1,
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
    else if(suspendStatus.trim()==="all")
    {
      //#region all
      if (pageNumber=="0")
      {
        val_Returned_Object = await tbl_Model.aggregate
        ([
            {
              "$project": 
              {
                "id": "$_id",
                "Serial_Number": 1,
                "Period_Ar": 1,
                "Period_En": 1,
                "Start_Range_Per_Day": 1,
                "End_Range_Per_Day": 1,
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
              "$project": 
              {
                "id": "$_id",
                "Serial_Number": 1,
                "Period_Ar": 1,
                "Period_En": 1,
                "Start_Range_Per_Day": 1,
                "End_Range_Per_Day": 1,
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
    else 
    {
        val_Returned_Object = "";
    }
    
    return val_Returned_Object;

  } catch (err) {
    logger.error(err.message);
  }     
};

