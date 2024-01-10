//#region Global Variables
var tbl_Model = ""
var Client_Prices_Log_Model = require("../models/client_prices_log");
var Business_Prices_Log_Model = require("../models/business_prices_log.js");
const now_DateTime = require('../helpers/fun_datetime');
const logger = require('../utils/logger');
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
        val_Returned_Object = await Client_Prices_Log_Model.aggregate
        ([
          {
              $addFields: 
              {
                collectionName: "Client_Prices_Log"
              }
          },
        
          {
              $addFields: 
              {
                "Organization":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "price_type":"General",
              }
          },
        
          { 
            $unionWith: 
            {
              coll: 'Business_Prices_Log',
              pipeline:
              [
                {
                    $addFields: 
                    {
                      collectionName: "Business_Prices_Log"
                    }
                },
                
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
        
                  {$unwind: '$User_Data_Details'},
        
                {
                      $lookup:
                      {
                          from: 'Business_Organizations_LKP',
                          localField: 'User_Data_Details.Business_Organization_ID',
                          foreignField: '_id',
                          as: 'Organization_Details'
                    }
                  },
                  
                  {$unwind: '$Organization_Details'},
        
                {
                    $addFields: 
                    {
                      "Organization":'$Organization_Details.Organization_Title_En',
                    }
                },
        
                {
                    $addFields: 
                    {
                      "price_type":"Business",
                    }
                },
              ]
            } 
          },
        
          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_ID',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
            
            {
                $match:
                {
                    "Is_Suspended": val_Is_Suspended
                }
            },
        
            {
            $project:
            {
              id: "$_id",
              _id:0,
              Serial_Number: 1,
              Sub_Service_ID: 1,
              Vehicle_ID: 1,  
              Daily_Price: 1,
              Weekly_Price: 1,
              Monthly_Price: 1,
              Extra_KM_Price: 1,
              Max_KM_Per_Day: 1,
              Open_Gauge_Price: 1,
              Mini_Price: 1,
              Fixed_KM_Price: 1,
              Fixed_Minute_Price: 1,
              Airport_Fees: 1,
              Is_Fixed_Value: 1,
              Flat_Schedule_Price: 1,
              Fixed_Trip_Price: 1,
              Normal_Hour_Rate_Price: 1,
              Max_KM_Per_Hour: 1,
              Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              //Package_ID:1,
              //Package_Price:1,
        
              Sub_Services_Details:
              {
                id: "$Sub_Services_Details._id",
                Serial_Number: "$Sub_Services_Details.Serial_Number",
                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                Is_Suspended: "$Sub_Services_Details.Is_Suspended",
              },
        
              User_Data_Details: 
              {
                Email: "$User_Data_Details.Email",
                Serial_Number: "$User_Data_Details.Serial_Number",
              },
        
              Organization_Details:
              {
                id: "$Organization_Details._id",
                Serial_Number: "$Organization_Details.Serial_Number",
                Organization_Title_En: "$Organization_Details.Organization_Title_En",
                Organization_Title_Ar: "$Organization_Details.Organization_Title_Ar",
                Is_Reviewed: "$Organization_Details.Is_Reviewed",
                Is_Suspended: "$Organization_Details.Is_Suspended",
              },
        
              "Organization":1,
              "price_type":1,
            }
          },
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Prices_Log_Model.aggregate
        ([
          {
              $addFields: 
              {
                collectionName: "Client_Prices_Log"
              }
          },
        
          {
              $addFields: 
              {
                "Organization":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "price_type":"General",
              }
          },
        
          { 
            $unionWith: 
            {
              coll: 'Business_Prices_Log',
              pipeline:
              [
                {
                    $addFields: 
                    {
                      collectionName: "Business_Prices_Log"
                    }
                },
                
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
        
                  {$unwind: '$User_Data_Details'},
        
                {
                      $lookup:
                      {
                          from: 'Business_Organizations_LKP',
                          localField: 'User_Data_Details.Business_Organization_ID',
                          foreignField: '_id',
                          as: 'Organization_Details'
                    }
                  },
                  
                  {$unwind: '$Organization_Details'},
        
                {
                    $addFields: 
                    {
                      "Organization":'$Organization_Details.Organization_Title_En',
                    }
                },
        
                {
                    $addFields: 
                    {
                      "price_type":"Business",
                    }
                },
              ]
            } 
          },
        
          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_ID',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
            
            {
                $match:
                {
                    "Is_Suspended": val_Is_Suspended
                }
            },
        
            {
            $project:
            {
              id: "$_id",
              _id:0,
              Serial_Number: 1,
              Sub_Service_ID: 1,
              Vehicle_ID: 1,  
              Daily_Price: 1,
              Weekly_Price: 1,
              Monthly_Price: 1,
              Extra_KM_Price: 1,
              Max_KM_Per_Day: 1,
              Open_Gauge_Price: 1,
              Mini_Price: 1,
              Fixed_KM_Price: 1,
              Fixed_Minute_Price: 1,
              Airport_Fees: 1,
              Is_Fixed_Value: 1,
              Flat_Schedule_Price: 1,
              Fixed_Trip_Price: 1,
              Normal_Hour_Rate_Price: 1,
              Max_KM_Per_Hour: 1,
              Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              //Package_ID:1,
              //Package_Price:1,
        
              Sub_Services_Details:
              {
                id: "$Sub_Services_Details._id",
                Serial_Number: "$Sub_Services_Details.Serial_Number",
                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                Is_Suspended: "$Sub_Services_Details.Is_Suspended",
              },
        
              User_Data_Details: 
              {
                Email: "$User_Data_Details.Email",
                Serial_Number: "$User_Data_Details.Serial_Number",
              },
        
              Organization_Details:
              {
                id: "$Organization_Details._id",
                Serial_Number: "$Organization_Details.Serial_Number",
                Organization_Title_En: "$Organization_Details.Organization_Title_En",
                Organization_Title_Ar: "$Organization_Details.Organization_Title_Ar",
                Is_Reviewed: "$Organization_Details.Is_Reviewed",
                Is_Suspended: "$Organization_Details.Is_Suspended",
              },
        
              "Organization":1,
              "price_type":1,
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
        val_Returned_Object = await Client_Prices_Log_Model.aggregate
        ([
          {
              $addFields: 
              {
                collectionName: "Client_Prices_Log"
              }
          },
        
          {
              $addFields: 
              {
                "Organization":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "price_type":"General",
              }
          },
        
          { 
            $unionWith: 
            {
              coll: 'Business_Prices_Log',
              pipeline:
              [
                {
                    $addFields: 
                    {
                      collectionName: "Business_Prices_Log"
                    }
                },
                
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
        
                  {$unwind: '$User_Data_Details'},
        
                {
                      $lookup:
                      {
                          from: 'Business_Organizations_LKP',
                          localField: 'User_Data_Details.Business_Organization_ID',
                          foreignField: '_id',
                          as: 'Organization_Details'
                    }
                  },
                  
                  {$unwind: '$Organization_Details'},
        
                {
                    $addFields: 
                    {
                      "Organization":'$Organization_Details.Organization_Title_En',
                    }
                },
        
                {
                    $addFields: 
                    {
                      "price_type":"Business",
                    }
                },
              ]
            } 
          },
        
          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_ID',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
            
            {
                $match:
                {
                    "Is_Suspended": val_Is_Suspended
                }
            },
        
            {
            $project:
            {
              id: "$_id",
              _id:0,
              Serial_Number: 1,
              Sub_Service_ID: 1,
              Vehicle_ID: 1,  
              Daily_Price: 1,
              Weekly_Price: 1,
              Monthly_Price: 1,
              Extra_KM_Price: 1,
              Max_KM_Per_Day: 1,
              Open_Gauge_Price: 1,
              Mini_Price: 1,
              Fixed_KM_Price: 1,
              Fixed_Minute_Price: 1,
              Airport_Fees: 1,
              Is_Fixed_Value: 1,
              Flat_Schedule_Price: 1,
              Fixed_Trip_Price: 1,
              Normal_Hour_Rate_Price: 1,
              Max_KM_Per_Hour: 1,
              Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              //Package_ID:1,
              //Package_Price:1,
        
              Sub_Services_Details:
              {
                id: "$Sub_Services_Details._id",
                Serial_Number: "$Sub_Services_Details.Serial_Number",
                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                Is_Suspended: "$Sub_Services_Details.Is_Suspended",
              },
        
              User_Data_Details: 
              {
                Email: "$User_Data_Details.Email",
                Serial_Number: "$User_Data_Details.Serial_Number",
              },
        
              Organization_Details:
              {
                id: "$Organization_Details._id",
                Serial_Number: "$Organization_Details.Serial_Number",
                Organization_Title_En: "$Organization_Details.Organization_Title_En",
                Organization_Title_Ar: "$Organization_Details.Organization_Title_Ar",
                Is_Reviewed: "$Organization_Details.Is_Reviewed",
                Is_Suspended: "$Organization_Details.Is_Suspended",
              },
        
              "Organization":1,
              "price_type":1,
            }
          },
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Prices_Log_Model.aggregate
        ([
          {
              $addFields: 
              {
                collectionName: "Client_Prices_Log"
              }
          },
        
          {
              $addFields: 
              {
                "Organization":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "price_type":"General",
              }
          },
        
          { 
            $unionWith: 
            {
              coll: 'Business_Prices_Log',
              pipeline:
              [
                {
                    $addFields: 
                    {
                      collectionName: "Business_Prices_Log"
                    }
                },
                
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
        
                  {$unwind: '$User_Data_Details'},
        
                {
                      $lookup:
                      {
                          from: 'Business_Organizations_LKP',
                          localField: 'User_Data_Details.Business_Organization_ID',
                          foreignField: '_id',
                          as: 'Organization_Details'
                    }
                  },
                  
                  {$unwind: '$Organization_Details'},
        
                {
                    $addFields: 
                    {
                      "Organization":'$Organization_Details.Organization_Title_En',
                    }
                },
        
                {
                    $addFields: 
                    {
                      "price_type":"Business",
                    }
                },
              ]
            } 
          },
        
          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_ID',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
            
            {
                $match:
                {
                    "Is_Suspended": val_Is_Suspended
                }
            },
        
            {
            $project:
            {
              id: "$_id",
              _id:0,
              Serial_Number: 1,
              Sub_Service_ID: 1,
              Vehicle_ID: 1,  
              Daily_Price: 1,
              Weekly_Price: 1,
              Monthly_Price: 1,
              Extra_KM_Price: 1,
              Max_KM_Per_Day: 1,
              Open_Gauge_Price: 1,
              Mini_Price: 1,
              Fixed_KM_Price: 1,
              Fixed_Minute_Price: 1,
              Airport_Fees: 1,
              Is_Fixed_Value: 1,
              Flat_Schedule_Price: 1,
              Fixed_Trip_Price: 1,
              Normal_Hour_Rate_Price: 1,
              Max_KM_Per_Hour: 1,
              Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              //Package_ID:1,
              //Package_Price:1,
        
              Sub_Services_Details:
              {
                id: "$Sub_Services_Details._id",
                Serial_Number: "$Sub_Services_Details.Serial_Number",
                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                Is_Suspended: "$Sub_Services_Details.Is_Suspended",
              },
        
              User_Data_Details: 
              {
                Email: "$User_Data_Details.Email",
                Serial_Number: "$User_Data_Details.Serial_Number",
              },
        
              Organization_Details:
              {
                id: "$Organization_Details._id",
                Serial_Number: "$Organization_Details.Serial_Number",
                Organization_Title_En: "$Organization_Details.Organization_Title_En",
                Organization_Title_Ar: "$Organization_Details.Organization_Title_Ar",
                Is_Reviewed: "$Organization_Details.Is_Reviewed",
                Is_Suspended: "$Organization_Details.Is_Suspended",
              },
        
              "Organization":1,
              "price_type":1,
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
        val_Returned_Object = await Client_Prices_Log_Model.aggregate
        ([
          {
              $addFields: 
              {
                collectionName: "Client_Prices_Log"
              }
          },
        
          {
              $addFields: 
              {
                "Organization":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "price_type":"General",
              }
          },
        
          { 
            $unionWith: 
            {
              coll: 'Business_Prices_Log',
              pipeline:
              [
                {
                    $addFields: 
                    {
                      collectionName: "Business_Prices_Log"
                    }
                },
                
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
        
                  {$unwind: '$User_Data_Details'},
        
                {
                      $lookup:
                      {
                          from: 'Business_Organizations_LKP',
                          localField: 'User_Data_Details.Business_Organization_ID',
                          foreignField: '_id',
                          as: 'Organization_Details'
                    }
                  },
                  
                  {$unwind: '$Organization_Details'},
        
                {
                    $addFields: 
                    {
                      "Organization":'$Organization_Details.Organization_Title_En',
                    }
                },
        
                {
                    $addFields: 
                    {
                      "price_type":"Business",
                    }
                },
              ]
            } 
          },
        
          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_ID',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
                    
            {
            $project:
            {
              id: "$_id",
              _id:0,
              Serial_Number: 1,
              Sub_Service_ID: 1,
              Vehicle_ID: 1,  
              Daily_Price: 1,
              Weekly_Price: 1,
              Monthly_Price: 1,
              Extra_KM_Price: 1,
              Max_KM_Per_Day: 1,
              Open_Gauge_Price: 1,
              Mini_Price: 1,
              Fixed_KM_Price: 1,
              Fixed_Minute_Price: 1,
              Airport_Fees: 1,
              Is_Fixed_Value: 1,
              Flat_Schedule_Price: 1,
              Fixed_Trip_Price: 1,
              Normal_Hour_Rate_Price: 1,
              Max_KM_Per_Hour: 1,
              Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              //Package_ID:1,
              //Package_Price:1,
        
              Sub_Services_Details:
              {
                id: "$Sub_Services_Details._id",
                Serial_Number: "$Sub_Services_Details.Serial_Number",
                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                Is_Suspended: "$Sub_Services_Details.Is_Suspended",
              },
        
              User_Data_Details: 
              {
                Email: "$User_Data_Details.Email",
                Serial_Number: "$User_Data_Details.Serial_Number",
              },
        
              Organization_Details:
              {
                id: "$Organization_Details._id",
                Serial_Number: "$Organization_Details.Serial_Number",
                Organization_Title_En: "$Organization_Details.Organization_Title_En",
                Organization_Title_Ar: "$Organization_Details.Organization_Title_Ar",
                Is_Reviewed: "$Organization_Details.Is_Reviewed",
                Is_Suspended: "$Organization_Details.Is_Suspended",
              },
        
              "Organization":1,
              "price_type":1,
            }
          },
        ]); 
      } 
      else
      {
        val_Returned_Object = await Client_Prices_Log_Model.aggregate
        ([
          {
              $addFields: 
              {
                collectionName: "Client_Prices_Log"
              }
          },
        
          {
              $addFields: 
              {
                "Organization":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "price_type":"General",
              }
          },
        
          { 
            $unionWith: 
            {
              coll: 'Business_Prices_Log',
              pipeline:
              [
                {
                    $addFields: 
                    {
                      collectionName: "Business_Prices_Log"
                    }
                },
                
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
        
                  {$unwind: '$User_Data_Details'},
        
                {
                      $lookup:
                      {
                          from: 'Business_Organizations_LKP',
                          localField: 'User_Data_Details.Business_Organization_ID',
                          foreignField: '_id',
                          as: 'Organization_Details'
                    }
                  },
                  
                  {$unwind: '$Organization_Details'},
        
                {
                    $addFields: 
                    {
                      "Organization":'$Organization_Details.Organization_Title_En',
                    }
                },
        
                {
                    $addFields: 
                    {
                      "price_type":"Business",
                    }
                },
              ]
            } 
          },
        
          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_ID',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
                    
            {
            $project:
            {
              id: "$_id",
              _id:0,
              Serial_Number: 1,
              Sub_Service_ID: 1,
              Vehicle_ID: 1,  
              Daily_Price: 1,
              Weekly_Price: 1,
              Monthly_Price: 1,
              Extra_KM_Price: 1,
              Max_KM_Per_Day: 1,
              Open_Gauge_Price: 1,
              Mini_Price: 1,
              Fixed_KM_Price: 1,
              Fixed_Minute_Price: 1,
              Airport_Fees: 1,
              Is_Fixed_Value: 1,
              Flat_Schedule_Price: 1,
              Fixed_Trip_Price: 1,
              Normal_Hour_Rate_Price: 1,
              Max_KM_Per_Hour: 1,
              Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              //Package_ID:1,
              //Package_Price:1,
        
              Sub_Services_Details:
              {
                id: "$Sub_Services_Details._id",
                Serial_Number: "$Sub_Services_Details.Serial_Number",
                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                Is_Suspended: "$Sub_Services_Details.Is_Suspended",
              },
        
              User_Data_Details: 
              {
                Email: "$User_Data_Details.Email",
                Serial_Number: "$User_Data_Details.Serial_Number",
              },
        
              Organization_Details:
              {
                id: "$Organization_Details._id",
                Serial_Number: "$Organization_Details.Serial_Number",
                Organization_Title_En: "$Organization_Details.Organization_Title_En",
                Organization_Title_Ar: "$Organization_Details.Organization_Title_Ar",
                Is_Reviewed: "$Organization_Details.Is_Reviewed",
                Is_Suspended: "$Organization_Details.Is_Suspended",
              },
        
              "Organization":1,
              "price_type":1,
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