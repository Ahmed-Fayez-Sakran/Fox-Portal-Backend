//#region Global Variables
var tbl_Model = require("../models/user_data");
var tbl_User_Roles_Model = require("../models/user_roles_lkp");
const user_roles_lkp_Model = require("../models/user_roles_lkp");
const Templates_Forms_Log_Model = require("../models/templates_forms_log");
//const logger = require('../helpers/fun_insert_Logger');
const logger = require('../utils/logger');
var loggers_Model = require("../models/logger");
const now_DateTime = require('../helpers/fun_datetime');
const obj_Get_Photo_Path = require('../helpers/fun_get_photo_path');

var useremailverification_log_Model = require("../models/useremailverification_log");
var userphoneverification_log_Model = require("../models/userphoneverification_log");
var sms_message_Model = require("../models/sms_message");
var business_organizations__Model = require("../models/business_organizations_lkp");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;

//#endregion


exports.check_User_Existancy = async (val_Email,val_Phone_Number) => {
    try {
        const returned_Data = [];

        let exist = await tbl_Model.find({
            $or: [
                {Email: val_Email},
                {Phone_Number: val_Phone_Number}                
            ]
        });

        if (exist.length > 0){
            if (exist[0].User_Roles_ID == "65187389de9d4f1d31451dcb") {
                returned_Data[0]="Exist_Non_Registered_Client";
                returned_Data[1]=exist[0]._id;
                return returned_Data;
            } else {
                returned_Data[0]="Exist";
                return returned_Data;
            }
        } else {
            returned_Data[0]="Not_Exist";
            return returned_Data;
        }
        
    } catch (error) {
        logger.error(error.message);
        console.log(error.message);
    }
};

