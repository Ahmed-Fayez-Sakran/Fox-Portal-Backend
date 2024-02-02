//#region Global Variables
var tbl_Model = ""
var Client_Services_With_Addons_Prices_Log_Model = require("../models/client_services_with_addons_prices_log");
var Business_Services_With_Addons_Prices_Log_Model = require("../models/business_services_with_addons_prices_log");
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
      val_Is_Suspended = true
      if (pageNumber=="0")
      {
        val_Returned_Object = await Client_Services_With_Addons_Prices_Log_Model.aggregate
        ([
          {
              $addFields:
              {
                  collectionName: "Client_Services_With_Addons_Prices_Log",
                  "User":"N/A",
                  "Type":"General",
              }
          },
      
          {
              $unionWith:
              {
                  coll: 'Business_Services_With_Addons_Prices_Log',
                  pipeline:
                  [
                                  
                      {
                          $lookup:
                          {
                              from: 'User_Data',
                              localField: 'User_ID',
                              foreignField: '_id',
                              as: 'User_Data_Details'
                          }
                      },
                      {
                          $match:
                          {
                              "User_Data_Details.Is_Business": true
                          }
                      },
                      { $unwind: '$User_Data_Details' },
      
                      {
                          $lookup:
                          {
                              from: 'Business_Organizations_LKP',
                              localField: 'User_Data_Details.Business_Organization_ID',
                              foreignField: '_id',
                              as: 'Organization_Details'
                          }
                      },
      
                      { $unwind: '$Organization_Details' },
      
                      {
                          $addFields:
                          {
                              collectionName: "Business_Services_With_Addons_Prices_Log",
                              "User":'$Organization_Details.Organization_Title_En',
                              "Type":"Business",
                          }
                      },
      
                  ]
              }
          },
      
          { $match: { Is_Suspended: true } },
      
          {
              $addFields: 
              {
                  Daily_Price: "$Daily_Price",
                  Weekly_Price: "$Weekly_Price",
                  Monthly_Price: "$Monthly_Price",
                  Fixed_Price: "$Fixed_Price",
                  Price_In_Doha: "$Price_In_Doha",
                  Price_Out_Doha: "$Price_Out_Doha",
                  Inserted_By: "$Inserted_By",
                  Inserted_DateTime: "$Inserted_DateTime",
                  Updated_By: "$Updated_By",
                  Updated_DateTime: "$Updated_DateTime",
                  Is_Suspended: "$Is_Suspended",
              }
          },
      
          {
              $lookup:
              {
                  from: 'Services_With_Addons',
                  localField: 'Services_With_Addons_ID',
                  foreignField: '_id',
                  as: 'Services_With_Addons_Details'
              }
          },
          {$unwind: "$Services_With_Addons_Details",},
      
          {
              $lookup:
              {
                  from: 'Addons_LKP',
                  localField: 'Services_With_Addons_Details.Addons_ID',
                  foreignField: '_id',
                  as: 'Addons_LKP_Details'
              }
          },
          {$unwind: "$Addons_LKP_Details",},
      
          {
              $lookup:
              {
                  from: 'Sub_Services_LKP',
                  localField: 'Services_With_Addons_Details.Sub_Service_ID',
                  foreignField: '_id',
                  as: 'Sub_Services_Details'
              }
          },
          {$unwind: "$Sub_Services_Details",},
      
          {
              $project:
              {
                  _id:0,
                  id: "$_id",
                  Serial_Number: 1,
      
                  Sub_Services_Details:
                  {
                      Serial_Number: "$Sub_Services_Details.Serial_Number",
                      Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                      Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                      Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                      Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                  },
              
                  Addons_LKP_Details:
                  {
                      Serial_Number: "$Addons_LKP_Details.Serial_Number",
                      Addons_Title_En: "$Addons_LKP_Details.Addons_Title_En",
                      Addons_Title_Ar: "$Addons_LKP_Details.Addons_Title_Ar",
                      Addons_Description_En: "$Addons_LKP_Details.Addons_Description_En",
                      Addons_Description_Ar: "$Addons_LKP_Details.Addons_Description_Ar",
                      Photo_Path: "$Addons_LKP_Details.Photo_Path",
                      Is_Suspended: "$Addons_LKP_Details.Is_Suspended",
                  },
      
                  Daily_Price: 1,
                  Weekly_Price: 1,
                  Monthly_Price: 1,
                  Fixed_Price: 1,
                  Price_In_Doha: 1,
                  Price_Out_Doha: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
                  collectionName: 1,
                  User:1,
                  Type:1,
              }
          },
      
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Services_With_Addons_Prices_Log_Model.aggregate
        ([
          {
              $addFields:
              {
                  collectionName: "Client_Services_With_Addons_Prices_Log",
                  "User":"N/A",
                  "Type":"General",
              }
          },
      
          {
              $unionWith:
              {
                  coll: 'Business_Services_With_Addons_Prices_Log',
                  pipeline:
                  [
                                  
                      {
                          $lookup:
                          {
                              from: 'User_Data',
                              localField: 'User_ID',
                              foreignField: '_id',
                              as: 'User_Data_Details'
                          }
                      },
                      {
                          $match:
                          {
                              "User_Data_Details.Is_Business": true
                          }
                      },
                      { $unwind: '$User_Data_Details' },
      
                      {
                          $lookup:
                          {
                              from: 'Business_Organizations_LKP',
                              localField: 'User_Data_Details.Business_Organization_ID',
                              foreignField: '_id',
                              as: 'Organization_Details'
                          }
                      },
      
                      { $unwind: '$Organization_Details' },
      
                      {
                          $addFields:
                          {
                              collectionName: "Business_Services_With_Addons_Prices_Log",
                              "User":'$Organization_Details.Organization_Title_En',
                              "Type":"Business",
                          }
                      },
      
                  ]
              }
          },
      
          { $match: { Is_Suspended: true } },
      
          {
              $addFields: 
              {
                  Daily_Price: "$Daily_Price",
                  Weekly_Price: "$Weekly_Price",
                  Monthly_Price: "$Monthly_Price",
                  Fixed_Price: "$Fixed_Price",
                  Price_In_Doha: "$Price_In_Doha",
                  Price_Out_Doha: "$Price_Out_Doha",
                  Inserted_By: "$Inserted_By",
                  Inserted_DateTime: "$Inserted_DateTime",
                  Updated_By: "$Updated_By",
                  Updated_DateTime: "$Updated_DateTime",
                  Is_Suspended: "$Is_Suspended",
              }
          },
      
          {
              $lookup:
              {
                  from: 'Services_With_Addons',
                  localField: 'Services_With_Addons_ID',
                  foreignField: '_id',
                  as: 'Services_With_Addons_Details'
              }
          },
          {$unwind: "$Services_With_Addons_Details",},
      
          {
              $lookup:
              {
                  from: 'Addons_LKP',
                  localField: 'Services_With_Addons_Details.Addons_ID',
                  foreignField: '_id',
                  as: 'Addons_LKP_Details'
              }
          },
          {$unwind: "$Addons_LKP_Details",},
      
          {
              $lookup:
              {
                  from: 'Sub_Services_LKP',
                  localField: 'Services_With_Addons_Details.Sub_Service_ID',
                  foreignField: '_id',
                  as: 'Sub_Services_Details'
              }
          },
          {$unwind: "$Sub_Services_Details",},
      
          {
              $project:
              {
                  _id:0,
                  id: "$_id",
                  Serial_Number: 1,
      
                  Sub_Services_Details:
                  {
                      Serial_Number: "$Sub_Services_Details.Serial_Number",
                      Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                      Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                      Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                      Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                  },
              
                  Addons_LKP_Details:
                  {
                      Serial_Number: "$Addons_LKP_Details.Serial_Number",
                      Addons_Title_En: "$Addons_LKP_Details.Addons_Title_En",
                      Addons_Title_Ar: "$Addons_LKP_Details.Addons_Title_Ar",
                      Addons_Description_En: "$Addons_LKP_Details.Addons_Description_En",
                      Addons_Description_Ar: "$Addons_LKP_Details.Addons_Description_Ar",
                      Photo_Path: "$Addons_LKP_Details.Photo_Path",
                      Is_Suspended: "$Addons_LKP_Details.Is_Suspended",
                  },
      
                  Daily_Price: 1,
                  Weekly_Price: 1,
                  Monthly_Price: 1,
                  Fixed_Price: 1,
                  Price_In_Doha: 1,
                  Price_Out_Doha: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
                  collectionName: 1,
                  User:1,
                  Type:1,
              }
          },
      
        ]).skip(skip).limit(pageSize);
      }      
      return val_Returned_Object;
    }
    else if(suspendStatus.trim()==="only-false")
    {
      val_Is_Suspended = false
      if (pageNumber=="0")
      {
        val_Returned_Object = await Client_Services_With_Addons_Prices_Log_Model.aggregate
        ([
          {
              $addFields:
              {
                  collectionName: "Client_Services_With_Addons_Prices_Log",
                  "User":"N/A",
                  "Type":"General",
              }
          },
      
          {
              $unionWith:
              {
                  coll: 'Business_Services_With_Addons_Prices_Log',
                  pipeline:
                  [
                                  
                      {
                          $lookup:
                          {
                              from: 'User_Data',
                              localField: 'User_ID',
                              foreignField: '_id',
                              as: 'User_Data_Details'
                          }
                      },
                      {
                          $match:
                          {
                              "User_Data_Details.Is_Business": true
                          }
                      },
                      { $unwind: '$User_Data_Details' },
      
                      {
                          $lookup:
                          {
                              from: 'Business_Organizations_LKP',
                              localField: 'User_Data_Details.Business_Organization_ID',
                              foreignField: '_id',
                              as: 'Organization_Details'
                          }
                      },
      
                      { $unwind: '$Organization_Details' },
      
                      {
                          $addFields:
                          {
                              collectionName: "Business_Services_With_Addons_Prices_Log",
                              "User":'$Organization_Details.Organization_Title_En',
                              "Type":"Business",
                          }
                      },
      
                  ]
              }
          },
      
          { $match: { Is_Suspended: false } },
      
          {
              $addFields: 
              {
                  Daily_Price: "$Daily_Price",
                  Weekly_Price: "$Weekly_Price",
                  Monthly_Price: "$Monthly_Price",
                  Fixed_Price: "$Fixed_Price",
                  Price_In_Doha: "$Price_In_Doha",
                  Price_Out_Doha: "$Price_Out_Doha",
                  Inserted_By: "$Inserted_By",
                  Inserted_DateTime: "$Inserted_DateTime",
                  Updated_By: "$Updated_By",
                  Updated_DateTime: "$Updated_DateTime",
                  Is_Suspended: "$Is_Suspended",
              }
          },
      
          {
              $lookup:
              {
                  from: 'Services_With_Addons',
                  localField: 'Services_With_Addons_ID',
                  foreignField: '_id',
                  as: 'Services_With_Addons_Details'
              }
          },
          {$unwind: "$Services_With_Addons_Details",},
      
          {
              $lookup:
              {
                  from: 'Addons_LKP',
                  localField: 'Services_With_Addons_Details.Addons_ID',
                  foreignField: '_id',
                  as: 'Addons_LKP_Details'
              }
          },
          {$unwind: "$Addons_LKP_Details",},
      
          {
              $lookup:
              {
                  from: 'Sub_Services_LKP',
                  localField: 'Services_With_Addons_Details.Sub_Service_ID',
                  foreignField: '_id',
                  as: 'Sub_Services_Details'
              }
          },
          {$unwind: "$Sub_Services_Details",},
      
          {
              $project:
              {
                  _id:0,
                  id: "$_id",
                  Serial_Number: 1,
      
                  Sub_Services_Details:
                  {
                      Serial_Number: "$Sub_Services_Details.Serial_Number",
                      Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                      Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                      Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                      Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                  },
              
                  Addons_LKP_Details:
                  {
                      Serial_Number: "$Addons_LKP_Details.Serial_Number",
                      Addons_Title_En: "$Addons_LKP_Details.Addons_Title_En",
                      Addons_Title_Ar: "$Addons_LKP_Details.Addons_Title_Ar",
                      Addons_Description_En: "$Addons_LKP_Details.Addons_Description_En",
                      Addons_Description_Ar: "$Addons_LKP_Details.Addons_Description_Ar",
                      Photo_Path: "$Addons_LKP_Details.Photo_Path",
                      Is_Suspended: "$Addons_LKP_Details.Is_Suspended",
                  },
      
                  Daily_Price: 1,
                  Weekly_Price: 1,
                  Monthly_Price: 1,
                  Fixed_Price: 1,
                  Price_In_Doha: 1,
                  Price_Out_Doha: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
                  collectionName: 1,
                  User:1,
                  Type:1,
              }
          },
      
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Services_With_Addons_Prices_Log_Model.aggregate
        ([
          {
              $addFields:
              {
                  collectionName: "Client_Services_With_Addons_Prices_Log",
                  "User":"N/A",
                  "Type":"General",
              }
          },
      
          {
              $unionWith:
              {
                  coll: 'Business_Services_With_Addons_Prices_Log',
                  pipeline:
                  [
                                  
                      {
                          $lookup:
                          {
                              from: 'User_Data',
                              localField: 'User_ID',
                              foreignField: '_id',
                              as: 'User_Data_Details'
                          }
                      },
                      {
                          $match:
                          {
                              "User_Data_Details.Is_Business": true
                          }
                      },
                      { $unwind: '$User_Data_Details' },
      
                      {
                          $lookup:
                          {
                              from: 'Business_Organizations_LKP',
                              localField: 'User_Data_Details.Business_Organization_ID',
                              foreignField: '_id',
                              as: 'Organization_Details'
                          }
                      },
      
                      { $unwind: '$Organization_Details' },
      
                      {
                          $addFields:
                          {
                              collectionName: "Business_Services_With_Addons_Prices_Log",
                              "User":'$Organization_Details.Organization_Title_En',
                              "Type":"Business",
                          }
                      },
      
                  ]
              }
          },
      
          { $match: { Is_Suspended: false } },
      
          {
              $addFields: 
              {
                  Daily_Price: "$Daily_Price",
                  Weekly_Price: "$Weekly_Price",
                  Monthly_Price: "$Monthly_Price",
                  Fixed_Price: "$Fixed_Price",
                  Price_In_Doha: "$Price_In_Doha",
                  Price_Out_Doha: "$Price_Out_Doha",
                  Inserted_By: "$Inserted_By",
                  Inserted_DateTime: "$Inserted_DateTime",
                  Updated_By: "$Updated_By",
                  Updated_DateTime: "$Updated_DateTime",
                  Is_Suspended: "$Is_Suspended",
              }
          },
      
          {
              $lookup:
              {
                  from: 'Services_With_Addons',
                  localField: 'Services_With_Addons_ID',
                  foreignField: '_id',
                  as: 'Services_With_Addons_Details'
              }
          },
          {$unwind: "$Services_With_Addons_Details",},
      
          {
              $lookup:
              {
                  from: 'Addons_LKP',
                  localField: 'Services_With_Addons_Details.Addons_ID',
                  foreignField: '_id',
                  as: 'Addons_LKP_Details'
              }
          },
          {$unwind: "$Addons_LKP_Details",},
      
          {
              $lookup:
              {
                  from: 'Sub_Services_LKP',
                  localField: 'Services_With_Addons_Details.Sub_Service_ID',
                  foreignField: '_id',
                  as: 'Sub_Services_Details'
              }
          },
          {$unwind: "$Sub_Services_Details",},
      
          {
              $project:
              {
                  _id:0,
                  id: "$_id",
                  Serial_Number: 1,
      
                  Sub_Services_Details:
                  {
                      Serial_Number: "$Sub_Services_Details.Serial_Number",
                      Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                      Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                      Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                      Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                  },
              
                  Addons_LKP_Details:
                  {
                      Serial_Number: "$Addons_LKP_Details.Serial_Number",
                      Addons_Title_En: "$Addons_LKP_Details.Addons_Title_En",
                      Addons_Title_Ar: "$Addons_LKP_Details.Addons_Title_Ar",
                      Addons_Description_En: "$Addons_LKP_Details.Addons_Description_En",
                      Addons_Description_Ar: "$Addons_LKP_Details.Addons_Description_Ar",
                      Photo_Path: "$Addons_LKP_Details.Photo_Path",
                      Is_Suspended: "$Addons_LKP_Details.Is_Suspended",
                  },
      
                  Daily_Price: 1,
                  Weekly_Price: 1,
                  Monthly_Price: 1,
                  Fixed_Price: 1,
                  Price_In_Doha: 1,
                  Price_Out_Doha: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
                  collectionName: 1,
                  User:1,
                  Type:1,
              }
          },
      
        ]).skip(skip).limit(pageSize);
      }
      return val_Returned_Object;
    }
    else if(suspendStatus.trim()==="all")
    {
      if (pageNumber=="0")
      {
        val_Returned_Object = await Client_Services_With_Addons_Prices_Log_Model.aggregate
        ([
          {
              $addFields:
              {
                  collectionName: "Client_Services_With_Addons_Prices_Log",
                  "User":"N/A",
                  "Type":"General",
              }
          },
      
          {
              $unionWith:
              {
                  coll: 'Business_Services_With_Addons_Prices_Log',
                  pipeline:
                  [
                                  
                      {
                          $lookup:
                          {
                              from: 'User_Data',
                              localField: 'User_ID',
                              foreignField: '_id',
                              as: 'User_Data_Details'
                          }
                      },
                      {
                          $match:
                          {
                              "User_Data_Details.Is_Business": true
                          }
                      },
                      { $unwind: '$User_Data_Details' },
      
                      {
                          $lookup:
                          {
                              from: 'Business_Organizations_LKP',
                              localField: 'User_Data_Details.Business_Organization_ID',
                              foreignField: '_id',
                              as: 'Organization_Details'
                          }
                      },
      
                      { $unwind: '$Organization_Details' },
      
                      {
                          $addFields:
                          {
                              collectionName: "Business_Services_With_Addons_Prices_Log",
                              "User":'$Organization_Details.Organization_Title_En',
                              "Type":"Business",
                          }
                      },
      
                  ]
              }
          },
      
          {
              $addFields: 
              {
                  Daily_Price: "$Daily_Price",
                  Weekly_Price: "$Weekly_Price",
                  Monthly_Price: "$Monthly_Price",
                  Fixed_Price: "$Fixed_Price",
                  Price_In_Doha: "$Price_In_Doha",
                  Price_Out_Doha: "$Price_Out_Doha",
                  Inserted_By: "$Inserted_By",
                  Inserted_DateTime: "$Inserted_DateTime",
                  Updated_By: "$Updated_By",
                  Updated_DateTime: "$Updated_DateTime",
                  Is_Suspended: "$Is_Suspended",
              }
          },
      
          {
              $lookup:
              {
                  from: 'Services_With_Addons',
                  localField: 'Services_With_Addons_ID',
                  foreignField: '_id',
                  as: 'Services_With_Addons_Details'
              }
          },
          {$unwind: "$Services_With_Addons_Details",},
      
          {
              $lookup:
              {
                  from: 'Addons_LKP',
                  localField: 'Services_With_Addons_Details.Addons_ID',
                  foreignField: '_id',
                  as: 'Addons_LKP_Details'
              }
          },
          {$unwind: "$Addons_LKP_Details",},
      
          {
              $lookup:
              {
                  from: 'Sub_Services_LKP',
                  localField: 'Services_With_Addons_Details.Sub_Service_ID',
                  foreignField: '_id',
                  as: 'Sub_Services_Details'
              }
          },
          {$unwind: "$Sub_Services_Details",},
      
          {
              $project:
              {
                  _id:0,
                  id: "$_id",
                  Serial_Number: 1,
      
                  Sub_Services_Details:
                  {
                      Serial_Number: "$Sub_Services_Details.Serial_Number",
                      Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                      Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                      Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                      Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                  },
              
                  Addons_LKP_Details:
                  {
                      Serial_Number: "$Addons_LKP_Details.Serial_Number",
                      Addons_Title_En: "$Addons_LKP_Details.Addons_Title_En",
                      Addons_Title_Ar: "$Addons_LKP_Details.Addons_Title_Ar",
                      Addons_Description_En: "$Addons_LKP_Details.Addons_Description_En",
                      Addons_Description_Ar: "$Addons_LKP_Details.Addons_Description_Ar",
                      Photo_Path: "$Addons_LKP_Details.Photo_Path",
                      Is_Suspended: "$Addons_LKP_Details.Is_Suspended",
                  },
      
                  Daily_Price: 1,
                  Weekly_Price: 1,
                  Monthly_Price: 1,
                  Fixed_Price: 1,
                  Price_In_Doha: 1,
                  Price_Out_Doha: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
                  collectionName: 1,
                  User:1,
                  Type:1,
              }
          },
      
        ]); 
      } 
      else
      {
        val_Returned_Object = await Client_Services_With_Addons_Prices_Log_Model.aggregate
        ([
          {
              $addFields:
              {
                  collectionName: "Client_Services_With_Addons_Prices_Log",
                  "User":"N/A",
                  "Type":"General",
              }
          },
      
          {
              $unionWith:
              {
                  coll: 'Business_Services_With_Addons_Prices_Log',
                  pipeline:
                  [
                                  
                      {
                          $lookup:
                          {
                              from: 'User_Data',
                              localField: 'User_ID',
                              foreignField: '_id',
                              as: 'User_Data_Details'
                          }
                      },
                      {
                          $match:
                          {
                              "User_Data_Details.Is_Business": true
                          }
                      },
                      { $unwind: '$User_Data_Details' },
      
                      {
                          $lookup:
                          {
                              from: 'Business_Organizations_LKP',
                              localField: 'User_Data_Details.Business_Organization_ID',
                              foreignField: '_id',
                              as: 'Organization_Details'
                          }
                      },
      
                      { $unwind: '$Organization_Details' },
      
                      {
                          $addFields:
                          {
                              collectionName: "Business_Services_With_Addons_Prices_Log",
                              "User":'$Organization_Details.Organization_Title_En',
                              "Type":"Business",
                          }
                      },
      
                  ]
              }
          },
      
          {
              $addFields: 
              {
                  Daily_Price: "$Daily_Price",
                  Weekly_Price: "$Weekly_Price",
                  Monthly_Price: "$Monthly_Price",
                  Fixed_Price: "$Fixed_Price",
                  Price_In_Doha: "$Price_In_Doha",
                  Price_Out_Doha: "$Price_Out_Doha",
                  Inserted_By: "$Inserted_By",
                  Inserted_DateTime: "$Inserted_DateTime",
                  Updated_By: "$Updated_By",
                  Updated_DateTime: "$Updated_DateTime",
                  Is_Suspended: "$Is_Suspended",
              }
          },
      
          {
              $lookup:
              {
                  from: 'Services_With_Addons',
                  localField: 'Services_With_Addons_ID',
                  foreignField: '_id',
                  as: 'Services_With_Addons_Details'
              }
          },
          {$unwind: "$Services_With_Addons_Details",},
      
          {
              $lookup:
              {
                  from: 'Addons_LKP',
                  localField: 'Services_With_Addons_Details.Addons_ID',
                  foreignField: '_id',
                  as: 'Addons_LKP_Details'
              }
          },
          {$unwind: "$Addons_LKP_Details",},
      
          {
              $lookup:
              {
                  from: 'Sub_Services_LKP',
                  localField: 'Services_With_Addons_Details.Sub_Service_ID',
                  foreignField: '_id',
                  as: 'Sub_Services_Details'
              }
          },
          {$unwind: "$Sub_Services_Details",},
      
          {
              $project:
              {
                  _id:0,
                  id: "$_id",
                  Serial_Number: 1,
      
                  Sub_Services_Details:
                  {
                      Serial_Number: "$Sub_Services_Details.Serial_Number",
                      Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                      Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                      Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                      Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                  },
              
                  Addons_LKP_Details:
                  {
                      Serial_Number: "$Addons_LKP_Details.Serial_Number",
                      Addons_Title_En: "$Addons_LKP_Details.Addons_Title_En",
                      Addons_Title_Ar: "$Addons_LKP_Details.Addons_Title_Ar",
                      Addons_Description_En: "$Addons_LKP_Details.Addons_Description_En",
                      Addons_Description_Ar: "$Addons_LKP_Details.Addons_Description_Ar",
                      Photo_Path: "$Addons_LKP_Details.Photo_Path",
                      Is_Suspended: "$Addons_LKP_Details.Is_Suspended",
                  },
      
                  Daily_Price: 1,
                  Weekly_Price: 1,
                  Monthly_Price: 1,
                  Fixed_Price: 1,
                  Price_In_Doha: 1,
                  Price_Out_Doha: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
                  collectionName: 1,
                  User:1,
                  Type:1,
              }
          },
      
        ]).skip(skip).limit(pageSize); 
      }      
      return val_Returned_Object;
    }
    else 
    {
      return val_Returned_Object;
    }   

  } catch (err) {
    logger.error(err.message);
  }     
};

exports.check_Price_Existancy = async (val_Table_Name , val_User_ID , val_Services_With_Addons_ID )=> {

  try {
    const return_Data = [];
    let itemsCount = ""

    if (val_Table_Name=="business_services_with_addons_prices_log")
    {
      //#region business_services_with_addons_prices_log
        tbl_Model = require("../models/business_services_with_addons_prices_log");
        itemsCount = await tbl_Model.find({
          $and:
          [
            { Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID) },
            { User_ID: new ObjectId(val_User_ID) },
            { Is_Suspended: false}
          ]
        });
        //#endregion
    }
    else if (val_Table_Name=="client_services_with_addons_prices_log")
    {
      //#region client_services_with_addons_prices_log
      tbl_Model = require("../models/client_services_with_addons_prices_log");
      itemsCount = await tbl_Model.find({
        $and:
        [
          { Services_With_Addons_ID: new ObjectId(val_Services_With_Addons_ID) },
          { Is_Suspended: false}
        ]
      });
      //#endregion
    }
    
    if (itemsCount.length<=0) {
      return_Data[0]= "";
      return_Data[1]= false;
    } else {
      return_Data[0]= itemsCount[0]._id;
      return_Data[1]= true;
    }
    console.log("return_Data = "+return_Data)
    return return_Data;

  } catch (err) {
    logger.error(err.message);
  }

};

