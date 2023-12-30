//#region Global Variables
var tbl_Model = require("../models/Sub_Services_LKP");
const now_DateTime = require('../helpers/fun_datetime');
const logger = require('../utils/logger');
//#endregion

exports.get_Data_By_SuspendStatus = async (suspendStatus,pageNumber) => {
    try {
        var pageSize = 10;
        var skip = (pageNumber - 1) * pageSize;
        var tbl_Object = ""
        var Main_Services_LKP_Model = require("../models/main_services_lkp");

        if (suspendStatus.trim() ==="only-true") {
            tbl_Object = await Main_Services_LKP_Model.aggregate
            ([
                
                {
                    $lookup:
                    {
                    from: 'Sub_Services_LKP',
                    localField: '_id',
                    foreignField: 'Main_Service_Id',
                    as: 'Sub_Services_Details'
                    }
                },
            
                {$unwind: '$Sub_Services_Details'},
            
                {
                  $match:
                  {
                    "Sub_Services_Details.Is_Suspended": true
                  }
                },
            
                {
                    $project:
                    {
                                _id:0,
                                Main_Service_Serial_Number: "$Serial_Number",
                                Main_Service_id: "$_id",
                                Main_Service_Title_En: "$Service_Title_En",
                                Main_Service_Title_Ar: "$Service_Title_Ar",
                                Main_Service_Is_Suspended: "$Is_Suspended",
            
                                Sub_Service_Serial_Number: "$Sub_Services_Details.Serial_Number",
                                Sub_Service_id: "$Sub_Services_Details._id",
                                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                                Sub_Service_Is_Suspended: "$Sub_Services_Details.Is_Suspended",
            
                    }
                },
            
            ]).skip(skip).limit(pageSize);
        } else if(suspendStatus.trim() ==="only-false") {
            tbl_Object = await Main_Services_LKP_Model.aggregate
            ([
                {
                    $lookup:
                    {
                    from: 'Sub_Services_LKP',
                    localField: '_id',
                    foreignField: 'Main_Service_Id',
                    as: 'Sub_Services_Details'
                    }
                },
            
                {$unwind: '$Sub_Services_Details'},
            
                {
                  $match:
                  {
                    "Sub_Services_Details.Is_Suspended": false
                  }
                },
            
                {
                    $project:
                    {
                                _id:0,
                                Main_Service_Serial_Number: "$Serial_Number",
                                Main_Service_id: "$_id",
                                Main_Service_Title_En: "$Service_Title_En",
                                Main_Service_Title_Ar: "$Service_Title_Ar",
                                Main_Service_Is_Suspended: "$Is_Suspended",
            
                                Sub_Service_Serial_Number: "$Sub_Services_Details.Serial_Number",
                                Sub_Service_id: "$Sub_Services_Details._id",
                                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                                Sub_Service_Is_Suspended: "$Sub_Services_Details.Is_Suspended",
            
                    }
                },
            
            ]).skip(skip).limit(pageSize);
        } else if(suspendStatus.trim() ==="all")  {
            tbl_Object = await Main_Services_LKP_Model.aggregate
            ([
                {
                    $lookup:
                    {
                    from: 'Sub_Services_LKP',
                    localField: '_id',
                    foreignField: 'Main_Service_Id',
                    as: 'Sub_Services_Details'
                    }
                },
            
                {$unwind: '$Sub_Services_Details'},
            
                {
                    $project:
                    {
                                _id:0,
                                Main_Service_Serial_Number: "$Serial_Number",
                                Main_Service_id: "$_id",
                                Main_Service_Title_En: "$Service_Title_En",
                                Main_Service_Title_Ar: "$Service_Title_Ar",
                                Main_Service_Is_Suspended: "$Is_Suspended",
            
                                Sub_Service_Serial_Number: "$Sub_Services_Details.Serial_Number",
                                Sub_Service_id: "$Sub_Services_Details._id",
                                Sub_Service_Title_En: "$Sub_Services_Details.Sub_Service_Title_En",
                                Sub_Service_Title_Ar: "$Sub_Services_Details.Sub_Service_Title_Ar",
                                Sub_Service_Is_Suspended: "$Sub_Services_Details.Is_Suspended",
            
                    }
                },
            
            ]).skip(skip).limit(pageSize);
        }else {
            return "" ;
        }
                
        return tbl_Object;

    } catch (err) {
        logger.error(err.message);
    }
     
};