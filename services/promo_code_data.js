//#region Global Variables
var tbl_Model = require("../models/promo_code_data");
const now_DateTime = require('../helpers/fun_datetime');
const logger = require('../utils/logger');
const ObjectId = require('mongodb').ObjectId;
var Updated_DateTime =now_DateTime.get_DateTime()
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

exports.check_Code_Existancy = async (val_Operation  , val_Id , val_Code) => {
  try {
    if (val_Operation=="insert")
    {
      //#region insert
      return await tbl_Model.find({Code: val_Code});
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
          {'_id': {$ne : new ObjectId(val_Id)}}
        ]      
      });
      //#endregion
    }
  } catch (error) {
    logger.error(error.message);
  }
};

exports.check_Title_En_Existancy = async (val_Operation  , val_Id , val_Title_En) => {
  try {
    if (val_Operation=="insert")
    {
      //#region insert
      return await tbl_Model.find({Title_En: val_Title_En});
      //#endregion
    }
    else
    {
      //#region update
      return await tbl_Model.find
      ({
        $and:
        [
          {Title_En: val_Title_En},
          {'_id': {$ne : new ObjectId(val_Id)}}
        ]      
      });
      //#endregion
    }
  } catch (error) {
    logger.error(error.message);
  }
};

exports.check_Title_Ar_Existancy = async (val_Operation  , val_Id , val_Title_Ar) => {
  try {
    if (val_Operation=="insert")
    {
      //#region insert
      return await tbl_Model.find({Title_Ar: val_Title_Ar});
      //#endregion
    }
    else
    {
      //#region update
      return await tbl_Model.find
      ({
        $and:
        [
          {Title_Ar: val_Title_Ar},
          {'_id': {$ne : new ObjectId(val_Id)}}
        ]      
      });
      //#endregion
    }
  } catch (error) {
    logger.error(error.message);
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
            // {Title_En: val_Title_En},
            // {Title_Ar: val_Title_Ar},
            // {Percentage_Rate: val_Percentage_Rate},
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

exports.update_Suspend_Status = async (val_Promo_Code_ID, lkp_Table_Name  , val_Updated_By , val_Is_Suspended) => {

  try {

    var loaded_Model = "";
    //#region Define Models
    if (lkp_Table_Name=="client_promo_code_log") {
      loaded_Model = require("../models/client_promo_code_log");
    }
    else if (lkp_Table_Name=="business_promo_code_log") {
      loaded_Model = require("../models/business_promo_code_log");
    }
    //#endregion

    return await loaded_Model.updateMany(
      { Promo_Code_ID: new ObjectId(val_Promo_Code_ID) },
      { $set: { Is_Suspended: val_Is_Suspended , Updated_By:val_Updated_By , Updated_DateTime:Updated_DateTime }}
    );

  } catch (error) {
    logger.error(error.message);
}

};

exports.update_Suspend_Status_Many_Rows = async (data, lkp_Table_Name  , val_Updated_By , status) => {

  try {
    var val_IDs = data;
    var val_Is_Suspended = false;
    //#region Define Models
    var loaded_Model = "";
    if (lkp_Table_Name=="client_promo_code_log") {
      loaded_Model = require("../models/client_promo_code_log");
    }
    else if (lkp_Table_Name=="business_promo_code_log") {
      loaded_Model = require("../models/business_promo_code_log");
    }
    //#endregion
    //#region Set Suspended
    if (status=="activate") {
      val_Is_Suspended = false;
    }
    else{
      val_Is_Suspended = true;
    }
    //#endregion
    
    console.log("lkp_Table_Name= "+lkp_Table_Name)
    console.log("val_IDs= "+val_IDs)
    console.log("val_Is_Suspended= "+val_Is_Suspended)
    
    return await loaded_Model.updateMany(
      { Promo_Code_ID: { $in: val_IDs } },
      { $set: { Is_Suspended: val_Is_Suspended , Updated_By:val_Updated_By , Updated_DateTime:Updated_DateTime }}
    );

  } catch (error) {
    logger.error(error.message);
  }

};

exports.get_Data_By_SuspendStatus_Type = async (suspendStatus,pageNumber) => {
  try {  
    //#region Variables
    var Client_Promo_Code_Log_model = require("../models/client_promo_code_log");
    var Business_Promo_Code_Log_model = require("../models/business_promo_code_log");
    var val_Returned_Object = "";
    var pageSize = 10 ;
    var skip = (pageNumber - 1) * pageSize;
    //#endregion

    //#region suspendStatus Cases
    if (suspendStatus.trim()==="only-true")
    {
      if (pageNumber=="0")
      {
          val_Returned_Object = await Business_Promo_Code_Log_model.aggregate
          ([
            {
              $lookup: 
              {
                from: "User_Data",
                localField: "User_ID",
                foreignField: "_id",
                as: "User_Data_Details",
              },
            },
            {
              $match: 
              {
                "User_Data_Details.Is_Business": true,
              },
            },
            {
              $unwind: "$User_Data_Details",
            },
            {
              $lookup: 
              {
                from: "Business_Organizations_LKP",
                localField:"User_Data_Details.Business_Organization_ID",
                foreignField: "_id",
                as: "Organization_Details",
              },
            },
            {
              $addFields: 
              {
                collectionName: "Business_Promo_Code_Log",
                Organization:"$Organization_Details.Organization_Title_En",
                type: "Business",
              },
            },
            {
              $unwind: "$Organization_Details",
            },
            {
              $unionWith: 
              {
                coll: "Client_Promo_Code_Log",
                pipeline: 
                [
                  {
                    $addFields: 
                    {
                      collectionName:"Client_Promo_Code_Log",
                      Organization: "N/A",
                      type: "General",
                    },
                  },
                ],
              },
            },
            
          
            { $match: { Is_Suspended: true } },
            {
              $addFields: {
                Is_Suspended: "$Is_Suspended",
              }
            },
          
          
            {
              $lookup: 
              {
                from: "Promo_Code_Data",
                localField: "Promo_Code_ID",
                foreignField: "_id",
                as: "Promo_Code_Data",
              },
            },
            {
              $unwind: "$Promo_Code_Data",
            },
            {
              $lookup: 
              {
                from: "Sub_Services_LKP",
                localField: "Sub_Service_ID",
                foreignField: "_id",
                as: "Sub_Services_Details",
              },
            },
            {
              $unwind: "$Sub_Services_Details",
            },
            {
              $project: 
              {
                id: "$_id",
                _id: 0,
                Serial_Number: 1,
                Code: "$Promo_Code_Data.Code",
                Title_En: "$Promo_Code_Data.Title_En",
                Title_Ar: "$Promo_Code_Data.Title_Ar",
                Percentage_Rate:"$Promo_Code_Data.Percentage_Rate",
                Inserted_By: "$Promo_Code_Data.Inserted_By",
                Inserted_DateTime:"$Promo_Code_Data.Inserted_DateTime",
                Updated_By: "$Promo_Code_Data.Updated_By",
                Updated_DateTime:"$Promo_Code_Data.Updated_DateTime",
                Sub_Services_Details: 
                {
                  id: "$Sub_Services_Details._id",
                  Serial_Number:"$Sub_Services_Details.Serial_Number",
                  Sub_Service_Title_En:"$Sub_Services_Details.Sub_Service_Title_En",
                  Sub_Service_Title_Ar:"$Sub_Services_Details.Sub_Service_Title_Ar",
                  Main_Service_Id:"$Sub_Services_Details.Main_Service_Id",
                  Is_Suspended:"$Sub_Services_Details.Is_Suspended",
                },
                Sub_Service_ID: 1,
                Promo_Code_ID: 1,
                Start_Date: 1,
                End_Date: 1,
                Duration_Per_Days: 1,
                collectionName: 1,
                Organization: 1,
                type: 1,
                Is_Suspended:1,
              },
            },
          ]);
      }
      else
      {
        val_Returned_Object = await Business_Promo_Code_Log_model.aggregate
        ([
          {
            $lookup: 
            {
              from: "User_Data",
              localField: "User_ID",
              foreignField: "_id",
              as: "User_Data_Details",
            },
          },
          {
            $match: 
            {
              "User_Data_Details.Is_Business": true,
            },
          },
          {
            $unwind: "$User_Data_Details",
          },
          {
            $lookup: 
            {
              from: "Business_Organizations_LKP",
              localField:"User_Data_Details.Business_Organization_ID",
              foreignField: "_id",
              as: "Organization_Details",
            },
          },
          {
            $addFields: 
            {
              collectionName: "Business_Promo_Code_Log",
              Organization:"$Organization_Details.Organization_Title_En",
              type: "Business",
            },
          },
          {
            $unwind: "$Organization_Details",
          },
          {
            $unionWith: 
            {
              coll: "Client_Promo_Code_Log",
              pipeline: 
              [
                {
                  $addFields: 
                  {
                    collectionName:"Client_Promo_Code_Log",
                    Organization: "N/A",
                    type: "General",
                  },
                },
              ],
            },
          },
          
        
          { $match: { Is_Suspended: true } },
          {
            $addFields: {
              Is_Suspended: "$Is_Suspended",
            }
          },
        
        
          {
            $lookup: 
            {
              from: "Promo_Code_Data",
              localField: "Promo_Code_ID",
              foreignField: "_id",
              as: "Promo_Code_Data",
            },
          },
          {
            $unwind: "$Promo_Code_Data",
          },
          {
            $lookup: 
            {
              from: "Sub_Services_LKP",
              localField: "Sub_Service_ID",
              foreignField: "_id",
              as: "Sub_Services_Details",
            },
          },
          {
            $unwind: "$Sub_Services_Details",
          },
          {
            $project: 
            {
              id: "$_id",
              _id: 0,
              Serial_Number: 1,
              Code: "$Promo_Code_Data.Code",
              Title_En: "$Promo_Code_Data.Title_En",
              Title_Ar: "$Promo_Code_Data.Title_Ar",
              Percentage_Rate:"$Promo_Code_Data.Percentage_Rate",
              Inserted_By: "$Promo_Code_Data.Inserted_By",
              Inserted_DateTime:"$Promo_Code_Data.Inserted_DateTime",
              Updated_By: "$Promo_Code_Data.Updated_By",
              Updated_DateTime:"$Promo_Code_Data.Updated_DateTime",
              Sub_Services_Details: 
              {
                id: "$Sub_Services_Details._id",
                Serial_Number:"$Sub_Services_Details.Serial_Number",
                Sub_Service_Title_En:"$Sub_Services_Details.Sub_Service_Title_En",
                Sub_Service_Title_Ar:"$Sub_Services_Details.Sub_Service_Title_Ar",
                Main_Service_Id:"$Sub_Services_Details.Main_Service_Id",
                Is_Suspended:"$Sub_Services_Details.Is_Suspended",
              },
              Sub_Service_ID: 1,
              Promo_Code_ID: 1,
              Start_Date: 1,
              End_Date: 1,
              Duration_Per_Days: 1,
              collectionName: 1,
              Organization: 1,
              type: 1,
              Is_Suspended:1,
            },
          },
        ]).skip(skip).limit(pageSize);
      }
    }
    else if(suspendStatus.trim()==="only-false")
    {
      if (pageNumber=="0")
      {
          val_Returned_Object = await Business_Promo_Code_Log_model.aggregate
          ([
            {
              $lookup: 
              {
                from: "User_Data",
                localField: "User_ID",
                foreignField: "_id",
                as: "User_Data_Details",
              },
            },
            {
              $match: 
              {
                "User_Data_Details.Is_Business": true,
              },
            },
            {
              $unwind: "$User_Data_Details",
            },
            {
              $lookup: 
              {
                from: "Business_Organizations_LKP",
                localField:"User_Data_Details.Business_Organization_ID",
                foreignField: "_id",
                as: "Organization_Details",
              },
            },
            {
              $addFields: 
              {
                collectionName: "Business_Promo_Code_Log",
                Organization:"$Organization_Details.Organization_Title_En",
                type: "Business",
              },
            },
            {
              $unwind: "$Organization_Details",
            },
            {
              $unionWith: 
              {
                coll: "Client_Promo_Code_Log",
                pipeline: 
                [
                  {
                    $addFields: 
                    {
                      collectionName:"Client_Promo_Code_Log",
                      Organization: "N/A",
                      type: "General",
                    },
                  },
                ],
              },
            },
            
          
            { $match: { Is_Suspended: false } },
            {
              $addFields: {
                Is_Suspended: "$Is_Suspended",
              }
            },
          
          
            {
              $lookup: 
              {
                from: "Promo_Code_Data",
                localField: "Promo_Code_ID",
                foreignField: "_id",
                as: "Promo_Code_Data",
              },
            },
            {
              $unwind: "$Promo_Code_Data",
            },
            {
              $lookup: 
              {
                from: "Sub_Services_LKP",
                localField: "Sub_Service_ID",
                foreignField: "_id",
                as: "Sub_Services_Details",
              },
            },
            {
              $unwind: "$Sub_Services_Details",
            },
            {
              $project: 
              {
                id: "$_id",
                _id: 0,
                Serial_Number: 1,
                Code: "$Promo_Code_Data.Code",
                Title_En: "$Promo_Code_Data.Title_En",
                Title_Ar: "$Promo_Code_Data.Title_Ar",
                Percentage_Rate:"$Promo_Code_Data.Percentage_Rate",
                Inserted_By: "$Promo_Code_Data.Inserted_By",
                Inserted_DateTime:"$Promo_Code_Data.Inserted_DateTime",
                Updated_By: "$Promo_Code_Data.Updated_By",
                Updated_DateTime:"$Promo_Code_Data.Updated_DateTime",
                Sub_Services_Details: 
                {
                  id: "$Sub_Services_Details._id",
                  Serial_Number:"$Sub_Services_Details.Serial_Number",
                  Sub_Service_Title_En:"$Sub_Services_Details.Sub_Service_Title_En",
                  Sub_Service_Title_Ar:"$Sub_Services_Details.Sub_Service_Title_Ar",
                  Main_Service_Id:"$Sub_Services_Details.Main_Service_Id",
                  Is_Suspended:"$Sub_Services_Details.Is_Suspended",
                },
                Sub_Service_ID: 1,
                Promo_Code_ID: 1,
                Start_Date: 1,
                End_Date: 1,
                Duration_Per_Days: 1,
                collectionName: 1,
                Organization: 1,
                type: 1,
                Is_Suspended:1,
              },
            },
          ]);
      }
      else
      {
        val_Returned_Object = await Business_Promo_Code_Log_model.aggregate
        ([
          {
            $lookup: 
            {
              from: "User_Data",
              localField: "User_ID",
              foreignField: "_id",
              as: "User_Data_Details",
            },
          },
          {
            $match: 
            {
              "User_Data_Details.Is_Business": true,
            },
          },
          {
            $unwind: "$User_Data_Details",
          },
          {
            $lookup: 
            {
              from: "Business_Organizations_LKP",
              localField:"User_Data_Details.Business_Organization_ID",
              foreignField: "_id",
              as: "Organization_Details",
            },
          },
          {
            $addFields: 
            {
              collectionName: "Business_Promo_Code_Log",
              Organization:"$Organization_Details.Organization_Title_En",
              type: "Business",
            },
          },
          {
            $unwind: "$Organization_Details",
          },
          {
            $unionWith: 
            {
              coll: "Client_Promo_Code_Log",
              pipeline: 
              [
                {
                  $addFields: 
                  {
                    collectionName:"Client_Promo_Code_Log",
                    Organization: "N/A",
                    type: "General",
                  },
                },
              ],
            },
          },
          
        
          { $match: { Is_Suspended: false } },
          {
            $addFields: {
              Is_Suspended: "$Is_Suspended",
            }
          },
        
        
          {
            $lookup: 
            {
              from: "Promo_Code_Data",
              localField: "Promo_Code_ID",
              foreignField: "_id",
              as: "Promo_Code_Data",
            },
          },
          {
            $unwind: "$Promo_Code_Data",
          },
          {
            $lookup: 
            {
              from: "Sub_Services_LKP",
              localField: "Sub_Service_ID",
              foreignField: "_id",
              as: "Sub_Services_Details",
            },
          },
          {
            $unwind: "$Sub_Services_Details",
          },
          {
            $project: 
            {
              id: "$_id",
              _id: 0,
              Serial_Number: 1,
              Code: "$Promo_Code_Data.Code",
              Title_En: "$Promo_Code_Data.Title_En",
              Title_Ar: "$Promo_Code_Data.Title_Ar",
              Percentage_Rate:"$Promo_Code_Data.Percentage_Rate",
              Inserted_By: "$Promo_Code_Data.Inserted_By",
              Inserted_DateTime:"$Promo_Code_Data.Inserted_DateTime",
              Updated_By: "$Promo_Code_Data.Updated_By",
              Updated_DateTime:"$Promo_Code_Data.Updated_DateTime",
              Sub_Services_Details: 
              {
                id: "$Sub_Services_Details._id",
                Serial_Number:"$Sub_Services_Details.Serial_Number",
                Sub_Service_Title_En:"$Sub_Services_Details.Sub_Service_Title_En",
                Sub_Service_Title_Ar:"$Sub_Services_Details.Sub_Service_Title_Ar",
                Main_Service_Id:"$Sub_Services_Details.Main_Service_Id",
                Is_Suspended:"$Sub_Services_Details.Is_Suspended",
              },
              Sub_Service_ID: 1,
              Promo_Code_ID: 1,
              Start_Date: 1,
              End_Date: 1,
              Duration_Per_Days: 1,
              collectionName: 1,
              Organization: 1,
              type: 1,
              Is_Suspended:1,
            },
          },
        ]).skip(skip).limit(pageSize);
      }
    }
    else if(suspendStatus.trim()==="all")
    {
      if (pageNumber=="0")
      { 
          val_Returned_Object = await Business_Promo_Code_Log_model.aggregate
          ([
            {
              $lookup: 
              {
                from: "User_Data",
                localField: "User_ID",
                foreignField: "_id",
                as: "User_Data_Details",
              },
            },
            {
              $match: 
              {
                "User_Data_Details.Is_Business": true,
              },
            },
            {
              $unwind: "$User_Data_Details",
            },
            {
              $lookup: 
              {
                from: "Business_Organizations_LKP",
                localField:"User_Data_Details.Business_Organization_ID",
                foreignField: "_id",
                as: "Organization_Details",
              },
            },
            {
              $addFields: 
              {
                collectionName: "Business_Promo_Code_Log",
                Organization:"$Organization_Details.Organization_Title_En",
                type: "Business",
              },
            },
            {
              $unwind: "$Organization_Details",
            },
            {
              $unionWith: 
              {
                coll: "Client_Promo_Code_Log",
                pipeline: 
                [
                  {
                    $addFields: 
                    {
                      collectionName:"Client_Promo_Code_Log",
                      Organization: "N/A",
                      type: "General",
                    },
                  },
                ],
              },
            },
            
          
            {
              $addFields: 
              {
                Is_Suspended: "$Is_Suspended",
              }
            },
          
          
            {
              $lookup: 
              {
                from: "Promo_Code_Data",
                localField: "Promo_Code_ID",
                foreignField: "_id",
                as: "Promo_Code_Data",
              },
            },
            {
              $unwind: "$Promo_Code_Data",
            },
            {
              $lookup: 
              {
                from: "Sub_Services_LKP",
                localField: "Sub_Service_ID",
                foreignField: "_id",
                as: "Sub_Services_Details",
              },
            },
            {
              $unwind: "$Sub_Services_Details",
            },
            {
              $project: 
              {
                id: "$_id",
                _id: 0,
                Serial_Number: 1,
                Code: "$Promo_Code_Data.Code",
                Title_En: "$Promo_Code_Data.Title_En",
                Title_Ar: "$Promo_Code_Data.Title_Ar",
                Percentage_Rate:"$Promo_Code_Data.Percentage_Rate",
                Inserted_By: "$Promo_Code_Data.Inserted_By",
                Inserted_DateTime:"$Promo_Code_Data.Inserted_DateTime",
                Updated_By: "$Promo_Code_Data.Updated_By",
                Updated_DateTime:"$Promo_Code_Data.Updated_DateTime",
                Sub_Services_Details: 
                {
                  id: "$Sub_Services_Details._id",
                  Serial_Number:"$Sub_Services_Details.Serial_Number",
                  Sub_Service_Title_En:"$Sub_Services_Details.Sub_Service_Title_En",
                  Sub_Service_Title_Ar:"$Sub_Services_Details.Sub_Service_Title_Ar",
                  Main_Service_Id:"$Sub_Services_Details.Main_Service_Id",
                  Is_Suspended:"$Sub_Services_Details.Is_Suspended",
                },
                Sub_Service_ID: 1,
                Promo_Code_ID: 1,
                Start_Date: 1,
                End_Date: 1,
                Duration_Per_Days: 1,
                collectionName: 1,
                Organization: 1,
                type: 1,
                Is_Suspended:1,
              },
            },
          ]);
          console.log("here !! "+val_Returned_Object)
      }
      else
      {
          val_Returned_Object = await Business_Promo_Code_Log_model.aggregate
          ([
            {
              $lookup: 
              {
                from: "User_Data",
                localField: "User_ID",
                foreignField: "_id",
                as: "User_Data_Details",
              },
            },
            {
              $match: 
              {
                "User_Data_Details.Is_Business": true,
              },
            },
            {
              $unwind: "$User_Data_Details",
            },
            {
              $lookup: 
              {
                from: "Business_Organizations_LKP",
                localField:"User_Data_Details.Business_Organization_ID",
                foreignField: "_id",
                as: "Organization_Details",
              },
            },
            {
              $addFields: 
              {
                collectionName: "Business_Promo_Code_Log",
                Organization:"$Organization_Details.Organization_Title_En",
                type: "Business",
              },
            },
            {
              $unwind: "$Organization_Details",
            },
            {
              $unionWith: 
              {
                coll: "Client_Promo_Code_Log",
                pipeline: 
                [
                  {
                    $addFields: 
                    {
                      collectionName:"Client_Promo_Code_Log",
                      Organization: "N/A",
                      type: "General",
                    },
                  },
                ],
              },
            },
            
          
            {
              $addFields: {
                Is_Suspended: "$Is_Suspended",
              }
            },
          
          
            {
              $lookup: 
              {
                from: "Promo_Code_Data",
                localField: "Promo_Code_ID",
                foreignField: "_id",
                as: "Promo_Code_Data",
              },
            },
            {
              $unwind: "$Promo_Code_Data",
            },
            {
              $lookup: 
              {
                from: "Sub_Services_LKP",
                localField: "Sub_Service_ID",
                foreignField: "_id",
                as: "Sub_Services_Details",
              },
            },
            {
              $unwind: "$Sub_Services_Details",
            },
            {
              $project: 
              {
                id: "$_id",
                _id: 0,
                Serial_Number: 1,
                Code: "$Promo_Code_Data.Code",
                Title_En: "$Promo_Code_Data.Title_En",
                Title_Ar: "$Promo_Code_Data.Title_Ar",
                Percentage_Rate:"$Promo_Code_Data.Percentage_Rate",
                Inserted_By: "$Promo_Code_Data.Inserted_By",
                Inserted_DateTime:"$Promo_Code_Data.Inserted_DateTime",
                Updated_By: "$Promo_Code_Data.Updated_By",
                Updated_DateTime:"$Promo_Code_Data.Updated_DateTime",
                Sub_Services_Details: 
                {
                  id: "$Sub_Services_Details._id",
                  Serial_Number:"$Sub_Services_Details.Serial_Number",
                  Sub_Service_Title_En:"$Sub_Services_Details.Sub_Service_Title_En",
                  Sub_Service_Title_Ar:"$Sub_Services_Details.Sub_Service_Title_Ar",
                  Main_Service_Id:"$Sub_Services_Details.Main_Service_Id",
                  Is_Suspended:"$Sub_Services_Details.Is_Suspended",
                },
                Sub_Service_ID: 1,
                Promo_Code_ID: 1,
                Start_Date: 1,
                End_Date: 1,
                Duration_Per_Days: 1,
                collectionName: 1,
                Organization: 1,
                type: 1,
                Is_Suspended:1,
              },
            },
          ]).skip(skip).limit(pageSize);
      }
    }
    else
    {
      val_Returned_Object="";
    }
    //#endregion
console.log("val_Returned_Object = "+val_Returned_Object)
    return val_Returned_Object;

  } catch (err) {
    logger.error(err.message);
  }     
};


exports.check_Promo_Code_Log_Existancy = async (val_type , val_Operation ,val_Id , val_Sub_Service_ID , val_Promo_Code_ID , val_User_ID )  => {
  
  try { 

    if (val_type=="business") {
      //#region business
      var Business_Promo_Code_Log_Model = require("../models/business_promo_code_log");
      if (val_Operation=="insert")
      {
        //#region insert
        return await Business_Promo_Code_Log_Model.find
        ({
          $and:
          [
            {Sub_Service_ID: new ObjectId(val_Sub_Service_ID)},
            {Promo_Code_ID: new ObjectId(val_Promo_Code_ID)},
            {User_ID:new ObjectId(val_User_ID)},
          ]      
        });
        //#endregion
      }
      else
      {
        //#region update
        return await Business_Promo_Code_Log_Model.find
        ({
          $and:
          [
            {Sub_Service_ID: new ObjectId(val_Sub_Service_ID)},
            {Promo_Code_ID: new ObjectId(val_Promo_Code_ID)},
            {User_ID:new ObjectId(val_User_ID)},
            {'_id': {$ne : new ObjectId(val_Id)}},
          ]      
        });
        //#endregion
      }
      //#endregion
    } else {
      //#region client
      var Client_Promo_Code_Log_Model = require("../models/client_promo_code_log");
      if (val_Operation=="insert")
      {
        //#region insert
        return await Client_Promo_Code_Log_Model.find
        ({
          $and:
          [
            {Sub_Service_ID: new ObjectId(val_Sub_Service_ID)},
            {Promo_Code_ID: new ObjectId(val_Promo_Code_ID)},
          ]      
        });
        //#endregion
      }
      else
      {
        //#region update
        return await Client_Promo_Code_Log_Model.find
        ({
          $and:
          [
            {Sub_Service_ID: new ObjectId(val_Sub_Service_ID)},
            {Promo_Code_ID: new ObjectId(val_Promo_Code_ID)},
            {'_id': {$ne : new ObjectId(val_Id)}},
          ]      
        });
        //#endregion
      }
      //#endregion
    }

  } catch (err) {
    logger.error(err.message);
  }

};