exports.get_Users_List_By_User_Types = async (val_user_types,pageNumber,suspendStatus) => {
    try {
        //#region Set Recieved User Roles
        var pageSize = 10 ;
        var skip = (pageNumber - 1) * pageSize;
         var Recieved_User_Roles = [];
         const valuesArray = val_user_types.split(',');
         for (let i = 0; i < valuesArray.length; i++)
         {  
             if (valuesArray[i]=="registered_client_users") {
                Recieved_User_Roles[i] = new ObjectId('65187389de9d4f1d31451dcc')
             } else  if (valuesArray[i]=="non_registered_client_users") {
                Recieved_User_Roles[i] = new ObjectId('65187389de9d4f1d31451dcb')
             } else  if (valuesArray[i]=="business_client_admin_users") {
                Recieved_User_Roles[i] = new ObjectId('65187389de9d4f1d31451dcd')
             } else  if (valuesArray[i]=="business_client_operation_users") {
                Recieved_User_Roles[i] = new ObjectId('65187389de9d4f1d31451dce')
             } else  if (valuesArray[i]=="business_client_finance_users") {
                Recieved_User_Roles[i] = new ObjectId('65187389de9d4f1d31451dcf')
             } else  if (valuesArray[i]=="fox_user_operation_users") {
                Recieved_User_Roles[i] = new ObjectId('65187389de9d4f1d31451dd1')
             } else  if (valuesArray[i]=="fox_user_finance_users") {
                Recieved_User_Roles[i] = new ObjectId('65187389de9d4f1d31451dd2')
             } else  if (valuesArray[i]=="outsourcing_owner_users") {
                Recieved_User_Roles[i] = new ObjectId('65187389de9d4f1d31451dd3')
             }
         }
         console.log("Recieved_User_Roles = "+Recieved_User_Roles)
         //#endregion
        
        if (suspendStatus.trim()==="only-true") 
        {
            //#region only-true
            if (pageNumber=="0") {
                return await tbl_Model.aggregate
                ([
                {
                    $lookup:
                    {
                        from: 'User_Roles_LKP',
                        localField: 'User_Roles_ID',
                        foreignField: '_id',
                        as: 'User_Role'
                    }
                },
                {$unwind: '$User_Role'},
                {
                    $match:
                    {
                        "Is_Suspended": true,
                        "User_Role._id": { $in: Recieved_User_Roles }
                    }
                },
                {
                    $project:
                    {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "First_Name": 1,
                        "Last_Name": 1,
                        "User_Roles_ID": 1,
                        "Phone_Number": 1,
                        "Email": 1,
                        "Address": 1,
                        "Location": 1,
                        "Photo_Profile": 1,
                        "Inserted_DateTime": 1,
                        "Last_Login_DateTime": 1,
                        "LastUpdate_DateTime": 1,
                        "Is_Business": 1,
                        "Business_Organization_ID": 1,
                        "Is_Verified": 1,
                        "Is_Suspended": 1,
                        "Inserted_By": 1,
                        "Updated_By": 1,
                        //"_id": 0
                        "User_Role_Title":"$User_Role.Role_Title_En",
                    }
                }
                ]);
            } else {
                return await tbl_Model.aggregate
                ([
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Role'
                        }
                    },
                    {$unwind: '$User_Role'},
                    {
                        $match:
                        {
                            "Is_Suspended": true,
                            "User_Role._id": { $in: Recieved_User_Roles }
                        }
                    },
                    {
                        $project:
                        {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "First_Name": 1,
                            "Last_Name": 1,
                            "User_Roles_ID": 1,
                            "Phone_Number": 1,
                            "Email": 1,
                            "Address": 1,
                            "Location": 1,
                            "Photo_Profile": 1,
                            "Inserted_DateTime": 1,
                            "Last_Login_DateTime": 1,
                            "LastUpdate_DateTime": 1,
                            "Is_Business": 1,
                            "Business_Organization_ID": 1,
                            "Is_Verified": 1,
                            "Is_Suspended": 1,
                            "Inserted_By": 1,
                            "Updated_By": 1,
                            //"_id": 0
                            "User_Role_Title":"$User_Role.Role_Title_En",
                        }
                    }
                ]).skip(skip).limit(pageSize); 
            }
            //#endregion
        } 
        else if(suspendStatus.trim()==="only-false")
        {
            //#region only-false
            if (pageNumber=="0") {
                return await tbl_Model.aggregate
                ([
                {
                    $lookup:
                    {
                        from: 'User_Roles_LKP',
                        localField: 'User_Roles_ID',
                        foreignField: '_id',
                        as: 'User_Role'
                    }
                },
                {$unwind: '$User_Role'},
                {
                    $match:
                    {
                        "Is_Suspended": false,
                        "User_Role._id": { $in: Recieved_User_Roles }
                    }
                },
                {
                    $project:
                    {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "First_Name": 1,
                        "Last_Name": 1,
                        "User_Roles_ID": 1,
                        "Phone_Number": 1,
                        "Email": 1,
                        "Address": 1,
                        "Location": 1,
                        "Photo_Profile": 1,
                        "Inserted_DateTime": 1,
                        "Last_Login_DateTime": 1,
                        "LastUpdate_DateTime": 1,
                        "Is_Business": 1,
                        "Business_Organization_ID": 1,
                        "Is_Verified": 1,
                        "Is_Suspended": 1,
                        "Inserted_By": 1,
                        "Updated_By": 1,
                        //"_id": 0
                        "User_Role_Title":"$User_Role.Role_Title_En",
                    }
                }
                ]);
            } else {
                return await tbl_Model.aggregate
                ([
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Role'
                        }
                    },
                    {$unwind: '$User_Role'},
                    {
                        $match:
                        {
                            "Is_Suspended": false,
                            "User_Role._id": { $in: Recieved_User_Roles }
                        }
                    },
                    {
                        $project:
                        {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "First_Name": 1,
                            "Last_Name": 1,
                            "User_Roles_ID": 1,
                            "Phone_Number": 1,
                            "Email": 1,
                            "Address": 1,
                            "Location": 1,
                            "Photo_Profile": 1,
                            "Inserted_DateTime": 1,
                            "Last_Login_DateTime": 1,
                            "LastUpdate_DateTime": 1,
                            "Is_Business": 1,
                            "Business_Organization_ID": 1,
                            "Is_Verified": 1,
                            "Is_Suspended": 1,
                            "Inserted_By": 1,
                            "Updated_By": 1,
                            //"_id": 0
                            "User_Role_Title":"$User_Role.Role_Title_En",
                        }
                    }
                ]).skip(skip).limit(pageSize); 
            }
            //#endregion
        }
        else if(suspendStatus.trim()==="all") 
        {
            //#region all
            if (pageNumber=="0") {
                return await tbl_Model.aggregate
                ([
                {
                    $lookup:
                    {
                        from: 'User_Roles_LKP',
                        localField: 'User_Roles_ID',
                        foreignField: '_id',
                        as: 'User_Role'
                    }
                },
                {$unwind: '$User_Role'},
                {
                    $match:
                    {
                        "User_Role._id": { $in: Recieved_User_Roles }
                    }
                },
                {
                    $project:
                    {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "First_Name": 1,
                        "Last_Name": 1,
                        "User_Roles_ID": 1,
                        "Phone_Number": 1,
                        "Email": 1,
                        "Address": 1,
                        "Location": 1,
                        "Photo_Profile": 1,
                        "Inserted_DateTime": 1,
                        "Last_Login_DateTime": 1,
                        "LastUpdate_DateTime": 1,
                        "Is_Business": 1,
                        "Business_Organization_ID": 1,
                        "Is_Verified": 1,
                        "Is_Suspended": 1,
                        "Inserted_By": 1,
                        "Updated_By": 1,
                        //"_id": 0
                        "User_Role_Title":"$User_Role.Role_Title_En",
                    }
                }
                ]);
            } else {
                return await tbl_Model.aggregate
                ([
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Role'
                        }
                    },
                    {$unwind: '$User_Role'},
                    {
                        $match:
                        {
                            "User_Role._id": { $in: Recieved_User_Roles }
                        }
                    },
                    {
                        $project:
                        {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "First_Name": 1,
                            "Last_Name": 1,
                            "User_Roles_ID": 1,
                            "Phone_Number": 1,
                            "Email": 1,
                            "Address": 1,
                            "Location": 1,
                            "Photo_Profile": 1,
                            "Inserted_DateTime": 1,
                            "Last_Login_DateTime": 1,
                            "LastUpdate_DateTime": 1,
                            "Is_Business": 1,
                            "Business_Organization_ID": 1,
                            "Is_Verified": 1,
                            "Is_Suspended": 1,
                            "Inserted_By": 1,
                            "Updated_By": 1,
                            //"_id": 0
                            "User_Role_Title":"$User_Role.Role_Title_En",
                        }
                    }
                ]).skip(skip).limit(pageSize); 
            }
            //#endregion
        }
        else 
        {
            return"";
        }
    } catch (error) {
        logger.error(error.message);
    }
     
};

