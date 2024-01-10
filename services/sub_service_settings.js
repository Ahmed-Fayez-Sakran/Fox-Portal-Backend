//#region Global Variables
var tbl_Model = require("../models/sub_services_lkp");
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
                        from: 'Main_Services_LKP',
                        localField: 'Main_Service_Id',
                        foreignField: '_id',
                        as: 'Main_Service_Details'
                    }
                },
                        
                {$unwind: '$Main_Service_Details'},
                        
            ]).skip(skip).limit(pageSize);
        } else if(suspendStatus.trim() ==="only-false") {
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
                        from: 'Main_Services_LKP',
                        localField: 'Main_Service_Id',
                        foreignField: '_id',
                        as: 'Main_Service_Details'
                    }
                },
                        
                {$unwind: '$Main_Service_Details'},
                        
            ]).skip(skip).limit(pageSize);
        } else if(suspendStatus.trim() ==="all")  {
            tbl_Object = await tbl_Model.aggregate
            ([
                {
                    $lookup:
                    {
                        from: 'Main_Services_LKP',
                        localField: 'Main_Service_Id',
                        foreignField: '_id',
                        as: 'Main_Service_Details'
                    }
                },
                        
                {$unwind: '$Main_Service_Details'},
                        
            ]).skip(skip).limit(pageSize);
        }else {
            return "" ;
        }
                
        return tbl_Object;

    } catch (err) {
        logger.error(err.message);
    }
     
};