exports.create_Single_DataRow = async (val_Table_Name , row_Object) => {
//   try {
//     //#region Define Models
//     if (val_Table_Name=="client_prices_log") {
//       tbl_Model = require("../models/client_prices_log");
//     } 
//     else if (val_Table_Name=="business_prices_log") {
//       tbl_Model = require("../models/business_prices_log");
//     }
//     //#endregion
    
//     return await tbl_Model.create(row_Object);
//   } catch (err) {
//     logger.error(err.message);
//   }
};

exports.update_DataRow = async (val_Table_Name , id , tblObject) => {
  try {
    //#region Define Models
    if (val_Table_Name=="client_services_with_addons_prices_log") {
      tbl_Model = require("../models/client_services_with_addons_prices_log");
    } 
    else if (val_Table_Name=="business_services_with_addons_prices_log") {
      tbl_Model = require("../models/business_services_with_addons_prices_log");
    }
    //#endregion
    
    return await tbl_Model.findByIdAndUpdate(id, tblObject);
  } catch (error) {
    logger.error(err.message);
  }
};

exports.create_Many_DataRows = async (val_Table_Name , DataRows_Collection) => {
  try {
    //#region Define Models
    if (val_Table_Name=="client_services_with_addons_prices_log") { 
      tbl_Model = require("../models/client_services_with_addons_prices_log");
    }
    else if (val_Table_Name=="business_services_with_addons_prices_log") {
      tbl_Model = require("../models/business_services_with_addons_prices_log");
    }
    //#endregion
    return await tbl_Model.insertMany(DataRows_Collection);
  } catch (err) {console.log(err.message)
    logger.error(err.message);
  }
};

