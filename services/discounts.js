//#region Global Variables
var tbl_Model = require("../models/discount_method_lkp");
var Discount_Type_LKP_Model = require("../models/discount_type_lkp");
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
        val_Returned_Object = await Discount_Type_LKP_Model.aggregate
        ([

            {
                $lookup: 
                {
                    from: 'Discount_Method_LKP',
                    localField: '_id',
                    foreignField: 'Discount_Type_ID',
                    as: 'Discount_Method_LKP_Details'
                }
            },
            { $unwind: '$Discount_Method_LKP_Details' },

            { $match: { 'Discount_Method_LKP_Details.Is_Suspended': true } },

            {
                $project:
                {
                    id: "$Discount_Method_LKP_Details._id",
                    _id:0,
                    Title_En: 1,
                    Title_Ar: 1,

                    Serial_Number: "$Discount_Method_LKP_Details.Serial_Number",
                    Method_Title_En: "$Discount_Method_LKP_Details.Method_Title_En",
                    Method_Title_Ar: "$Discount_Method_LKP_Details.Method_Title_Ar",
                    Discount_Type_ID: "$Discount_Method_LKP_Details.Discount_Type_ID",
                    Is_Suspended: "$Discount_Method_LKP_Details.Is_Suspended",
                    value:
                    {
                        $cond:
                        {
                            if: { $gt: ['$Discount_Method_LKP_Details.Fixed_Rate', 0] }, 
                            then: '$Discount_Method_LKP_Details.Fixed_Rate',
                            else: '$Discount_Method_LKP_Details.Percentage_Rate'
                        }
                    }
                }
            },
            
        ]);
      }
      else
      {
        val_Returned_Object = await Discount_Type_LKP_Model.aggregate
        ([

            {
                $lookup: 
                {
                    from: 'Discount_Method_LKP',
                    localField: '_id',
                    foreignField: 'Discount_Type_ID',
                    as: 'Discount_Method_LKP_Details'
                }
            },
            { $unwind: '$Discount_Method_LKP_Details' },

            { $match: { 'Discount_Method_LKP_Details.Is_Suspended': true } },

            {
                $project:
                {
                    id: "$Discount_Method_LKP_Details._id",
                    _id:0,
                    Title_En: 1,
                    Title_Ar: 1,

                    Serial_Number: "$Discount_Method_LKP_Details.Serial_Number",
                    Method_Title_En: "$Discount_Method_LKP_Details.Method_Title_En",
                    Method_Title_Ar: "$Discount_Method_LKP_Details.Method_Title_Ar",
                    Discount_Type_ID: "$Discount_Method_LKP_Details.Discount_Type_ID",
                    Is_Suspended: "$Discount_Method_LKP_Details.Is_Suspended",
                    value:
                    {
                        $cond:
                        {
                            if: { $gt: ['$Discount_Method_LKP_Details.Fixed_Rate', 0] }, 
                            then: '$Discount_Method_LKP_Details.Fixed_Rate',
                            else: '$Discount_Method_LKP_Details.Percentage_Rate'
                        }
                    }
                }
            },
            
        ]).skip(skip).limit(pageSize);
      }
    }
    else if(suspendStatus.trim()==="only-false")
    {
      if (pageNumber=="0")
      {
        val_Returned_Object = await Discount_Type_LKP_Model.aggregate
        ([

            {
                $lookup: 
                {
                    from: 'Discount_Method_LKP',
                    localField: '_id',
                    foreignField: 'Discount_Type_ID',
                    as: 'Discount_Method_LKP_Details'
                }
            },
            { $unwind: '$Discount_Method_LKP_Details' },

            { $match: { 'Discount_Method_LKP_Details.Is_Suspended': false } },

            {
                $project:
                {
                    id: "$Discount_Method_LKP_Details._id",
                    _id:0,
                    Title_En: 1,
                    Title_Ar: 1,

                    Serial_Number: "$Discount_Method_LKP_Details.Serial_Number",
                    Method_Title_En: "$Discount_Method_LKP_Details.Method_Title_En",
                    Method_Title_Ar: "$Discount_Method_LKP_Details.Method_Title_Ar",
                    Discount_Type_ID: "$Discount_Method_LKP_Details.Discount_Type_ID",
                    Is_Suspended: "$Discount_Method_LKP_Details.Is_Suspended",
                    value:
                    {
                        $cond:
                        {
                            if: { $gt: ['$Discount_Method_LKP_Details.Fixed_Rate', 0] }, 
                            then: '$Discount_Method_LKP_Details.Fixed_Rate',
                            else: '$Discount_Method_LKP_Details.Percentage_Rate'
                        }
                    }
                }
            },
            
        ]);
      }
      else
      {
        val_Returned_Object = await Discount_Type_LKP_Model.aggregate
        ([

            {
                $lookup: 
                {
                    from: 'Discount_Method_LKP',
                    localField: '_id',
                    foreignField: 'Discount_Type_ID',
                    as: 'Discount_Method_LKP_Details'
                }
            },
            { $unwind: '$Discount_Method_LKP_Details' },

            { $match: { 'Discount_Method_LKP_Details.Is_Suspended': false } },

            {
                $project:
                {
                    id: "$Discount_Method_LKP_Details._id",
                    _id:0,
                    Title_En: 1,
                    Title_Ar: 1,

                    Serial_Number: "$Discount_Method_LKP_Details.Serial_Number",
                    Method_Title_En: "$Discount_Method_LKP_Details.Method_Title_En",
                    Method_Title_Ar: "$Discount_Method_LKP_Details.Method_Title_Ar",
                    Discount_Type_ID: "$Discount_Method_LKP_Details.Discount_Type_ID",
                    Is_Suspended: "$Discount_Method_LKP_Details.Is_Suspended",
                    value:
                    {
                        $cond:
                        {
                            if: { $gt: ['$Discount_Method_LKP_Details.Fixed_Rate', 0] }, 
                            then: '$Discount_Method_LKP_Details.Fixed_Rate',
                            else: '$Discount_Method_LKP_Details.Percentage_Rate'
                        }
                    }
                }
            },
            
        ]).skip(skip).limit(pageSize);
      }
    }
    else if(suspendStatus.trim()==="all")
    {
      if (pageNumber=="0")
      {
        val_Returned_Object = await Discount_Type_LKP_Model.aggregate
        ([

            {
                $lookup: 
                {
                    from: 'Discount_Method_LKP',
                    localField: '_id',
                    foreignField: 'Discount_Type_ID',
                    as: 'Discount_Method_LKP_Details'
                }
            },
            { $unwind: '$Discount_Method_LKP_Details' },

            {
                $project:
                {
                    id: "$Discount_Method_LKP_Details._id",
                    _id:0,
                    Title_En: 1,
                    Title_Ar: 1,

                    Serial_Number: "$Discount_Method_LKP_Details.Serial_Number",
                    Method_Title_En: "$Discount_Method_LKP_Details.Method_Title_En",
                    Method_Title_Ar: "$Discount_Method_LKP_Details.Method_Title_Ar",
                    Discount_Type_ID: "$Discount_Method_LKP_Details.Discount_Type_ID",
                    Is_Suspended: "$Discount_Method_LKP_Details.Is_Suspended",
                    value:
                    {
                        $cond:
                        {
                            if: { $gt: ['$Discount_Method_LKP_Details.Fixed_Rate', 0] }, 
                            then: '$Discount_Method_LKP_Details.Fixed_Rate',
                            else: '$Discount_Method_LKP_Details.Percentage_Rate'
                        }
                    }
                }
            },
            
        ]);
      }
      else
      {
        val_Returned_Object = await Discount_Type_LKP_Model.aggregate
        ([

            {
                $lookup: 
                {
                    from: 'Discount_Method_LKP',
                    localField: '_id',
                    foreignField: 'Discount_Type_ID',
                    as: 'Discount_Method_LKP_Details'
                }
            },
            { $unwind: '$Discount_Method_LKP_Details' },

            {
                $project:
                {
                    id: "$Discount_Method_LKP_Details._id",
                    _id:0,
                    Title_En: 1,
                    Title_Ar: 1,

                    Serial_Number: "$Discount_Method_LKP_Details.Serial_Number",
                    Method_Title_En: "$Discount_Method_LKP_Details.Method_Title_En",
                    Method_Title_Ar: "$Discount_Method_LKP_Details.Method_Title_Ar",
                    Discount_Type_ID: "$Discount_Method_LKP_Details.Discount_Type_ID",
                    Is_Suspended: "$Discount_Method_LKP_Details.Is_Suspended",
                    value:
                    {
                        $cond:
                        {
                            if: { $gt: ['$Discount_Method_LKP_Details.Fixed_Rate', 0] }, 
                            then: '$Discount_Method_LKP_Details.Fixed_Rate',
                            else: '$Discount_Method_LKP_Details.Percentage_Rate'
                        }
                    }
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

exports.check_Existancy = async (val_Operation  , val_Id , val_Method_Title_En  , val_Method_Title_Ar , val_Discount_Type_ID) => {
  try {
    if (val_Operation=="insert")
    {
      return await tbl_Model.find
      ({
        $and:
        [
          {Method_Title_En: val_Method_Title_En},
          {Method_Title_Ar: val_Method_Title_Ar},
          {Discount_Type_ID:new ObjectId(val_Discount_Type_ID)},
        ]      
      });
    }
    else
    {
      return await tbl_Model.find
      ({
        $and:
        [
          {Method_Title_En: val_Method_Title_En},
          {Method_Title_Ar: val_Method_Title_Ar},
          {Discount_Type_ID:new ObjectId(val_Discount_Type_ID)},
          {'_id': {$ne : new ObjectId(val_Id)}}
        ]      
      });
    }
    

  } catch (error) {
      logger.error(error.message);
  }
};

exports.check_Title_En_Existancy = async (val_Operation  , val_Id , val_Method_Title_En) => {
    try {
      if (val_Operation=="insert")
      {
        //#region insert
        return await tbl_Model.find({Method_Title_En: val_Method_Title_En});
        //#endregion
      }
      else
      {
        //#region update
        return await tbl_Model.find
        ({
          $and:
          [
            {Method_Title_En: val_Method_Title_En},
            {'_id': {$ne : new ObjectId(val_Id)}}
          ]      
        });
        //#endregion
      }
    } catch (error) {
      logger.error(error.message);
    }
};

exports.check_Title_Ar_Existancy = async (val_Operation  , val_Id , val_Method_Title_Ar) => {
    try {
      if (val_Operation=="insert")
      {
        //#region insert
        return await tbl_Model.find({Method_Title_Ar: val_Method_Title_Ar});
        //#endregion
      }
      else
      {
        //#region update
        return await tbl_Model.find
        ({
          $and:
          [
            {Method_Title_Ar: val_Method_Title_Ar},
            {'_id': {$ne : new ObjectId(val_Id)}}
          ]      
        });
        //#endregion
      }
    } catch (error) {
      logger.error(error.message);
    }
  };
