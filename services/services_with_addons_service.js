//#region Global Variables
var tbl_Model = require("../models/services_with_addons");
const now_DateTime = require('../helpers/fun_datetime');
const logger = require('../utils/logger');
var ObjectId = require('mongodb').ObjectId;
//#endregion

exports.get_Data_By_SuspendStatus = async (suspendStatus,pageNumber) => {
    try {
        //#region set Variables
        var tbl_Object = ""
        var pageSize = 10 ;
        var skip = (pageNumber - 1) * pageSize;
        var tbl_Sub_Services_LKP_Model = require("../models/sub_services_lkp");
        var tbl_Addons_LKP_Model = require("../models/addons_lkp");
        //#endregion

        if (suspendStatus.trim() ==="only-true") {
            //#region only-true
            if (pageNumber=="0") {
                tbl_Object = await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Suspended: true 
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'Addons_LKP',
                            localField: 'Addons_ID',
                            foreignField: '_id',
                            as: 'Addons_Details'
                        }
                    },
                
                    {$unwind: '$Addons_Details'},
                    
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
                            Addons_ID: 1,
                            Sub_Service_ID: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Is_Suspended: 1,
                
                            Addons_Details: 
                            {
                            Addons_Title_En: "$Addons_Details.Addons_Title_En",
                            Addons_Title_Ar: "$Addons_Details.Addons_Title_Ar",
                            Addons_Description_En: "$Addons_Details.Addons_Description_En",
                            Addons_Description_Ar: "$Addons_Details.Addons_Description_Ar",
                            Photo_Path: "$Addons_Details.Photo_Path",
                            Inserted_By: "$Addons_Details.Inserted_By",
                            Inserted_DateTime: "$Addons_Details.Inserted_DateTime",
                            Updated_By: "$Addons_Details.Updated_By",
                            Updated_DateTime: "$Addons_Details.Updated_DateTime",
                            Is_Suspended: "$Addons_Details.Is_Suspended",
                            },
                
                            Sub_Services_Details:
                            {
                            id: "$Sub_Services_Details._id",
                            Serial_Number: "$Sub_Services_Details.Serial_Number",
                            Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                            Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                            Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                            Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                        }
                    }	
                
                ]);
            } else {
                tbl_Object = await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Suspended: true
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'Addons_LKP',
                            localField: 'Addons_ID',
                            foreignField: '_id',
                            as: 'Addons_Details'
                        }
                    },
                
                    {$unwind: '$Addons_Details'},
                    
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
                            Addons_ID: 1,
                            Sub_Service_ID: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Is_Suspended: 1,
                
                            Addons_Details: 
                            {
                            Addons_Title_En: "$Addons_Details.Addons_Title_En",
                            Addons_Title_Ar: "$Addons_Details.Addons_Title_Ar",
                            Addons_Description_En: "$Addons_Details.Addons_Description_En",
                            Addons_Description_Ar: "$Addons_Details.Addons_Description_Ar",
                            Photo_Path: "$Addons_Details.Photo_Path",
                            Inserted_By: "$Addons_Details.Inserted_By",
                            Inserted_DateTime: "$Addons_Details.Inserted_DateTime",
                            Updated_By: "$Addons_Details.Updated_By",
                            Updated_DateTime: "$Addons_Details.Updated_DateTime",
                            Is_Suspended: "$Addons_Details.Is_Suspended",
                            },
                
                            Sub_Services_Details:
                            {
                            id: "$Sub_Services_Details._id",
                            Serial_Number: "$Sub_Services_Details.Serial_Number",
                            Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                            Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                            Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                            Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                        }
                    }	
                
                ]).skip(skip).limit(pageSize);
            }
            //#endregion            
        } else if(suspendStatus.trim() ==="only-false") {
            //#region only-false
            if (pageNumber=="0") {
                tbl_Object = await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Suspended: false 
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'Addons_LKP',
                            localField: 'Addons_ID',
                            foreignField: '_id',
                            as: 'Addons_Details'
                        }
                    },
                
                    {$unwind: '$Addons_Details'},
                    
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
                            Addons_ID: 1,
                            Sub_Service_ID: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Is_Suspended: 1,
                
                            Addons_Details: 
                            {
                            Addons_Title_En: "$Addons_Details.Addons_Title_En",
                            Addons_Title_Ar: "$Addons_Details.Addons_Title_Ar",
                            Addons_Description_En: "$Addons_Details.Addons_Description_En",
                            Addons_Description_Ar: "$Addons_Details.Addons_Description_Ar",
                            Photo_Path: "$Addons_Details.Photo_Path",
                            Inserted_By: "$Addons_Details.Inserted_By",
                            Inserted_DateTime: "$Addons_Details.Inserted_DateTime",
                            Updated_By: "$Addons_Details.Updated_By",
                            Updated_DateTime: "$Addons_Details.Updated_DateTime",
                            Is_Suspended: "$Addons_Details.Is_Suspended",
                            },
                
                            Sub_Services_Details:
                            {
                            id: "$Sub_Services_Details._id",
                            Serial_Number: "$Sub_Services_Details.Serial_Number",
                            Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                            Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                            Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                            Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                        }
                    }	
                
                ]);
            } else {
                tbl_Object = await tbl_Model.aggregate
                ([

                    {
                        $match:
                        {
                            Is_Suspended: false
                        }
                    },
                
                    {
                        $lookup:
                        {
                            from: 'Addons_LKP',
                            localField: 'Addons_ID',
                            foreignField: '_id',
                            as: 'Addons_Details'
                        }
                    },
                
                    {$unwind: '$Addons_Details'},
                    
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
                            Addons_ID: 1,
                            Sub_Service_ID: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Is_Suspended: 1,
                
                            Addons_Details: 
                            {
                            Addons_Title_En: "$Addons_Details.Addons_Title_En",
                            Addons_Title_Ar: "$Addons_Details.Addons_Title_Ar",
                            Addons_Description_En: "$Addons_Details.Addons_Description_En",
                            Addons_Description_Ar: "$Addons_Details.Addons_Description_Ar",
                            Photo_Path: "$Addons_Details.Photo_Path",
                            Inserted_By: "$Addons_Details.Inserted_By",
                            Inserted_DateTime: "$Addons_Details.Inserted_DateTime",
                            Updated_By: "$Addons_Details.Updated_By",
                            Updated_DateTime: "$Addons_Details.Updated_DateTime",
                            Is_Suspended: "$Addons_Details.Is_Suspended",
                            },
                
                            Sub_Services_Details:
                            {
                            id: "$Sub_Services_Details._id",
                            Serial_Number: "$Sub_Services_Details.Serial_Number",
                            Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                            Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                            Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                            Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                        }
                    }	
                
                ]).skip(skip).limit(pageSize);
            }
            //#endregion            
        } else if(suspendStatus.trim() ==="all")  {
            //#region all
            if (pageNumber=="0") {
                tbl_Object = await tbl_Model.aggregate
                ([
                
                    {
                        $lookup:
                        {
                            from: 'Addons_LKP',
                            localField: 'Addons_ID',
                            foreignField: '_id',
                            as: 'Addons_Details'
                        }
                    },
                
                    {$unwind: '$Addons_Details'},
                    
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
                            Addons_ID: 1,
                            Sub_Service_ID: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Is_Suspended: 1,
                
                            Addons_Details: 
                            {
                            Addons_Title_En: "$Addons_Details.Addons_Title_En",
                            Addons_Title_Ar: "$Addons_Details.Addons_Title_Ar",
                            Addons_Description_En: "$Addons_Details.Addons_Description_En",
                            Addons_Description_Ar: "$Addons_Details.Addons_Description_Ar",
                            Photo_Path: "$Addons_Details.Photo_Path",
                            Inserted_By: "$Addons_Details.Inserted_By",
                            Inserted_DateTime: "$Addons_Details.Inserted_DateTime",
                            Updated_By: "$Addons_Details.Updated_By",
                            Updated_DateTime: "$Addons_Details.Updated_DateTime",
                            Is_Suspended: "$Addons_Details.Is_Suspended",
                            },
                
                            Sub_Services_Details:
                            {
                            id: "$Sub_Services_Details._id",
                            Serial_Number: "$Sub_Services_Details.Serial_Number",
                            Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                            Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                            Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                            Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                        }
                    }	
                
                ]);
            } else {
                tbl_Object = await tbl_Model.aggregate
                ([
                
                    {
                        $lookup:
                        {
                            from: 'Addons_LKP',
                            localField: 'Addons_ID',
                            foreignField: '_id',
                            as: 'Addons_Details'
                        }
                    },
                
                    {$unwind: '$Addons_Details'},
                    
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
                            Addons_ID: 1,
                            Sub_Service_ID: 1,
                            Inserted_By: 1,
                            Inserted_DateTime: 1,
                            Updated_By: 1,
                            Updated_DateTime: 1,
                            Is_Suspended: 1,
                
                            Addons_Details: 
                            {
                            Addons_Title_En: "$Addons_Details.Addons_Title_En",
                            Addons_Title_Ar: "$Addons_Details.Addons_Title_Ar",
                            Addons_Description_En: "$Addons_Details.Addons_Description_En",
                            Addons_Description_Ar: "$Addons_Details.Addons_Description_Ar",
                            Photo_Path: "$Addons_Details.Photo_Path",
                            Inserted_By: "$Addons_Details.Inserted_By",
                            Inserted_DateTime: "$Addons_Details.Inserted_DateTime",
                            Updated_By: "$Addons_Details.Updated_By",
                            Updated_DateTime: "$Addons_Details.Updated_DateTime",
                            Is_Suspended: "$Addons_Details.Is_Suspended",
                            },
                
                            Sub_Services_Details:
                            {
                            id: "$Sub_Services_Details._id",
                            Serial_Number: "$Sub_Services_Details.Serial_Number",
                            Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                            Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                            Main_Service_Id: "$Sub_Services_Details.Main_Service_Id",
                            Is_Suspended: "$Sub_Services_Details.Is_Suspended",
                            },
                        }
                    }	
                
                ]).skip(skip).limit(pageSize);
            }
            //#endregion
        }else {
            return "" ;
        }
        
        return tbl_Object;

    } catch (err) {
        logger.error(err.message);
    }
     
};

exports.check_Existancy = async (val_Id , val_Operation , val_Addons_ID , val_Sub_Service_ID) => {

    try {

        let itemsCount = ""
       
        if (val_Operation=="insert") {
            //#region insert
            itemsCount = await tbl_Model.find({
                $and: [
                    { Addons_ID: new ObjectId(val_Addons_ID) },
                    { Sub_Service_ID: new ObjectId(val_Sub_Service_ID) },
                    { Is_Suspended: false }
                ]
            }).count();
            //#endregion
        } else {
             //#region update
             itemsCount = await tbl_Model.find({
                $and: [
                    { Addons_ID: new ObjectId(val_Addons_ID) },
                    { Sub_Service_ID: new ObjectId(val_Sub_Service_ID) },
                    { Is_Suspended: false },
                    {'_id': {$ne : val_Id}}
                ]
            }).count();
            //#endregion
        }
        console.log("check title existancy --> itemsCount = "+itemsCount)
        return itemsCount <=0 ? false : true;
    } catch (err) {
        logger.error(err.message);
    }

};