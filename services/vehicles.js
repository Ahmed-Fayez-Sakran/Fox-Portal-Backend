//#region Global Variables
var Vehicle_Data_Details_Model = require("../models/vehicle_data_details");
var Model_LKP_Model = require("../models/model_lkp");
var Brand_Name_LKP_Model = require("../models/brand_name_lkp");
var Transmission_Type_LKP_Model = require("../models/transmission_type_lkp");
var Fuel_Type_LKP_Model = require("../models/fuel_type_lkp");
var Style_LKP_Model = require("../models/style_lkp");
var Year_Manufacturing_LKP_Model = require("../models/year_manufacturing_lkp");
var Vehicles_Data_Model = require("../models/vehicles_data");
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
        val_Returned_Object = await Vehicle_Data_Details_Model.aggregate
        ([
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_Id',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Year_Manufacturing_LKP',
                    localField: 'Vehicles_Data_Details.Year_Manufacturing_ID',
                    foreignField: '_id',
                    as: 'Year_Manufacturing_Details'
                }
            },
            { $unwind: '$Year_Manufacturing_Details' },
        
            {
                $lookup:
                {
                    from: 'Transmission_Type_LKP',
                    localField: 'Vehicles_Data_Details.Transmission_Type_ID',
                    foreignField: '_id',
                    as: 'Transmission_Type_LKP_Details'
                }
            },
            { $unwind: '$Transmission_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Fuel_Type_LKP',
                    localField: 'Vehicles_Data_Details.Fuel_Type_ID',
                    foreignField: '_id',
                    as: 'Fuel_Type_LKP_Details'
                }
            },
            { $unwind: '$Fuel_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Style_LKP',
                    localField: 'Vehicles_Data_Details.Style_ID',
                    foreignField: '_id',
                    as: 'Style_LKP_Details'
                }
            },
            { $unwind: '$Style_LKP_Details' },

            { $match: { Is_Suspended: true } },

          {
                $project:
                {
                  
              _id:0,
                  Serial_Number:1,
                  Vehicle_Id:1,
                  Plate_Number:1,
                  Color:1,
                  Inserted_By: 1,
              Inserted_DateTime: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              Is_Suspended: 1,
                  
                    
                    Vehicle_Data:
                    {
                      Vehicle_ID: "$Vehicles_Data_Details._id",
                      Serial_Number: "$Vehicles_Data_Details.Serial_Number",
                    },
                    
                    Model_LKP_Details:
                    {
                      Model_ID: "$Model_LKP_Details._id",
                      Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                      Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                      Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
                    },
                    
                    Brand_Name_LKP_Details:
                    {
                      Brand_ID: "$Brand_Name_LKP_Details._id",
                      Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                      Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                      Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
                    },
                    
                    Year_Manufacturing_Details:
                    {
                      Year_Manufacturing_ID: "$Year_Manufacturing_Details._id",
                      Year_Manufacturing_Serial_Number: "$Year_Manufacturing_Details.Serial_Number",
                      Year_Manufacturing_En: "$Year_Manufacturing_Details.Year_En",
                      Year_Manufacturing_Ar: "$Year_Manufacturing_Details.Year_Ar",
                    },
                    
                    Transmission_Type_LKP_Details:
                    {
                      Transmission_Type_ID: "$Transmission_Type_LKP_Details._id",
                      Transmission_Type_Serial_Number: "$Transmission_Type_LKP_Details.Serial_Number",
                      Transmission_Type_En: "$Transmission_Type_LKP_Details.Transmission_Type_En",
                      Transmission_Type_Ar: "$Transmission_Type_LKP_Details.Transmission_Type_Ar",
                    },
                    
                    Fuel_Type_LKP_Details:
                    {
                      Fuel_Type_ID: "$Fuel_Type_LKP_Details._id",
                      Fuel_Type_Serial_Number: "$Fuel_Type_LKP_Details.Serial_Number",
                      Fuel_Type_En: "$Fuel_Type_LKP_Details.Fuel_Type_En",
                      Fuel_Type_Ar: "$Fuel_Type_LKP_Details.Fuel_Type_Ar",
                    },
                    
                    Style_LKP_Details:
                    {
                      Style_Title_ID: "$Style_LKP_Details._id",
                      Style_Title_Serial_Number: "$Style_LKP_Details.Serial_Number",
                      Style_Title_En: "$Style_LKP_Details.Style_Title_En",
                      Style_Title_Ar: "$Style_LKP_Details.Style_Title_Ar",
                    },
        
                }
            },
        
        ]);
      }
      else
      {
        val_Returned_Object = await Vehicle_Data_Details_Model.aggregate
        ([
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_Id',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Year_Manufacturing_LKP',
                    localField: 'Vehicles_Data_Details.Year_Manufacturing_ID',
                    foreignField: '_id',
                    as: 'Year_Manufacturing_Details'
                }
            },
            { $unwind: '$Year_Manufacturing_Details' },
        
            {
                $lookup:
                {
                    from: 'Transmission_Type_LKP',
                    localField: 'Vehicles_Data_Details.Transmission_Type_ID',
                    foreignField: '_id',
                    as: 'Transmission_Type_LKP_Details'
                }
            },
            { $unwind: '$Transmission_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Fuel_Type_LKP',
                    localField: 'Vehicles_Data_Details.Fuel_Type_ID',
                    foreignField: '_id',
                    as: 'Fuel_Type_LKP_Details'
                }
            },
            { $unwind: '$Fuel_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Style_LKP',
                    localField: 'Vehicles_Data_Details.Style_ID',
                    foreignField: '_id',
                    as: 'Style_LKP_Details'
                }
            },
            { $unwind: '$Style_LKP_Details' },
            
            { $match: { Is_Suspended: true } },

          {
                $project:
                {
                  
              _id:0,
                  Serial_Number:1,
                  Vehicle_Id:1,
                  Plate_Number:1,
                  Color:1,
                  Inserted_By: 1,
              Inserted_DateTime: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              Is_Suspended: 1,
                  
                    
                    Vehicle_Data:
                    {
                      Vehicle_ID: "$Vehicles_Data_Details._id",
                      Serial_Number: "$Vehicles_Data_Details.Serial_Number",
                    },
                    
                    Model_LKP_Details:
                    {
                      Model_ID: "$Model_LKP_Details._id",
                      Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                      Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                      Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
                    },
                    
                    Brand_Name_LKP_Details:
                    {
                      Brand_ID: "$Brand_Name_LKP_Details._id",
                      Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                      Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                      Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
                    },
                    
                    Year_Manufacturing_Details:
                    {
                      Year_Manufacturing_ID: "$Year_Manufacturing_Details._id",
                      Year_Manufacturing_Serial_Number: "$Year_Manufacturing_Details.Serial_Number",
                      Year_Manufacturing_En: "$Year_Manufacturing_Details.Year_En",
                      Year_Manufacturing_Ar: "$Year_Manufacturing_Details.Year_Ar",
                    },
                    
                    Transmission_Type_LKP_Details:
                    {
                      Transmission_Type_ID: "$Transmission_Type_LKP_Details._id",
                      Transmission_Type_Serial_Number: "$Transmission_Type_LKP_Details.Serial_Number",
                      Transmission_Type_En: "$Transmission_Type_LKP_Details.Transmission_Type_En",
                      Transmission_Type_Ar: "$Transmission_Type_LKP_Details.Transmission_Type_Ar",
                    },
                    
                    Fuel_Type_LKP_Details:
                    {
                      Fuel_Type_ID: "$Fuel_Type_LKP_Details._id",
                      Fuel_Type_Serial_Number: "$Fuel_Type_LKP_Details.Serial_Number",
                      Fuel_Type_En: "$Fuel_Type_LKP_Details.Fuel_Type_En",
                      Fuel_Type_Ar: "$Fuel_Type_LKP_Details.Fuel_Type_Ar",
                    },
                    
                    Style_LKP_Details:
                    {
                      Style_Title_ID: "$Style_LKP_Details._id",
                      Style_Title_Serial_Number: "$Style_LKP_Details.Serial_Number",
                      Style_Title_En: "$Style_LKP_Details.Style_Title_En",
                      Style_Title_Ar: "$Style_LKP_Details.Style_Title_Ar",
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
        val_Returned_Object = await Vehicle_Data_Details_Model.aggregate
        ([
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_Id',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Year_Manufacturing_LKP',
                    localField: 'Vehicles_Data_Details.Year_Manufacturing_ID',
                    foreignField: '_id',
                    as: 'Year_Manufacturing_Details'
                }
            },
            { $unwind: '$Year_Manufacturing_Details' },
        
            {
                $lookup:
                {
                    from: 'Transmission_Type_LKP',
                    localField: 'Vehicles_Data_Details.Transmission_Type_ID',
                    foreignField: '_id',
                    as: 'Transmission_Type_LKP_Details'
                }
            },
            { $unwind: '$Transmission_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Fuel_Type_LKP',
                    localField: 'Vehicles_Data_Details.Fuel_Type_ID',
                    foreignField: '_id',
                    as: 'Fuel_Type_LKP_Details'
                }
            },
            { $unwind: '$Fuel_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Style_LKP',
                    localField: 'Vehicles_Data_Details.Style_ID',
                    foreignField: '_id',
                    as: 'Style_LKP_Details'
                }
            },
            { $unwind: '$Style_LKP_Details' },

            { $match: { Is_Suspended: false } },

          {
                $project:
                {
                  
              _id:0,
                  Serial_Number:1,
                  Vehicle_Id:1,
                  Plate_Number:1,
                  Color:1,
                  Inserted_By: 1,
              Inserted_DateTime: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              Is_Suspended: 1,
                  
                    
                    Vehicle_Data:
                    {
                      Vehicle_ID: "$Vehicles_Data_Details._id",
                      Serial_Number: "$Vehicles_Data_Details.Serial_Number",
                    },
                    
                    Model_LKP_Details:
                    {
                      Model_ID: "$Model_LKP_Details._id",
                      Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                      Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                      Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
                    },
                    
                    Brand_Name_LKP_Details:
                    {
                      Brand_ID: "$Brand_Name_LKP_Details._id",
                      Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                      Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                      Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
                    },
                    
                    Year_Manufacturing_Details:
                    {
                      Year_Manufacturing_ID: "$Year_Manufacturing_Details._id",
                      Year_Manufacturing_Serial_Number: "$Year_Manufacturing_Details.Serial_Number",
                      Year_Manufacturing_En: "$Year_Manufacturing_Details.Year_En",
                      Year_Manufacturing_Ar: "$Year_Manufacturing_Details.Year_Ar",
                    },
                    
                    Transmission_Type_LKP_Details:
                    {
                      Transmission_Type_ID: "$Transmission_Type_LKP_Details._id",
                      Transmission_Type_Serial_Number: "$Transmission_Type_LKP_Details.Serial_Number",
                      Transmission_Type_En: "$Transmission_Type_LKP_Details.Transmission_Type_En",
                      Transmission_Type_Ar: "$Transmission_Type_LKP_Details.Transmission_Type_Ar",
                    },
                    
                    Fuel_Type_LKP_Details:
                    {
                      Fuel_Type_ID: "$Fuel_Type_LKP_Details._id",
                      Fuel_Type_Serial_Number: "$Fuel_Type_LKP_Details.Serial_Number",
                      Fuel_Type_En: "$Fuel_Type_LKP_Details.Fuel_Type_En",
                      Fuel_Type_Ar: "$Fuel_Type_LKP_Details.Fuel_Type_Ar",
                    },
                    
                    Style_LKP_Details:
                    {
                      Style_Title_ID: "$Style_LKP_Details._id",
                      Style_Title_Serial_Number: "$Style_LKP_Details.Serial_Number",
                      Style_Title_En: "$Style_LKP_Details.Style_Title_En",
                      Style_Title_Ar: "$Style_LKP_Details.Style_Title_Ar",
                    },
        
                }
            },
        
        ]);
      }
      else
      {
        val_Returned_Object = await Vehicle_Data_Details_Model.aggregate
        ([
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_Id',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Year_Manufacturing_LKP',
                    localField: 'Vehicles_Data_Details.Year_Manufacturing_ID',
                    foreignField: '_id',
                    as: 'Year_Manufacturing_Details'
                }
            },
            { $unwind: '$Year_Manufacturing_Details' },
        
            {
                $lookup:
                {
                    from: 'Transmission_Type_LKP',
                    localField: 'Vehicles_Data_Details.Transmission_Type_ID',
                    foreignField: '_id',
                    as: 'Transmission_Type_LKP_Details'
                }
            },
            { $unwind: '$Transmission_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Fuel_Type_LKP',
                    localField: 'Vehicles_Data_Details.Fuel_Type_ID',
                    foreignField: '_id',
                    as: 'Fuel_Type_LKP_Details'
                }
            },
            { $unwind: '$Fuel_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Style_LKP',
                    localField: 'Vehicles_Data_Details.Style_ID',
                    foreignField: '_id',
                    as: 'Style_LKP_Details'
                }
            },
            { $unwind: '$Style_LKP_Details' },
            
            { $match: { Is_Suspended: false } },

          {
                $project:
                {
                  
              _id:0,
                  Serial_Number:1,
                  Vehicle_Id:1,
                  Plate_Number:1,
                  Color:1,
                  Inserted_By: 1,
              Inserted_DateTime: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              Is_Suspended: 1,
                  
                    
                    Vehicle_Data:
                    {
                      Vehicle_ID: "$Vehicles_Data_Details._id",
                      Serial_Number: "$Vehicles_Data_Details.Serial_Number",
                    },
                    
                    Model_LKP_Details:
                    {
                      Model_ID: "$Model_LKP_Details._id",
                      Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                      Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                      Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
                    },
                    
                    Brand_Name_LKP_Details:
                    {
                      Brand_ID: "$Brand_Name_LKP_Details._id",
                      Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                      Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                      Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
                    },
                    
                    Year_Manufacturing_Details:
                    {
                      Year_Manufacturing_ID: "$Year_Manufacturing_Details._id",
                      Year_Manufacturing_Serial_Number: "$Year_Manufacturing_Details.Serial_Number",
                      Year_Manufacturing_En: "$Year_Manufacturing_Details.Year_En",
                      Year_Manufacturing_Ar: "$Year_Manufacturing_Details.Year_Ar",
                    },
                    
                    Transmission_Type_LKP_Details:
                    {
                      Transmission_Type_ID: "$Transmission_Type_LKP_Details._id",
                      Transmission_Type_Serial_Number: "$Transmission_Type_LKP_Details.Serial_Number",
                      Transmission_Type_En: "$Transmission_Type_LKP_Details.Transmission_Type_En",
                      Transmission_Type_Ar: "$Transmission_Type_LKP_Details.Transmission_Type_Ar",
                    },
                    
                    Fuel_Type_LKP_Details:
                    {
                      Fuel_Type_ID: "$Fuel_Type_LKP_Details._id",
                      Fuel_Type_Serial_Number: "$Fuel_Type_LKP_Details.Serial_Number",
                      Fuel_Type_En: "$Fuel_Type_LKP_Details.Fuel_Type_En",
                      Fuel_Type_Ar: "$Fuel_Type_LKP_Details.Fuel_Type_Ar",
                    },
                    
                    Style_LKP_Details:
                    {
                      Style_Title_ID: "$Style_LKP_Details._id",
                      Style_Title_Serial_Number: "$Style_LKP_Details.Serial_Number",
                      Style_Title_En: "$Style_LKP_Details.Style_Title_En",
                      Style_Title_Ar: "$Style_LKP_Details.Style_Title_Ar",
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
        val_Returned_Object = await Vehicle_Data_Details_Model.aggregate
        ([
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_Id',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Year_Manufacturing_LKP',
                    localField: 'Vehicles_Data_Details.Year_Manufacturing_ID',
                    foreignField: '_id',
                    as: 'Year_Manufacturing_Details'
                }
            },
            { $unwind: '$Year_Manufacturing_Details' },
        
            {
                $lookup:
                {
                    from: 'Transmission_Type_LKP',
                    localField: 'Vehicles_Data_Details.Transmission_Type_ID',
                    foreignField: '_id',
                    as: 'Transmission_Type_LKP_Details'
                }
            },
            { $unwind: '$Transmission_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Fuel_Type_LKP',
                    localField: 'Vehicles_Data_Details.Fuel_Type_ID',
                    foreignField: '_id',
                    as: 'Fuel_Type_LKP_Details'
                }
            },
            { $unwind: '$Fuel_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Style_LKP',
                    localField: 'Vehicles_Data_Details.Style_ID',
                    foreignField: '_id',
                    as: 'Style_LKP_Details'
                }
            },
            { $unwind: '$Style_LKP_Details' },
        
          {
                $project:
                {
                  
              _id:0,
                  Serial_Number:1,
                  Vehicle_Id:1,
                  Plate_Number:1,
                  Color:1,
                  Inserted_By: 1,
              Inserted_DateTime: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              Is_Suspended: 1,
                  
                    
                    Vehicle_Data:
                    {
                      Vehicle_ID: "$Vehicles_Data_Details._id",
                      Serial_Number: "$Vehicles_Data_Details.Serial_Number",
                    },
                    
                    Model_LKP_Details:
                    {
                      Model_ID: "$Model_LKP_Details._id",
                      Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                      Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                      Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
                    },
                    
                    Brand_Name_LKP_Details:
                    {
                      Brand_ID: "$Brand_Name_LKP_Details._id",
                      Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                      Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                      Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
                    },
                    
                    Year_Manufacturing_Details:
                    {
                      Year_Manufacturing_ID: "$Year_Manufacturing_Details._id",
                      Year_Manufacturing_Serial_Number: "$Year_Manufacturing_Details.Serial_Number",
                      Year_Manufacturing_En: "$Year_Manufacturing_Details.Year_En",
                      Year_Manufacturing_Ar: "$Year_Manufacturing_Details.Year_Ar",
                    },
                    
                    Transmission_Type_LKP_Details:
                    {
                      Transmission_Type_ID: "$Transmission_Type_LKP_Details._id",
                      Transmission_Type_Serial_Number: "$Transmission_Type_LKP_Details.Serial_Number",
                      Transmission_Type_En: "$Transmission_Type_LKP_Details.Transmission_Type_En",
                      Transmission_Type_Ar: "$Transmission_Type_LKP_Details.Transmission_Type_Ar",
                    },
                    
                    Fuel_Type_LKP_Details:
                    {
                      Fuel_Type_ID: "$Fuel_Type_LKP_Details._id",
                      Fuel_Type_Serial_Number: "$Fuel_Type_LKP_Details.Serial_Number",
                      Fuel_Type_En: "$Fuel_Type_LKP_Details.Fuel_Type_En",
                      Fuel_Type_Ar: "$Fuel_Type_LKP_Details.Fuel_Type_Ar",
                    },
                    
                    Style_LKP_Details:
                    {
                      Style_Title_ID: "$Style_LKP_Details._id",
                      Style_Title_Serial_Number: "$Style_LKP_Details.Serial_Number",
                      Style_Title_En: "$Style_LKP_Details.Style_Title_En",
                      Style_Title_Ar: "$Style_LKP_Details.Style_Title_Ar",
                    },
        
                }
            },
        
        ]); 
      } 
      else
      {
        val_Returned_Object = await Vehicle_Data_Details_Model.aggregate
        ([
        
          {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Vehicle_Id',
                    foreignField: '_id',
                    as: 'Vehicles_Data_Details'
                }
            },
            { $unwind: '$Vehicles_Data_Details' },
        
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
                $lookup:
                {
                    from: 'Year_Manufacturing_LKP',
                    localField: 'Vehicles_Data_Details.Year_Manufacturing_ID',
                    foreignField: '_id',
                    as: 'Year_Manufacturing_Details'
                }
            },
            { $unwind: '$Year_Manufacturing_Details' },
        
            {
                $lookup:
                {
                    from: 'Transmission_Type_LKP',
                    localField: 'Vehicles_Data_Details.Transmission_Type_ID',
                    foreignField: '_id',
                    as: 'Transmission_Type_LKP_Details'
                }
            },
            { $unwind: '$Transmission_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Fuel_Type_LKP',
                    localField: 'Vehicles_Data_Details.Fuel_Type_ID',
                    foreignField: '_id',
                    as: 'Fuel_Type_LKP_Details'
                }
            },
            { $unwind: '$Fuel_Type_LKP_Details' },
        
            {
                $lookup:
                {
                    from: 'Style_LKP',
                    localField: 'Vehicles_Data_Details.Style_ID',
                    foreignField: '_id',
                    as: 'Style_LKP_Details'
                }
            },
            { $unwind: '$Style_LKP_Details' },
        
          {
                $project:
                {
                  
              _id:0,
                  Serial_Number:1,
                  Vehicle_Id:1,
                  Plate_Number:1,
                  Color:1,
                  Inserted_By: 1,
              Inserted_DateTime: 1,
              Updated_By: 1,
              Updated_DateTime: 1,
              Is_Suspended: 1,
                  
                    
                    Vehicle_Data:
                    {
                      Vehicle_ID: "$Vehicles_Data_Details._id",
                      Serial_Number: "$Vehicles_Data_Details.Serial_Number",
                    },
                    
                    Model_LKP_Details:
                    {
                      Model_ID: "$Model_LKP_Details._id",
                      Model_Serial_Number: "$Model_LKP_Details.Serial_Number",
                      Model_Name_En: "$Model_LKP_Details.Model_Name_En",
                      Model_Name_Ar: "$Model_LKP_Details.Model_Name_Ar",
                    },
                    
                    Brand_Name_LKP_Details:
                    {
                      Brand_ID: "$Brand_Name_LKP_Details._id",
                      Brand_Serial_Number: "$Brand_Name_LKP_Details.Serial_Number",
                      Brand_Name_En: "$Brand_Name_LKP_Details.Brand_Name_En",
                      Brand_Name_Ar: "$Brand_Name_LKP_Details.Brand_Name_Ar",
                    },
                    
                    Year_Manufacturing_Details:
                    {
                      Year_Manufacturing_ID: "$Year_Manufacturing_Details._id",
                      Year_Manufacturing_Serial_Number: "$Year_Manufacturing_Details.Serial_Number",
                      Year_Manufacturing_En: "$Year_Manufacturing_Details.Year_En",
                      Year_Manufacturing_Ar: "$Year_Manufacturing_Details.Year_Ar",
                    },
                    
                    Transmission_Type_LKP_Details:
                    {
                      Transmission_Type_ID: "$Transmission_Type_LKP_Details._id",
                      Transmission_Type_Serial_Number: "$Transmission_Type_LKP_Details.Serial_Number",
                      Transmission_Type_En: "$Transmission_Type_LKP_Details.Transmission_Type_En",
                      Transmission_Type_Ar: "$Transmission_Type_LKP_Details.Transmission_Type_Ar",
                    },
                    
                    Fuel_Type_LKP_Details:
                    {
                      Fuel_Type_ID: "$Fuel_Type_LKP_Details._id",
                      Fuel_Type_Serial_Number: "$Fuel_Type_LKP_Details.Serial_Number",
                      Fuel_Type_En: "$Fuel_Type_LKP_Details.Fuel_Type_En",
                      Fuel_Type_Ar: "$Fuel_Type_LKP_Details.Fuel_Type_Ar",
                    },
                    
                    Style_LKP_Details:
                    {
                      Style_Title_ID: "$Style_LKP_Details._id",
                      Style_Title_Serial_Number: "$Style_LKP_Details.Serial_Number",
                      Style_Title_En: "$Style_LKP_Details.Style_Title_En",
                      Style_Title_Ar: "$Style_LKP_Details.Style_Title_Ar",
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

exports.check_Existancy = async (val_Model_ID,val_Style_ID,val_Year_Manufacturing_ID,val_Transmission_Type_ID,val_Fuel_Type_ID) => {

  try {
    return await Vehicles_Data_Model.find
    ({
        $and:
        [
          { Model_ID: new ObjectId(val_Model_ID) },
          { Style_ID: new ObjectId(val_Style_ID) },
          { Year_Manufacturing_ID: new ObjectId(val_Year_Manufacturing_ID) },
          { Transmission_Type_ID: new ObjectId(val_Transmission_Type_ID) },
          { Fuel_Type_ID: new ObjectId(val_Fuel_Type_ID) },
        ]
    });

  } catch (error) {
      console.log(error.message);
      logger.error(err.message);
  }

};

exports.check_vehicle_Detail_Existancy = async (val_Vehicle_Id,val_Plate_Number) => {

  try {
    return await Vehicle_Data_Details_Model.find
    ({
        $and:
        [
          { Vehicle_Id: new ObjectId(val_Vehicle_Id) },
          { Plate_Number: val_Plate_Number },
        ]
    });

  } catch (error) {
      console.log(error.message);
      logger.error(err.message);
  }

};

exports.Update_SuspendStatus_Vehicle_Data_Details = async (val_Is_Suspended,val_Vehicle_Id) => {

  try 
  {
    return await Vehicle_Data_Details_Model.updateMany
    (
      { 
        Vehicle_Id:  new ObjectId(val_Vehicle_Id)
      },
      { $set: { Updated_DateTime : now_DateTime.get_DateTime() , Is_Suspended : val_Is_Suspended }}
    );

  } catch (error) {
      logger.error(error.message);
  }
   
};