exports.List_Users_Inside_Organization = async (val_Business_Organization_ID,pageNumber,suspendStatus) => {
    try {
        //#region Set Recieved User Roles
        var pageSize = 10 ;
        var skip = (pageNumber - 1) * pageSize;         
         //#endregion
        
        if (suspendStatus.trim()==="only-true") 
        {
            //#region only-true
            if (pageNumber=="0") {
                return await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Business: true,
                            Business_Organization_ID:new ObjectId(val_Business_Organization_ID),
                            Is_Suspended: true 
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Roles_Details'
                        }
                    },
                
                    {$unwind: '$User_Roles_Details'},
                
                    {
                        $lookup:
                        {
                            from: 'Business_Organizations_LKP',
                            localField: 'Business_Organization_ID',
                            foreignField: '_id',
                            as: 'Organizations_Details'
                        }
                    },
                
                    {$unwind: '$Organizations_Details'},
                
                
                    {
                        $project:
                        {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            First_Name: 1,
                            Last_Name: 1,
                            Phone_Number: 1,
                            Email: 1,
                            Address: 1,
                            Location: 1,
                            Photo_Profile: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Is_Verified: 1,
                            Updated_By: 1,
                            LastUpdate_DateTime: 1,
                            Last_Login_DateTime: 1,
                
                            User_Roles_Details: 
                            {
                              Role_ID: "$User_Roles_Details._id",
                              Serial_Number: "$User_Roles_Details.Serial_Number",
                              Role_Title_En: "$User_Roles_Details.Role_Title_En",
                            },
                
                            Organizations_Details:
                            {
                              id: "$Organizations_Details._id",
                              Serial_Number: "$Organizations_Details.Serial_Number",
                              Organization_Title_En: "$Organizations_Details.Organization_Title_En",
                              Organization_Title_Ar: "$Organizations_Details.Organization_Title_Ar",
                              Is_Reviewed: "$Organizations_Details.Is_Reviewed",
                              Is_Suspended: "$Organizations_Details.Is_Suspended",
                            },
                
                        }
                    },
                
                ]);
            } else {
                return await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Business: true,
                            Business_Organization_ID:new ObjectId(val_Business_Organization_ID),
                            Is_Suspended: true 
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Roles_Details'
                        }
                    },
                
                    {$unwind: '$User_Roles_Details'},
                
                    {
                        $lookup:
                        {
                            from: 'Business_Organizations_LKP',
                            localField: 'Business_Organization_ID',
                            foreignField: '_id',
                            as: 'Organizations_Details'
                        }
                    },
                
                    {$unwind: '$Organizations_Details'},
                
                
                    {
                        $project:
                        {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            First_Name: 1,
                            Last_Name: 1,
                            Phone_Number: 1,
                            Email: 1,
                            Address: 1,
                            Location: 1,
                            Photo_Profile: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Is_Verified: 1,
                            Updated_By: 1,
                            LastUpdate_DateTime: 1,
                            Last_Login_DateTime: 1,
                
                            User_Roles_Details: 
                            {
                              Role_ID: "$User_Roles_Details._id",
                              Serial_Number: "$User_Roles_Details.Serial_Number",
                              Role_Title_En: "$User_Roles_Details.Role_Title_En",
                            },
                
                            Organizations_Details:
                            {
                              id: "$Organizations_Details._id",
                              Serial_Number: "$Organizations_Details.Serial_Number",
                              Organization_Title_En: "$Organizations_Details.Organization_Title_En",
                              Organization_Title_Ar: "$Organizations_Details.Organization_Title_Ar",
                              Is_Reviewed: "$Organizations_Details.Is_Reviewed",
                              Is_Suspended: "$Organizations_Details.Is_Suspended",
                            },
                
                        }
                    },
                
                ]).skip(skip).limit(pageSize); 
            }
            //#endregion
        } 
        else if(suspendStatus.trim()==="only-false")
        {
            //#region only-false
            if (pageNumber=="0") {
                return await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Business: true,
                            Business_Organization_ID:new ObjectId(val_Business_Organization_ID),
                            Is_Suspended: false 
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Roles_Details'
                        }
                    },
                
                    {$unwind: '$User_Roles_Details'},
                
                    {
                        $lookup:
                        {
                            from: 'Business_Organizations_LKP',
                            localField: 'Business_Organization_ID',
                            foreignField: '_id',
                            as: 'Organizations_Details'
                        }
                    },
                
                    {$unwind: '$Organizations_Details'},
                
                
                    {
                        $project:
                        {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            First_Name: 1,
                            Last_Name: 1,
                            Phone_Number: 1,
                            Email: 1,
                            Address: 1,
                            Location: 1,
                            Photo_Profile: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Is_Verified: 1,
                            Updated_By: 1,
                            LastUpdate_DateTime: 1,
                            Last_Login_DateTime: 1,
                
                            User_Roles_Details: 
                            {
                              Role_ID: "$User_Roles_Details._id",
                              Serial_Number: "$User_Roles_Details.Serial_Number",
                              Role_Title_En: "$User_Roles_Details.Role_Title_En",
                            },
                
                            Organizations_Details:
                            {
                              id: "$Organizations_Details._id",
                              Serial_Number: "$Organizations_Details.Serial_Number",
                              Organization_Title_En: "$Organizations_Details.Organization_Title_En",
                              Organization_Title_Ar: "$Organizations_Details.Organization_Title_Ar",
                              Is_Reviewed: "$Organizations_Details.Is_Reviewed",
                              Is_Suspended: "$Organizations_Details.Is_Suspended",
                            },
                
                        }
                    },
                
                ]);
            } else {
                return await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Business: true,
                            Business_Organization_ID:new ObjectId(val_Business_Organization_ID),
                            Is_Suspended: false 
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Roles_Details'
                        }
                    },
                
                    {$unwind: '$User_Roles_Details'},
                
                    {
                        $lookup:
                        {
                            from: 'Business_Organizations_LKP',
                            localField: 'Business_Organization_ID',
                            foreignField: '_id',
                            as: 'Organizations_Details'
                        }
                    },
                
                    {$unwind: '$Organizations_Details'},
                
                
                    {
                        $project:
                        {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            First_Name: 1,
                            Last_Name: 1,
                            Phone_Number: 1,
                            Email: 1,
                            Address: 1,
                            Location: 1,
                            Photo_Profile: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Is_Verified: 1,
                            Updated_By: 1,
                            LastUpdate_DateTime: 1,
                            Last_Login_DateTime: 1,
                
                            User_Roles_Details: 
                            {
                              Role_ID: "$User_Roles_Details._id",
                              Serial_Number: "$User_Roles_Details.Serial_Number",
                              Role_Title_En: "$User_Roles_Details.Role_Title_En",
                            },
                
                            Organizations_Details:
                            {
                              id: "$Organizations_Details._id",
                              Serial_Number: "$Organizations_Details.Serial_Number",
                              Organization_Title_En: "$Organizations_Details.Organization_Title_En",
                              Organization_Title_Ar: "$Organizations_Details.Organization_Title_Ar",
                              Is_Reviewed: "$Organizations_Details.Is_Reviewed",
                              Is_Suspended: "$Organizations_Details.Is_Suspended",
                            },
                
                        }
                    },
                
                ]).skip(skip).limit(pageSize); 
            }
            //#endregion
        }
        else if(suspendStatus.trim()==="all") 
        {
            //#region all
            if (pageNumber=="0") {
                return await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Business: true,
                            Business_Organization_ID:new ObjectId(val_Business_Organization_ID)
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Roles_Details'
                        }
                    },
                
                    {$unwind: '$User_Roles_Details'},
                
                    {
                        $lookup:
                        {
                            from: 'Business_Organizations_LKP',
                            localField: 'Business_Organization_ID',
                            foreignField: '_id',
                            as: 'Organizations_Details'
                        }
                    },
                
                    {$unwind: '$Organizations_Details'},
                
                
                    {
                        $project:
                        {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            First_Name: 1,
                            Last_Name: 1,
                            Phone_Number: 1,
                            Email: 1,
                            Address: 1,
                            Location: 1,
                            Photo_Profile: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Is_Verified: 1,
                            Updated_By: 1,
                            LastUpdate_DateTime: 1,
                            Last_Login_DateTime: 1,
                
                            User_Roles_Details: 
                            {
                              Role_ID: "$User_Roles_Details._id",
                              Serial_Number: "$User_Roles_Details.Serial_Number",
                              Role_Title_En: "$User_Roles_Details.Role_Title_En",
                            },
                
                            Organizations_Details:
                            {
                              id: "$Organizations_Details._id",
                              Serial_Number: "$Organizations_Details.Serial_Number",
                              Organization_Title_En: "$Organizations_Details.Organization_Title_En",
                              Organization_Title_Ar: "$Organizations_Details.Organization_Title_Ar",
                              Is_Reviewed: "$Organizations_Details.Is_Reviewed",
                              Is_Suspended: "$Organizations_Details.Is_Suspended",
                            },
                
                        }
                    },
                
                ]);
            } else {
                return await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Business: true,
                            Business_Organization_ID:new ObjectId(val_Business_Organization_ID)
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'User_Roles_LKP',
                            localField: 'User_Roles_ID',
                            foreignField: '_id',
                            as: 'User_Roles_Details'
                        }
                    },
                
                    {$unwind: '$User_Roles_Details'},
                
                    {
                        $lookup:
                        {
                            from: 'Business_Organizations_LKP',
                            localField: 'Business_Organization_ID',
                            foreignField: '_id',
                            as: 'Organizations_Details'
                        }
                    },
                
                    {$unwind: '$Organizations_Details'},
                
                
                    {
                        $project:
                        {
                            id: "$_id",
                            _id:0,
                            Serial_Number: 1,
                            First_Name: 1,
                            Last_Name: 1,
                            Phone_Number: 1,
                            Email: 1,
                            Address: 1,
                            Location: 1,
                            Photo_Profile: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Is_Suspended: 1,
                            Is_Verified: 1,
                            Updated_By: 1,
                            LastUpdate_DateTime: 1,
                            Last_Login_DateTime: 1,
                
                            User_Roles_Details: 
                            {
                              Role_ID: "$User_Roles_Details._id",
                              Serial_Number: "$User_Roles_Details.Serial_Number",
                              Role_Title_En: "$User_Roles_Details.Role_Title_En",
                            },
                
                            Organizations_Details:
                            {
                              id: "$Organizations_Details._id",
                              Serial_Number: "$Organizations_Details.Serial_Number",
                              Organization_Title_En: "$Organizations_Details.Organization_Title_En",
                              Organization_Title_Ar: "$Organizations_Details.Organization_Title_Ar",
                              Is_Reviewed: "$Organizations_Details.Is_Reviewed",
                              Is_Suspended: "$Organizations_Details.Is_Suspended",
                            },
                
                        }
                    },
                
                ]).skip(skip).limit(pageSize); 
            }
            //#endregion
        }
        else{
            return"";
        }
    } catch (error) {
        logger.error(error.message);
    }
     
};

