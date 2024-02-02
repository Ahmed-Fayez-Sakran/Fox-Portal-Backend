//#region Global Variables
var tbl_Model = "";
var client_terms_conditions_log_Model = require("../models/client_terms_conditions_log");
var business_terms_conditions_log_Model = require("../models/business_terms_conditions_log");
const logger = require('../utils/logger');
var loggers_Model = require("../models/logger");
const now_DateTime = require('../helpers/fun_datetime');
//#endregion

exports.get_terms_conditions_By_SuspendStatus = async (suspendStatus,pageNumber) => {
    try {
        //#region Variables
        var val_Returned_Object = "";
        var pageSize = 10 ;
        var skip = (pageNumber - 1) * pageSize;
        //#endregion


        if (suspendStatus.trim() ==="only-true") 
        {
            if (pageNumber=="0")
            {
                val_Returned_Object = await client_terms_conditions_log_Model.aggregate
                ([

                    {
                      $addFields:
                      {
                        "collectionName": "Client_Terms_Conditions_Log",
                        "Organization":"N/A",
                        "type":"General",
                      }
                    },
                    
                    {
                        $unionWith:
                          {
                            coll: 'Business_Terms_Conditions_Log',
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
                                        "collectionName": "Business_Terms_Conditions_Log",
                                        "Organization":'$Organization_Details.Organization_Title_En',
                                        "type":"Business",
                                      }
                                    },
                                
                            ]
                          },
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
    
                      { $match: { Is_Suspended: true } },
    
                      {
                        $project:
                          {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            Sub_Service_ID: 1,
                            Terms_Conditions_Description_En: 1,
                            Terms_Conditions_Description_Ar: 1,	        
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Sub_Services_Details:
                            {
                              id: "$Sub_Services_Details._id",
                              Serial_Number: "$Sub_Services_Details.Serial_Number",
                              Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                              Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                              Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                              Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                
                            "collectionName":1,
                            "Organization":1,
                            "type":1,
                          }
                    },
                
                ]);
            }
            else
            {
                val_Returned_Object = await client_terms_conditions_log_Model.aggregate
                ([

                    {
                      $addFields:
                      {
                        "collectionName": "Client_Terms_Conditions_Log",
                        "Organization":"N/A",
                        "type":"General",
                      }
                    },
                    
                    {
                        $unionWith:
                          {
                            coll: 'Business_Terms_Conditions_Log',
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
                                        "collectionName": "Business_Terms_Conditions_Log",
                                        "Organization":'$Organization_Details.Organization_Title_En',
                                        "type":"Business",
                                      }
                                    },
                                
                            ]
                          },
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
    
                      { $match: { Is_Suspended: true } },
    
                      {
                        $project:
                          {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            Sub_Service_ID: 1,
                            Terms_Conditions_Description_En: 1,
                            Terms_Conditions_Description_Ar: 1,	        
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Sub_Services_Details:
                            {
                              id: "$Sub_Services_Details._id",
                              Serial_Number: "$Sub_Services_Details.Serial_Number",
                              Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                              Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                              Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                              Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                
                            "collectionName":1,
                            "Organization":1,
                            "type":1,
                          }
                    },
                
                ]).skip(skip).limit(pageSize);
            }
        } 
        else if(suspendStatus.trim() ==="only-false") 
        {
            if (pageNumber=="0")
            {
                val_Returned_Object = await client_terms_conditions_log_Model.aggregate
                ([

                    {
                      $addFields:
                      {
                        "collectionName": "Client_Terms_Conditions_Log",
                        "Organization":"N/A",
                        "type":"General",
                      }
                    },
                    
                    {
                        $unionWith:
                          {
                            coll: 'Business_Terms_Conditions_Log',
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
                                        "collectionName": "Business_Terms_Conditions_Log",
                                        "Organization":'$Organization_Details.Organization_Title_En',
                                        "type":"Business",
                                      }
                                    },
                                
                            ]
                          },
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
    
                      { $match: { Is_Suspended: false } },
    
                      {
                        $project:
                          {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            Sub_Service_ID: 1,
                            Terms_Conditions_Description_En: 1,
                            Terms_Conditions_Description_Ar: 1,	        
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Sub_Services_Details:
                            {
                              id: "$Sub_Services_Details._id",
                              Serial_Number: "$Sub_Services_Details.Serial_Number",
                              Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                              Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                              Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                              Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                
                            "collectionName":1,
                            "Organization":1,
                            "type":1,
                          }
                    },
                
                ]) ;
            }
            else
            {
                val_Returned_Object = await client_terms_conditions_log_Model.aggregate
                ([

                    {
                      $addFields:
                      {
                        "collectionName": "Client_Terms_Conditions_Log",
                        "Organization":"N/A",
                        "type":"General",
                      }
                    },
                    
                    {
                        $unionWith:
                          {
                            coll: 'Business_Terms_Conditions_Log',
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
                                        "collectionName": "Business_Terms_Conditions_Log",
                                        "Organization":'$Organization_Details.Organization_Title_En',
                                        "type":"Business",
                                      }
                                    },
                                
                            ]
                          },
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
    
                      { $match: { Is_Suspended: false } },
    
                      {
                        $project:
                          {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            Sub_Service_ID: 1,
                            Terms_Conditions_Description_En: 1,
                            Terms_Conditions_Description_Ar: 1,	        
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Sub_Services_Details:
                            {
                              id: "$Sub_Services_Details._id",
                              Serial_Number: "$Sub_Services_Details.Serial_Number",
                              Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                              Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                              Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                              Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                
                            "collectionName":1,
                            "Organization":1,
                            "type":1,
                          }
                    },
                
                ]).skip(skip).limit(pageSize);
            }
        } 
        else 
        {
            if (pageNumber=="0")
            {
                val_Returned_Object = await client_terms_conditions_log_Model.aggregate
                ([

                    {
                      $addFields:
                      {
                        "collectionName": "Client_Terms_Conditions_Log",
                        "Organization":"N/A",
                        "type":"General",
                      }
                    },
                    
                    {
                        $unionWith:
                          {
                            coll: 'Business_Terms_Conditions_Log',
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
                                        "collectionName": "Business_Terms_Conditions_Log",
                                        "Organization":'$Organization_Details.Organization_Title_En',
                                        "type":"Business",
                                      }
                                    },
                                
                            ]
                          },
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
                            Terms_Conditions_Description_En: 1,
                            Terms_Conditions_Description_Ar: 1,	        
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Sub_Services_Details:
                            {
                              id: "$Sub_Services_Details._id",
                              Serial_Number: "$Sub_Services_Details.Serial_Number",
                              Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                              Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                              Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                              Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                
                            "collectionName":1,
                            "Organization":1,
                            "type":1,
                          }
                    },
                
                ]);
            }
            else
            {
                val_Returned_Object = await client_terms_conditions_log_Model.aggregate
                ([

                    {
                      $addFields:
                      {
                        "collectionName": "Client_Terms_Conditions_Log",
                        "Organization":"N/A",
                        "type":"General",
                      }
                    },
                    
                    {
                        $unionWith:
                          {
                            coll: 'Business_Terms_Conditions_Log',
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
                                        "collectionName": "Business_Terms_Conditions_Log",
                                        "Organization":'$Organization_Details.Organization_Title_En',
                                        "type":"Business",
                                      }
                                    },
                                
                            ]
                          },
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
                            Terms_Conditions_Description_En: 1,
                            Terms_Conditions_Description_Ar: 1,	        
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Sub_Services_Details:
                            {
                              id: "$Sub_Services_Details._id",
                              Serial_Number: "$Sub_Services_Details.Serial_Number",
                              Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                              Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                              Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                              Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                
                            "collectionName":1,
                            "Organization":1,
                            "type":1,
                          }
                    },
                
                ]).skip(skip).limit(pageSize);
            }
        }
        return val_Returned_Object; 
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }     
};

exports.get_Last_terms_conditions = async (table_name) => {
    try {
        if (table_name=="client_terms_conditions_log") {
            tbl_Model = require("../models/client_terms_conditions_log");
        } else {
            tbl_Model = require("../models/business_terms_conditions_log");
        }
        var item = await tbl_Model.find().sort({ _id: -1 }).limit(1);
        console.log("item.length = "+ item.length)
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
