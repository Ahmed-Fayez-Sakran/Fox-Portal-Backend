//#region Global Variables
var tbl_Model = require("../models/vehicles_data");
var Client_Vehicles_Advance_Notice_Period_Log_Model = require("../models/client_vehicles_advance_notice_period_log");
var Business_Vehicles_Advance_Notice_Period_Log_Model = require("../models/business_vehicles_advance_notice_period_log");
var User_Data_Model = require("../models/user_data");
var Business_Organizations_LKP_Model = require("../models/business_organizations_lkp");
var Vehicles_Data_Model = require("../models/vehicles_data");
var Sub_Services_LKP_Model = require("../models/sub_services_lkp");
var Model_LKP_Model = require("../models/model_lkp");
var Brand_Name_LKP_Model = require("../models/brand_name_lkp");
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
        val_Returned_Object = await Client_Vehicles_Advance_Notice_Period_Log_Model.aggregate
        ([

          {
              $addFields: 
              {
                collectionName: "Client_Vehicles_Advance_Notice_Period_Log"
              }
          },
        
          {
              $addFields: 
              {
                "User":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "Type":"General",
              }
          },
        
          {
                $match:
                {
                    "Is_Suspended": true
                }
            },
        
            {
              $unionWith:
              {
                coll: 'Business_Vehicles_Advance_Notice_Period_Log',
                pipeline:
                [
                  {
                    $addFields: 
                    {
                      collectionName: "Business_Vehicles_Advance_Notice_Period_Log"
                    }
                },
        
                {
                    $addFields: 
                    {
                      "Type":"Business",
                    }
                },
        
                {
                      $match:
                      {
                          "Is_Suspended": true
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
                      "User":'$Organization_Details.Organization_Title_En',
                    }
                },				
                ]
              }
            },
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_ID',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Model_LKP',
                    localField: 'Vehicles_Data_Details.Model_ID',
                    foreignField: '_id',
                    as: 'Model_LKP_Details'
                }
            },
            { $unwind: '$Model_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Brand_Name_LKP',
                    localField: 'Model_LKP_Details.Brand_ID',
                    foreignField: '_id',
                    as: 'Brand_Name_LKP_Details'
                }
            },
            { $unwind: '$Brand_Name_LKP_Details' },
        
          {
                $project:
                {
                    _id:0,
        
                    Serial_Number:1,
                    Notice_Period_Per_Hours:1,
                    Vehicle_ID: "$Vehicles_Data_Details._id",
        
                    Model_ID: "$Model_LKP_Details._id",
                    Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                    Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                    Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
        
                    Brand_ID: "$Brand_Name_LKP_Details._id",
                    Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                    Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                    Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
        
                    Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              User:1,
              Type:1,
        
                }
            },
        
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Vehicles_Advance_Notice_Period_Log_Model.aggregate
        ([

          {
              $addFields: 
              {
                collectionName: "Client_Vehicles_Advance_Notice_Period_Log"
              }
          },
        
          {
              $addFields: 
              {
                "User":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "Type":"General",
              }
          },
        
          {
                $match:
                {
                    "Is_Suspended": true
                }
            },
        
            {
              $unionWith:
              {
                coll: 'Business_Vehicles_Advance_Notice_Period_Log',
                pipeline:
                [
                  {
                    $addFields: 
                    {
                      collectionName: "Business_Vehicles_Advance_Notice_Period_Log"
                    }
                },
        
                {
                    $addFields: 
                    {
                      "Type":"Business",
                    }
                },
        
                {
                      $match:
                      {
                          "Is_Suspended": true
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
                      "User":'$Organization_Details.Organization_Title_En',
                    }
                },				
                ]
              }
            },
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_ID',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Model_LKP',
                    localField: 'Vehicles_Data_Details.Model_ID',
                    foreignField: '_id',
                    as: 'Model_LKP_Details'
                }
            },
            { $unwind: '$Model_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Brand_Name_LKP',
                    localField: 'Model_LKP_Details.Brand_ID',
                    foreignField: '_id',
                    as: 'Brand_Name_LKP_Details'
                }
            },
            { $unwind: '$Brand_Name_LKP_Details' },
        
          {
                $project:
                {
                    _id:0,
        
                    Serial_Number:1,
                    Notice_Period_Per_Hours:1,
                    Vehicle_ID: "$Vehicles_Data_Details._id",
        
                    Model_ID: "$Model_LKP_Details._id",
                    Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                    Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                    Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
        
                    Brand_ID: "$Brand_Name_LKP_Details._id",
                    Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                    Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                    Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
        
                    Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              User:1,
              Type:1,
        
                }
            },
        
        ]).skip(skip).limit(pageSize);
      }
    }
    else if(suspendStatus.trim()==="only-false")
    {
      if (pageNumber=="0")
      {
        val_Returned_Object = await Client_Vehicles_Advance_Notice_Period_Log_Model.aggregate
        ([

          {
              $addFields: 
              {
                collectionName: "Client_Vehicles_Advance_Notice_Period_Log"
              }
          },
        
          {
              $addFields: 
              {
                "User":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "Type":"General",
              }
          },
        
          {
                $match:
                {
                    "Is_Suspended": false
                }
            },
        
            {
              $unionWith:
              {
                coll: 'Business_Vehicles_Advance_Notice_Period_Log',
                pipeline:
                [
                  {
                    $addFields: 
                    {
                      collectionName: "Business_Vehicles_Advance_Notice_Period_Log"
                    }
                },
        
                {
                    $addFields: 
                    {
                      "Type":"Business",
                    }
                },
        
                {
                      $match:
                      {
                          "Is_Suspended": false
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
                      "User":'$Organization_Details.Organization_Title_En',
                    }
                },				
                ]
              }
            },
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_ID',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Model_LKP',
                    localField: 'Vehicles_Data_Details.Model_ID',
                    foreignField: '_id',
                    as: 'Model_LKP_Details'
                }
            },
            { $unwind: '$Model_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Brand_Name_LKP',
                    localField: 'Model_LKP_Details.Brand_ID',
                    foreignField: '_id',
                    as: 'Brand_Name_LKP_Details'
                }
            },
            { $unwind: '$Brand_Name_LKP_Details' },
        
          {
                $project:
                {
                    _id:0,
        
                    Serial_Number:1,
                    Notice_Period_Per_Hours:1,
                    Vehicle_ID: "$Vehicles_Data_Details._id",
        
                    Model_ID: "$Model_LKP_Details._id",
                    Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                    Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                    Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
        
                    Brand_ID: "$Brand_Name_LKP_Details._id",
                    Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                    Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                    Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
        
                    Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              User:1,
              Type:1,
        
                }
            },
        
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Vehicles_Advance_Notice_Period_Log_Model.aggregate
        ([

          {
              $addFields: 
              {
                collectionName: "Client_Vehicles_Advance_Notice_Period_Log"
              }
          },
        
          {
              $addFields: 
              {
                "User":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "Type":"General",
              }
          },
        
          {
                $match:
                {
                    "Is_Suspended": false
                }
            },
        
            {
              $unionWith:
              {
                coll: 'Business_Vehicles_Advance_Notice_Period_Log',
                pipeline:
                [
                  {
                    $addFields: 
                    {
                      collectionName: "Business_Vehicles_Advance_Notice_Period_Log"
                    }
                },
        
                {
                    $addFields: 
                    {
                      "Type":"Business",
                    }
                },
        
                {
                      $match:
                      {
                          "Is_Suspended": false
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
                      "User":'$Organization_Details.Organization_Title_En',
                    }
                },				
                ]
              }
            },
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_ID',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Model_LKP',
                    localField: 'Vehicles_Data_Details.Model_ID',
                    foreignField: '_id',
                    as: 'Model_LKP_Details'
                }
            },
            { $unwind: '$Model_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Brand_Name_LKP',
                    localField: 'Model_LKP_Details.Brand_ID',
                    foreignField: '_id',
                    as: 'Brand_Name_LKP_Details'
                }
            },
            { $unwind: '$Brand_Name_LKP_Details' },
        
          {
                $project:
                {
                    _id:0,
        
                    Serial_Number:1,
                    Notice_Period_Per_Hours:1,
                    Vehicle_ID: "$Vehicles_Data_Details._id",
        
                    Model_ID: "$Model_LKP_Details._id",
                    Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                    Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                    Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
        
                    Brand_ID: "$Brand_Name_LKP_Details._id",
                    Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                    Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                    Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
        
                    Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              User:1,
              Type:1,
        
                }
            },
        
        ]).skip(skip).limit(pageSize);
      }
    }
    else if(suspendStatus.trim()==="all")
    {
      if (pageNumber=="0")
      {
        val_Returned_Object = await Client_Vehicles_Advance_Notice_Period_Log_Model.aggregate
        ([

          {
              $addFields: 
              {
                collectionName: "Client_Vehicles_Advance_Notice_Period_Log"
              }
          },
        
          {
              $addFields: 
              {
                "User":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "Type":"General",
              }
          },
        
            {
              $unionWith:
              {
                coll: 'Business_Vehicles_Advance_Notice_Period_Log',
                pipeline:
                [
                  {
                    $addFields: 
                    {
                      collectionName: "Business_Vehicles_Advance_Notice_Period_Log"
                    }
                },
        
                {
                    $addFields: 
                    {
                      "Type":"Business",
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
                      "User":'$Organization_Details.Organization_Title_En',
                    }
                },				
                ]
              }
            },
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_ID',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Model_LKP',
                    localField: 'Vehicles_Data_Details.Model_ID',
                    foreignField: '_id',
                    as: 'Model_LKP_Details'
                }
            },
            { $unwind: '$Model_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Brand_Name_LKP',
                    localField: 'Model_LKP_Details.Brand_ID',
                    foreignField: '_id',
                    as: 'Brand_Name_LKP_Details'
                }
            },
            { $unwind: '$Brand_Name_LKP_Details' },           
            
          {
                $project:
                {
                    _id:0,
        
                    Serial_Number:1,
                    Notice_Period_Per_Hours:1,
                    Vehicle_ID: "$Vehicles_Data_Details._id",
        
                    Model_ID: "$Model_LKP_Details._id",
                    Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                    Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                    Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
        
                    Brand_ID: "$Brand_Name_LKP_Details._id",
                    Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                    Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                    Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
        
                    Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              User:1,
              Type:1,
        
                }
            },
        
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Vehicles_Advance_Notice_Period_Log_Model.aggregate
        ([

          {
              $addFields: 
              {
                collectionName: "Client_Vehicles_Advance_Notice_Period_Log"
              }
          },
        
          {
              $addFields: 
              {
                "User":"N/A",
              }
          },
        
          {
              $addFields: 
              {
                "Type":"General",
              }
          },
        
            {
              $unionWith:
              {
                coll: 'Business_Vehicles_Advance_Notice_Period_Log',
                pipeline:
                [
                  {
                    $addFields: 
                    {
                      collectionName: "Business_Vehicles_Advance_Notice_Period_Log"
                    }
                },
        
                {
                    $addFields: 
                    {
                      "Type":"Business",
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
                      "User":'$Organization_Details.Organization_Title_En',
                    }
                },				
                ]
              }
            },
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_ID',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Model_LKP',
                    localField: 'Vehicles_Data_Details.Model_ID',
                    foreignField: '_id',
                    as: 'Model_LKP_Details'
                }
            },
            { $unwind: '$Model_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Brand_Name_LKP',
                    localField: 'Model_LKP_Details.Brand_ID',
                    foreignField: '_id',
                    as: 'Brand_Name_LKP_Details'
                }
            },
            { $unwind: '$Brand_Name_LKP_Details' },
        
          {
                $project:
                {
                    _id:0,
        
                    Serial_Number:1,
                    Notice_Period_Per_Hours:1,
                    Vehicle_ID: "$Vehicles_Data_Details._id",
        
                    Model_ID: "$Model_LKP_Details._id",
                    Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                    Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                    Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
        
                    Brand_ID: "$Brand_Name_LKP_Details._id",
                    Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                    Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                    Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
        
                    Inserted_By: 1,
              Inserted_DateTime: 1,
              Is_Suspended: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              collectionName:1,
              User:1,
              Type:1,
        
                }
            },
        
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