exports.check_Code_Existancy = async (val_User_ID , val_Code , tbl_Name) => {
    try {
        var tbl_Model = ""

        if (tbl_Name=="useremailverification_log") {
            tbl_Model = require("../models/useremailverification_log");
        } else if (tbl_Name=="userphoneverification_log") {
            tbl_Model = require("../models/userphoneverification_log");
        }

        const itemsCount = await tbl_Model.find({
            $and:
            [
                {User_ID: val_User_ID},
                {Code: val_Code},
            ]
        })
        //return (itemsCount.length)<=0 ? false : true;
        return itemsCount;
    } catch (error) {
        logger.error(error.message);
    }
     
};

exports.Verification_Expiration = async (val_User_ID , val_Code , tbl_Name) => {
    try {
        var tbl_Model = ""

        if (tbl_Name=="useremailverification_log") {
            tbl_Model = require("../models/useremailverification_log");
        } else if (tbl_Name=="userphoneverification_log") {
            tbl_Model = require("../models/userphoneverification_log");
        }

        return await tbl_Model.updateMany(
            { 
              $and: [
                { User_ID: val_User_ID },
                { Code: val_Code }
              ]
            }, 
            { $set: { Updated_DateTime : now_DateTime.get_DateTime() , Is_Expired : true }}
          );

    } catch (error) {
        logger.error(error.message);
    }
     
};

