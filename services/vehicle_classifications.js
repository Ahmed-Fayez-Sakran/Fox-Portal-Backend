//#region Global Variables
var tbl_Model = require("../models/vehicles_categories_per_subservices");
var sub_services_lkp_Model = require("../models/sub_services_lkp");
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
        val_Returned_Object = await tbl_Model.aggregate
        ([

          { $match: { Is_Suspended: true } },

          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_Id',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
        
        ]);
      }
      else
      {
        val_Returned_Object = await tbl_Model.aggregate
        ([

          { $match: { Is_Suspended: true } },

          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_Id',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
        
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
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_Id',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
        
        ]);
      }
      else
      {
        val_Returned_Object = await tbl_Model.aggregate
        ([

          { $match: { Is_Suspended: false } },

          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_Id',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
        
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
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_Id',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
        
        ]); 
      } 
      else
      {
        val_Returned_Object = await tbl_Model.aggregate
        ([

          {
            $lookup:
            {
              from: 'Sub_Services_LKP',
                    localField: 'Sub_Service_Id',
                    foreignField: '_id',
                    as: 'Sub_Services_Details'
            }
          },
        
          {$unwind: '$Sub_Services_Details'},
        
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

exports.check_Existancy = async (val_Vehicle_Id  , val_Category_ID) => {
  try {
    
    tbl_Model = require("../models/vehicles_classification");
    return await tbl_Model.find
    ({
      $and:
      [
        {Vehicle_Id:new ObjectId(val_Vehicle_Id)},
        {Category_ID:new ObjectId(val_Category_ID)}
      ]      
    }); 

  } catch (error) {
      logger.error(error.message);
  }
};


