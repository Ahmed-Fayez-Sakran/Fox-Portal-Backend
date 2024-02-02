//#region Global Variables
var tbl_Model = ""
var Client_Sub_Services_Settings_Log_Model = require("../models/client_sub_services_settings_log");
var Business_Sub_Services_Settings_Log_Model = require("../models/business_sub_services_settings_log");
const now_DateTime = require('../helpers/fun_datetime');
const logger = require('../utils/logger');
var ObjectId = require('mongodb').ObjectId;
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
        val_Returned_Object = await Client_Sub_Services_Settings_Log_Model.aggregate
        ([
            {
                $addFields: 
                {
                  collectionName: "Client_Sub_Services_Settings_Log"
                }
            },
        
            {
                $unionWith:
                {
                    coll: 'Business_Sub_Services_Settings_Log',
                    pipeline:
                    [
                        {
                            $match:
                            {
                                "Is_Suspended": val_Is_Suspended
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
                        {
                            $lookup:
                            {
                                from: 'Business_Organizations_LKP',
                                localField: 'User_Data_Details.Business_Organization_ID',
                                foreignField: '_id',
                                as: 'Organization_Details'
                            }
                        },
                        {$unwind: '$User_Data_Details'},
                        {$unwind: '$Organization_Details'},
                        {
                            $addFields: 
                            {
                              collectionName: "Business_Sub_Services_Settings_Log"
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
                $lookup:
                {
                    from: 'Discount_Method_LKP',
                    localField: 'Discount_ID',
                    foreignField: '_id',
                    as: 'Discount_Method_Details'
                }
            },
            {$unwind: '$Discount_Method_Details'},
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
                    Mini_Service_Duration_Per_Hours: 1,                      
                    Notice_Period_Per_Hours: 1,
                    Max_Cancellation_Duration_Per_Hours: 1,
                            
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
        
                    Discount_Details:
                    {
                        id: "$Discount_Method_Details._id",
                        Serial_Number: "$Discount_Method_Details.Serial_Number",
                        Method_Title_En: "$Discount_Method_Details.Method_Title_En",
                        Method_Title_Ar: "$Discount_Method_Details.Method_Title_Ar",                
                        Percentage_Rate: "$Discount_Method_Details.Percentage_Rate",
                        Fixed_Rate: "$Discount_Method_Details.Fixed_Rate",
                    },
                    
                    collectionName:1,
        
                }
            },
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Sub_Services_Settings_Log_Model.aggregate
        ([
            {
                $addFields: 
                {
                  collectionName: "Client_Sub_Services_Settings_Log"
                }
            },
        
            {
                $unionWith:
                {
                    coll: 'Business_Sub_Services_Settings_Log',
                    pipeline:
                    [
                        {
                            $match:
                            {
                                "Is_Suspended": val_Is_Suspended
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
                        {
                            $lookup:
                            {
                                from: 'Business_Organizations_LKP',
                                localField: 'User_Data_Details.Business_Organization_ID',
                                foreignField: '_id',
                                as: 'Organization_Details'
                            }
                        },
                        {$unwind: '$User_Data_Details'},
                        {$unwind: '$Organization_Details'},
                        {
                            $addFields: 
                            {
                              collectionName: "Business_Sub_Services_Settings_Log"
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
                $lookup:
                {
                    from: 'Discount_Method_LKP',
                    localField: 'Discount_ID',
                    foreignField: '_id',
                    as: 'Discount_Method_Details'
                }
            },
            {$unwind: '$Discount_Method_Details'},
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
                    Mini_Service_Duration_Per_Hours: 1,                      
                    Notice_Period_Per_Hours: 1,
                    Max_Cancellation_Duration_Per_Hours: 1,
                            
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
        
                    Discount_Details:
                    {
                        id: "$Discount_Method_Details._id",
                        Serial_Number: "$Discount_Method_Details.Serial_Number",
                        Method_Title_En: "$Discount_Method_Details.Method_Title_En",
                        Method_Title_Ar: "$Discount_Method_Details.Method_Title_Ar",                
                        Percentage_Rate: "$Discount_Method_Details.Percentage_Rate",
                        Fixed_Rate: "$Discount_Method_Details.Fixed_Rate",
                    },
                    
                    collectionName:1,
        
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
        val_Returned_Object = await Client_Sub_Services_Settings_Log_Model.aggregate
        ([
            {
                $addFields: 
                {
                  collectionName: "Client_Sub_Services_Settings_Log"
                }
            },
        
            {
                $unionWith:
                {
                    coll: 'Business_Sub_Services_Settings_Log',
                    pipeline:
                    [
                        {
                            $match:
                            {
                                "Is_Suspended": val_Is_Suspended
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
                        {
                            $lookup:
                            {
                                from: 'Business_Organizations_LKP',
                                localField: 'User_Data_Details.Business_Organization_ID',
                                foreignField: '_id',
                                as: 'Organization_Details'
                            }
                        },
                        {$unwind: '$User_Data_Details'},
                        {$unwind: '$Organization_Details'},
                        {
                            $addFields: 
                            {
                              collectionName: "Business_Sub_Services_Settings_Log"
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
                $lookup:
                {
                    from: 'Discount_Method_LKP',
                    localField: 'Discount_ID',
                    foreignField: '_id',
                    as: 'Discount_Method_Details'
                }
            },
            {$unwind: '$Discount_Method_Details'},
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
                    Mini_Service_Duration_Per_Hours: 1,                      
                    Notice_Period_Per_Hours: 1,
                    Max_Cancellation_Duration_Per_Hours: 1,
                            
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
        
                    Discount_Details:
                    {
                        id: "$Discount_Method_Details._id",
                        Serial_Number: "$Discount_Method_Details.Serial_Number",
                        Method_Title_En: "$Discount_Method_Details.Method_Title_En",
                        Method_Title_Ar: "$Discount_Method_Details.Method_Title_Ar",                
                        Percentage_Rate: "$Discount_Method_Details.Percentage_Rate",
                        Fixed_Rate: "$Discount_Method_Details.Fixed_Rate",
                    },
                    
                    collectionName:1,
        
                }
            },
        ]);
      }
      else
      {
        val_Returned_Object = await Client_Sub_Services_Settings_Log_Model.aggregate
        ([
            {
                $addFields: 
                {
                  collectionName: "Client_Sub_Services_Settings_Log"
                }
            },
        
            {
                $unionWith:
                {
                    coll: 'Business_Sub_Services_Settings_Log',
                    pipeline:
                    [
                        {
                            $match:
                            {
                                "Is_Suspended": val_Is_Suspended
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
                        {
                            $lookup:
                            {
                                from: 'Business_Organizations_LKP',
                                localField: 'User_Data_Details.Business_Organization_ID',
                                foreignField: '_id',
                                as: 'Organization_Details'
                            }
                        },
                        {$unwind: '$User_Data_Details'},
                        {$unwind: '$Organization_Details'},
                        {
                            $addFields: 
                            {
                              collectionName: "Business_Sub_Services_Settings_Log"
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
                $lookup:
                {
                    from: 'Discount_Method_LKP',
                    localField: 'Discount_ID',
                    foreignField: '_id',
                    as: 'Discount_Method_Details'
                }
            },
            {$unwind: '$Discount_Method_Details'},
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
                    Mini_Service_Duration_Per_Hours: 1,                      
                    Notice_Period_Per_Hours: 1,
                    Max_Cancellation_Duration_Per_Hours: 1,
                            
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
        
                    Discount_Details:
                    {
                        id: "$Discount_Method_Details._id",
                        Serial_Number: "$Discount_Method_Details.Serial_Number",
                        Method_Title_En: "$Discount_Method_Details.Method_Title_En",
                        Method_Title_Ar: "$Discount_Method_Details.Method_Title_Ar",                
                        Percentage_Rate: "$Discount_Method_Details.Percentage_Rate",
                        Fixed_Rate: "$Discount_Method_Details.Fixed_Rate",
                    },
                    
                    collectionName:1,
        
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
          val_Returned_Object = await Client_Sub_Services_Settings_Log_Model.aggregate
          ([
            {
                $addFields: 
                {
                  collectionName: "Client_Sub_Services_Settings_Log"
                }
            },
        
            {
                $unionWith:
                {
                    coll: 'Business_Sub_Services_Settings_Log',
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
                        {
                            $lookup:
                            {
                                from: 'Business_Organizations_LKP',
                                localField: 'User_Data_Details.Business_Organization_ID',
                                foreignField: '_id',
                                as: 'Organization_Details'
                            }
                        },
                        {$unwind: '$User_Data_Details'},
                        {$unwind: '$Organization_Details'},
                        {
                            $addFields: 
                            {
                              collectionName: "Business_Sub_Services_Settings_Log"
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
                $lookup:
                {
                    from: 'Discount_Method_LKP',
                    localField: 'Discount_ID',
                    foreignField: '_id',
                    as: 'Discount_Method_Details'
                }
            },
            {$unwind: '$Discount_Method_Details'},
            {
                $project:
                {
                    id: "$_id",
                    _id:0,
                    Serial_Number: 1,
                    Sub_Service_ID: 1,
                    Mini_Service_Duration_Per_Hours: 1,                      
                    Notice_Period_Per_Hours: 1,
                    Max_Cancellation_Duration_Per_Hours: 1,
                            
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
        
                    Discount_Details:
                    {
                        id: "$Discount_Method_Details._id",
                        Serial_Number: "$Discount_Method_Details.Serial_Number",
                        Method_Title_En: "$Discount_Method_Details.Method_Title_En",
                        Method_Title_Ar: "$Discount_Method_Details.Method_Title_Ar",                
                        Percentage_Rate: "$Discount_Method_Details.Percentage_Rate",
                        Fixed_Rate: "$Discount_Method_Details.Fixed_Rate",
                    },
                    
                    collectionName:1,
        
                }
            },
          ]);
        }
        else
        {
          val_Returned_Object = await Client_Sub_Services_Settings_Log_Model.aggregate
          ([
            {
                $addFields: 
                {
                  collectionName: "Client_Sub_Services_Settings_Log"
                }
            },
        
            {
                $unionWith:
                {
                    coll: 'Business_Sub_Services_Settings_Log',
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
                        {
                            $lookup:
                            {
                                from: 'Business_Organizations_LKP',
                                localField: 'User_Data_Details.Business_Organization_ID',
                                foreignField: '_id',
                                as: 'Organization_Details'
                            }
                        },
                        {$unwind: '$User_Data_Details'},
                        {$unwind: '$Organization_Details'},
                        {
                            $addFields: 
                            {
                              collectionName: "Business_Sub_Services_Settings_Log"
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
                $lookup:
                {
                    from: 'Discount_Method_LKP',
                    localField: 'Discount_ID',
                    foreignField: '_id',
                    as: 'Discount_Method_Details'
                }
            },
            {$unwind: '$Discount_Method_Details'},
            {
                $project:
                {
                    id: "$_id",
                    _id:0,
                    Serial_Number: 1,
                    Sub_Service_ID: 1,
                    Mini_Service_Duration_Per_Hours: 1,                      
                    Notice_Period_Per_Hours: 1,
                    Max_Cancellation_Duration_Per_Hours: 1,
                            
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
        
                    Discount_Details:
                    {
                        id: "$Discount_Method_Details._id",
                        Serial_Number: "$Discount_Method_Details.Serial_Number",
                        Method_Title_En: "$Discount_Method_Details.Method_Title_En",
                        Method_Title_Ar: "$Discount_Method_Details.Method_Title_Ar",                
                        Percentage_Rate: "$Discount_Method_Details.Percentage_Rate",
                        Fixed_Rate: "$Discount_Method_Details.Fixed_Rate",
                    },
                    
                    collectionName:1,
        
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

exports.check_Settings_Existancy = async (val_Table_Name , val_Sub_Service_ID , val_User_ID ) => {

  try {
    const return_Data = [];
    let itemsCount = ""

    if (val_Table_Name=="business_sub_services_settings_log") 
    {
        //#region business_sub_services_settings_log
        tbl_Model = require("../models/business_sub_services_settings_log");
        itemsCount = await tbl_Model.find({
          $and:
          [
            { Sub_Service_ID: new ObjectId(val_Sub_Service_ID) },
            { User_ID: new ObjectId(val_User_ID) },
            { Is_Suspended: false}
          ]
        });
        //#endregion
    }
    else if (val_Table_Name=="client_sub_services_settings_log") 
    {
        //#region client_sub_services_settings_log
        tbl_Model = require("../models/client_sub_services_settings_log");
        itemsCount = await tbl_Model.find({
          $and:
          [
            { Sub_Service_ID: new ObjectId(val_Sub_Service_ID) },
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

exports.update_DataRow = async (val_Table_Name,id, tblObject) => {
    try {
        if (val_Table_Name=="business_sub_services_settings_log") 
        {
            tbl_Model = require("../models/business_sub_services_settings_log");
        }
        else if (val_Table_Name=="client_sub_services_settings_log") 
        {
            tbl_Model = require("../models/client_sub_services_settings_log");
        }
        else if (val_Table_Name=="discount_method_lkp") 
        {
            tbl_Model = require("../models/discount_method_lkp");
        }
        return await tbl_Model.findByIdAndUpdate(id, tblObject);
    } catch (err) {
        logger.error(err.message);
    }
};

exports.create_Single_DataRow = async (val_Table_Name,row_Object) => {
    try {
        if (val_Table_Name=="business_sub_services_settings_log") 
        {
            tbl_Model = require("../models/business_sub_services_settings_log");
        }
        else if (val_Table_Name=="client_sub_services_settings_log") 
        {
            tbl_Model = require("../models/client_sub_services_settings_log");
        }
        else if (val_Table_Name=="discount_method_lkp") 
        {
            tbl_Model = require("../models/discount_method_lkp");
        }
        return await tbl_Model.create(row_Object);
    } catch (err) {
        logger.error(err.message);
    }
};

exports.check_Title_Existancy = async (val_Title_En,val_Title_Ar) => {

    try {
        const return_Data = [];
        let itemsCount = ""
       
        tbl_Model = require("../models/discount_method_lkp");
        itemsCount = await tbl_Model.find({
            $and: 
            [
                {
                    $or: 
                    [
                        { Method_Title_En: val_Title_En },
                        { Method_Title_Ar: val_Title_Ar }
                    ]
                },
                { Is_Suspended: false}
            ]            
        });

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

exports.get_Data_By_Discount_ID = async (val_Discount_ID) => {
    try {
        tbl_Model = require("../models/discount_method_lkp");
        var itemsCount = await tbl_Model.findById(val_Discount_ID);
        return itemsCount;
    } catch (err) {
      logger.error(err.message);
    }     
};