exports.get_User_Data_By_ID = async (val_User_ID) => {
    try {
        return await tbl_Model.findById({_id:val_User_ID});
    } catch (error) {
        logger.error(error.message);
    }
};

exports.update_Verification = async (val_User_ID , status ) => {
    try {

        return await tbl_Model.updateMany(
            { _id: val_User_ID }, 
            { $set: { LastUpdate_DateTime : now_DateTime.get_DateTime() , Is_Verified : status }}
          );

    } catch (error) {
        logger.error(error.message);
    }
};

exports.Expire_All_User_Codes = async (val_User_ID , tbl_Name) => {
    try {
        var tbl_Model = ""

        if (tbl_Name=="useremailverification_log") {
            tbl_Model = require("../models/useremailverification_log");
        } else if (tbl_Name=="userphoneverification_log") {
            tbl_Model = require("../models/userphoneverification_log");
        }

        return await tbl_Model.updateMany(
            { User_ID: val_User_ID }, 
            { $set: { Updated_DateTime : now_DateTime.get_DateTime() , Is_Expired : true }}
          );

    } catch (error) {
        logger.error(error.message);
    }
     
};

exports.get_User_Email = async (val_User_ID) => {
    try {
        return await tbl_Model.findById(val_User_ID).select("Email");
    } catch (error) {
        logger.error(error.message);
    }
};