exports.Get_Vehicles_By_Model_ID = async (val_Model_ID) => {
  try {
      return await tbl_Model.find({Model_ID:val_Model_ID}).select('_id');
  } catch (error) {
      logger.error(error.message);
  }
};

exports.Suspend_vehicles_advance_notice_period_log = async (lkp_Table_Name,data,val_Updated_By,val_User_ID) => {
  try {
    console.log("data="+data)
    console.log("lkp_Table_Name="+lkp_Table_Name)

    const now_DateTime = require('../helpers/fun_datetime');
    var val_IDs = data;
    var Updated_DateTime =now_DateTime.get_DateTime()
    
    if (lkp_Table_Name=="client_vehicles_advance_notice_period_log") {
      tbl_Model = require("../models/client_vehicles_advance_notice_period_log");
      return await tbl_Model.updateMany(
        { 
          $and: 
          [
            { Is_Suspended: false },
            { Vehicle_ID: { $in: val_IDs } }
          ]
        }, 
        { $set: { Is_Suspended: true , Updated_By:val_Updated_By , Updated_DateTime:Updated_DateTime }}
      )
    } else if (lkp_Table_Name=="business_vehicles_advance_notice_period_log") {
      tbl_Model = require("../models/business_vehicles_advance_notice_period_log");
      return await tbl_Model.updateMany(
        { 
          $and: 
          [
            { Is_Suspended: false },
            { Vehicle_ID: { $in: val_IDs } },
            { User_ID: new ObjectId(val_User_ID) }
          ]
        }, 
        { $set: { Is_Suspended: true , Updated_By:val_Updated_By , Updated_DateTime:Updated_DateTime }}
      )
    } 

  } catch (error) {
      logger.error(error.message);
  }
};