exports.Suspend_Many_DataRows = async (val_Table_Name , Rows_ID_To_Suspend , val_Inserted_By , val_now_DateTime) => {
  try {
    //#region Define Models
    if (val_Table_Name=="client_services_with_addons_prices_log") { 
      tbl_Model = require("../models/client_services_with_addons_prices_log");
    }
    else if (val_Table_Name=="business_services_with_addons_prices_log") {
      tbl_Model = require("../models/business_services_with_addons_prices_log");
    }
    //#endregion
    return await tbl_Model.updateMany
    (
      { 
        $and: [
          { Is_Suspended: false },
          { _id: { $in: Rows_ID_To_Suspend } }
        ]
      },

      {"$set":{"Updated_DateTime": val_now_DateTime , "Is_Suspended": true , "Updated_By":val_Inserted_By }}

    );

  } catch (err) {
    logger.error(err.message);
  }
};

exports.updateMany_DataRows = async (status, data , Updated_By , lkp_Table_Name) => {
    try {
        var val_IDs = data;
        var Updated_DateTime =now_DateTime.get_DateTime()
    
        //#region Define Models
        if (lkp_Table_Name=="client_services_with_addons_prices_log") { 
            tbl_Model = require("../models/client_services_with_addons_prices_log");
        }
        else if (lkp_Table_Name=="business_services_with_addons_prices_log") {
            tbl_Model = require("../models/business_services_with_addons_prices_log");
        }
        
        else {
            return"";
        }
        //#endregion
      
        console.log("val_IDs = "+val_IDs)
        //console.log("status = "+status)

        if (status=="activate") {
            
            return await tbl_Model.updateMany(
            { 
                $and: [
                { Is_Suspended: true },
                { _id: { $in: val_IDs } }
                ]
            }, 
            { $set: { Is_Suspended: false , Updated_By:Updated_By , Updated_DateTime:Updated_DateTime }}
            )
    
        } else {// status=="suspend"
            return await tbl_Model.updateMany(
            { 
                $and: [
                { Is_Suspended: false },
                { _id: { $in: val_IDs } }
                ]
            }, 
            { $set: { Is_Suspended: true , Updated_By:Updated_By , Updated_DateTime:Updated_DateTime }}
            )
    
        }
    } catch (error) {
      console.log(error.message);
    }
  
};