exports.get_User_Phone_Number = async (val_User_ID) => {
    try {
        return await tbl_Model.findById(val_User_ID).select("Phone_Number");
    } catch (error) {
        logger.error(error.message);
    }
};

exports.Check_Email_To_Who = async (Val_Email) => {
    try {
        return await tbl_Model.find({Email:Val_Email});
    } catch (error) {
        logger.error(error.message);
    }
};

exports.check_Name_Existancy = async (val_User_ID , val_First_Name , val_Last_Name )=>{
    itemsCount = await tbl_Model.find
    ({
        $and:
        [
            { First_Name: val_First_Name },
            { Last_Name: val_Last_Name },
            {'_id': {$ne : val_User_ID}}
        ]
    });
    return (itemsCount.length)<=0 ? false : true;
};

exports.check_Address_Existancy = async (val_User_ID , val_Address )=>{
    itemsCount = await tbl_Model.find
    ({
        $and:
        [
            { First_Name: val_Address },
            {'_id': {$ne : val_User_ID}}
        ]
    });
    return (itemsCount.length)<=0 ? false : true;
};

exports.Check_PhoneNumber_Existancy = async (val_User_ID,Val_New_Phone_Number) => {
    try {

        let itemsCount = await tbl_Model.find
        ({
            $and:
            [
                { Phone_Number:Val_New_Phone_Number },
                {'_id': {$ne : val_User_ID}}
            ]
        });

        return (itemsCount.length)<=0 ? false : true;
    } catch (error) {
        logger.error(error.message);
    }
};

