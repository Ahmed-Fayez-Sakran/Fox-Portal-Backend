//#region Global Variables
var tbl_Model = require("../models/model_lkp");
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
        val_Returned_Object = await Brand_Name_LKP_Model.aggregate
        ([
            { $match: { Is_Suspended: true } },
            
            {
                $lookup:
                {
                    from: 'Model_LKP',
                    localField: '_id',
                    foreignField: 'Brand_ID',
                    as: 'Model_Details'
                }
            },

            {$unwind: '$Model_Details'},

            { $match: { 'Model_Details.Is_Suspended': true } },

            {
                $project:
                {
                    id: "$_id",
                    _id:0,
                    Serial_Number: 1,
                    Brand_Name_Ar: 1,
                    Brand_Name_En: 1,
                    Inserted_By: 1,
                    Inserted_DateTime: 1,
                    Is_Suspended: 1,
                    Updated_By: 1,
                    Updated_DateTime: 1,

                    Model_Details: 
                    {
                        id: "$Model_Details._id",
                        Serial_Number: "$Model_Details.Serial_Number",
                        Model_Name_Ar: "$Model_Details.Model_Name_Ar",
                        Model_Name_En: "$Model_Details.Model_Name_En",
                        Inserted_By: "$Model_Details.Inserted_By",
                        Inserted_DateTime: "$Model_Details.Inserted_DateTime",
                        Updated_By: "$Model_Details.Updated_By",
                        Updated_DateTime: "$Model_Details.Updated_DateTime",
                        Is_Suspended: "$Model_Details.Is_Suspended",
                    },

                }
            },

        ]);
      }
      else
      {
        val_Returned_Object = await Brand_Name_LKP_Model.aggregate
        ([
          { $match: { Is_Suspended: true } },
          
          {
              $lookup:
              {
                  from: 'Model_LKP',
                  localField: '_id',
                  foreignField: 'Brand_ID',
                  as: 'Model_Details'
              }
          },

          {$unwind: '$Model_Details'},

          { $match: { 'Model_Details.Is_Suspended': true } },

          {
              $project:
              {
                  id: "$_id",
                  _id:0,
                  Serial_Number: 1,
                  Brand_Name_Ar: 1,
                  Brand_Name_En: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Is_Suspended: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,

                  Model_Details: 
                  {
                      id: "$Model_Details._id",
                      Serial_Number: "$Model_Details.Serial_Number",
                      Model_Name_Ar: "$Model_Details.Model_Name_Ar",
                      Model_Name_En: "$Model_Details.Model_Name_En",
                      Inserted_By: "$Model_Details.Inserted_By",
                      Inserted_DateTime: "$Model_Details.Inserted_DateTime",
                      Updated_By: "$Model_Details.Updated_By",
                      Updated_DateTime: "$Model_Details.Updated_DateTime",
                      Is_Suspended: "$Model_Details.Is_Suspended",
                  },

              }
          },

        ]).skip(skip).limit(pageSize);
      }
    }
    else if(suspendStatus.trim()==="only-false")
    {
      if (pageNumber=="0")
      {
        val_Returned_Object = await Brand_Name_LKP_Model.aggregate
        ([
            { $match: { Is_Suspended: false } },
            
            {
                $lookup:
                {
                    from: 'Model_LKP',
                    localField: '_id',
                    foreignField: 'Brand_ID',
                    as: 'Model_Details'
                }
            },

            {$unwind: '$Model_Details'},

            { $match: { 'Model_Details.Is_Suspended': false } },

            {
                $project:
                {
                    id: "$_id",
                    _id:0,
                    Serial_Number: 1,
                    Brand_Name_Ar: 1,
                    Brand_Name_En: 1,
                    Inserted_By: 1,
                    Inserted_DateTime: 1,
                    Is_Suspended: 1,
                    Updated_By: 1,
                    Updated_DateTime: 1,

                    Model_Details: 
                    {
                        id: "$Model_Details._id",
                        Serial_Number: "$Model_Details.Serial_Number",
                        Model_Name_Ar: "$Model_Details.Model_Name_Ar",
                        Model_Name_En: "$Model_Details.Model_Name_En",
                        Inserted_By: "$Model_Details.Inserted_By",
                        Inserted_DateTime: "$Model_Details.Inserted_DateTime",
                        Updated_By: "$Model_Details.Updated_By",
                        Updated_DateTime: "$Model_Details.Updated_DateTime",
                        Is_Suspended: "$Model_Details.Is_Suspended",
                    },

                }
            },

        ]);
      }
      else
      {
        val_Returned_Object = await Brand_Name_LKP_Model.aggregate
        ([
          { $match: { Is_Suspended: false } },
          
          {
              $lookup:
              {
                  from: 'Model_LKP',
                  localField: '_id',
                  foreignField: 'Brand_ID',
                  as: 'Model_Details'
              }
          },

          {$unwind: '$Model_Details'},

          { $match: { 'Model_Details.Is_Suspended': false } },

          {
              $project:
              {
                  id: "$_id",
                  _id:0,
                  Serial_Number: 1,
                  Brand_Name_Ar: 1,
                  Brand_Name_En: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Is_Suspended: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,

                  Model_Details: 
                  {
                      id: "$Model_Details._id",
                      Serial_Number: "$Model_Details.Serial_Number",
                      Model_Name_Ar: "$Model_Details.Model_Name_Ar",
                      Model_Name_En: "$Model_Details.Model_Name_En",
                      Inserted_By: "$Model_Details.Inserted_By",
                      Inserted_DateTime: "$Model_Details.Inserted_DateTime",
                      Updated_By: "$Model_Details.Updated_By",
                      Updated_DateTime: "$Model_Details.Updated_DateTime",
                      Is_Suspended: "$Model_Details.Is_Suspended",
                  },

              }
          },

        ]).skip(skip).limit(pageSize);
      }
    }
    else if(suspendStatus.trim()==="all")
    {
      if (pageNumber=="0")
      {
        val_Returned_Object = await Brand_Name_LKP_Model.aggregate
        ([
          
          {
              $lookup:
              {
                  from: 'Model_LKP',
                  localField: '_id',
                  foreignField: 'Brand_ID',
                  as: 'Model_Details'
              }
          },

          {$unwind: '$Model_Details'},

          {
              $project:
              {
                  id: "$_id",
                  _id:0,
                  Serial_Number: 1,
                  Brand_Name_Ar: 1,
                  Brand_Name_En: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Is_Suspended: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,

                  Model_Details: 
                  {
                      id: "$Model_Details._id",
                      Serial_Number: "$Model_Details.Serial_Number",
                      Model_Name_Ar: "$Model_Details.Model_Name_Ar",
                      Model_Name_En: "$Model_Details.Model_Name_En",
                      Inserted_By: "$Model_Details.Inserted_By",
                      Inserted_DateTime: "$Model_Details.Inserted_DateTime",
                      Updated_By: "$Model_Details.Updated_By",
                      Updated_DateTime: "$Model_Details.Updated_DateTime",
                      Is_Suspended: "$Model_Details.Is_Suspended",
                  },

              }
          },

        ]);
      }
      else
      {
        val_Returned_Object = await Brand_Name_LKP_Model.aggregate
        ([
          
          {
              $lookup:
              {
                  from: 'Model_LKP',
                  localField: '_id',
                  foreignField: 'Brand_ID',
                  as: 'Model_Details'
              }
          },

          {$unwind: '$Model_Details'},

          {
              $project:
              {
                  id: "$_id",
                  _id:0,
                  Serial_Number: 1,
                  Brand_Name_Ar: 1,
                  Brand_Name_En: 1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Is_Suspended: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,

                  Model_Details: 
                  {
                      id: "$Model_Details._id",
                      Serial_Number: "$Model_Details.Serial_Number",
                      Model_Name_Ar: "$Model_Details.Model_Name_Ar",
                      Model_Name_En: "$Model_Details.Model_Name_En",
                      Inserted_By: "$Model_Details.Inserted_By",
                      Inserted_DateTime: "$Model_Details.Inserted_DateTime",
                      Updated_By: "$Model_Details.Updated_By",
                      Updated_DateTime: "$Model_Details.Updated_DateTime",
                      Is_Suspended: "$Model_Details.Is_Suspended",
                  },

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