exports.Check_Email_Existancy = async (val_User_ID,Val_New_Email) => {
    try {
        let itemsCount = await tbl_Model.find
        ({
            $and:
            [
                { Email:Val_New_Email },
                {'_id': {$ne : val_User_ID}}
            ]
        });

        return (itemsCount.length)<=0 ? false : true;
    } catch (error) {
        logger.error(error.message);
    }
};

exports.update_Email = async (val_User_ID , Val_New_Email ) => {
    try {

        return await tbl_Model.updateMany(
            { _id: val_User_ID }, 
            { $set: { LastUpdate_DateTime : now_DateTime.get_DateTime() , Email : Val_New_Email }}
          );

    } catch (error) {
        logger.error(error.message);
    }
};

exports.update_Phone_Number = async (val_User_ID , Val_New_Phone_Number ) => {
    try {

        return await tbl_Model.updateMany(
            { _id: val_User_ID }, 
            { $set: { LastUpdate_DateTime : now_DateTime.get_DateTime() , Phone_Number : Val_New_Phone_Number }}
          );

    } catch (error) {
        logger.error(error.message);
    }
};

exports.update_My_Profile_Data = async (id , tblObject , is_Delete_Old_Image) => {
    try {
        var filePathToDelete = ""

        //#region Get Old Photo Path
        let get_Photo_Path_Promise = new Promise(async (resolve, reject)=>{
            filePathToDelete = obj_Get_Photo_Path.get_Photo_Path(id,"user_data");
            resolve(filePathToDelete);
        });
        get_Photo_Path_Promise.then((flg) => {                
            filePathToDelete=flg
        })
        //#endregion
        const updatedDoc = await tbl_Model.findByIdAndUpdate(id, tblObject, { new: true });

        if (is_Delete_Old_Image) {
            console.log("filePathToDelete = "+filePathToDelete)
            //const fs = require('fs');
            //await fs.promises.unlink(filePathToDelete);
        }

        return updatedDoc;

    } catch (error) {
        logger.error(error.message);
    }
};

exports.update_Password = async (val_User_ID , val_Updated_By , Val_Password ) => {
    try {

        return await tbl_Model.updateMany(
            { _id: val_User_ID }, 
            { $set: { LastUpdate_DateTime : now_DateTime.get_DateTime() , Password : Val_Password , Updated_By : val_Updated_By }}
          );

    } catch (error) {
        logger.error(error.message);
    }
};
