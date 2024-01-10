//#region Global Variables
var tbl_Model = ""
var Model_LKP_Model = require("../models/model_lkp");
var Brand_Name_LKP_Model = require("../models/brand_name_lkp");
var Sub_Services_LKP_Model = require("../models/sub_services_lkp");
var Year_Manufacturing_LKP_Model = require("../models/year_manufacturing_lkp");
var Vehicles_Data_Model = require("../models/vehicles_data");
var Vehicles_Classification_Model = require("../models/vehicles_classification");
var Vehicles_Categories_Per_SubServices_Model = require("../models/vehicles_categories_per_subservices");

const now_DateTime = require('../helpers/fun_datetime');
const obj_Get_Photo_Path = require('../helpers/fun_get_photo_path');
//#endregion

exports.get_Vehicles_Data_Based_on_Subservice = async (pageNumber,suspendStatus,sub_service_title) => {
    //#region Global Variables
    var pageSize = 10 ;
    var skip = (pageNumber - 1) * pageSize;
    tbl_Model = require("../models/brand_name_lkp");
    const ObjectId = require('mongodb').ObjectId;
    //#region set Sub-Service-ID based on sub_service_title
    var Sub_Service_Id =""
    if (sub_service_title=="rent_car")
    {
      Sub_Service_Id ="65200ef56be397bb41100884"      
    } 
    else if (sub_service_title=="city_trip") 
    {
      Sub_Service_Id ="65200ef56be397bb41100885"      
    } 
    else if (sub_service_title=="airport_pickup") 
    {
      Sub_Service_Id ="65200ef56be397bb41100886"      
    } 
    else if (sub_service_title=="airport_drop_off") 
    {
      Sub_Service_Id ="65200ef56be397bb41100887"      
    } 
    else if (sub_service_title=="hours_booking") 
    {
      Sub_Service_Id ="65200ef56be397bb41100888"      
    } 
    else if (sub_service_title=="full_day_booking") 
    {
      Sub_Service_Id ="65200ef56be397bb41100889"      
    } 
    else if (sub_service_title=="school_schedule") 
    {
      Sub_Service_Id ="65200ef56be397bb4110088a"      
    } 
    else if (sub_service_title=="bus_city_trip") 
    {
      Sub_Service_Id ="65200ef56be397bb4110088b"      
    } 
    else if (sub_service_title=="bus_airport_pickup") 
    {
      Sub_Service_Id ="65200ef56be397bb4110088c"      
    } 
    else if (sub_service_title=="bus_airport_drop_off") 
    {
      Sub_Service_Id ="65200ef56be397bb4110088d"      
    } 
    else if (sub_service_title=="bus_full_day_booking") 
    {
      Sub_Service_Id ="65200ef56be397bb4110088e"      
    } 
    else if (sub_service_title=="bus_schedule") 
    {
      Sub_Service_Id ="65200ef56be397bb4110088f"      
    } 
    else if (sub_service_title=="spot_valet") 
    {
      Sub_Service_Id ="65200ef56be397bb41100890"      
    } 
    else if (sub_service_title=="schedule_valet") 
    {
      Sub_Service_Id ="65200ef56be397bb41100891"      
    } 
    else if (sub_service_title=="courier_booking") 
    {
      Sub_Service_Id ="65200ef56be397bb41100892"      
    }
    //#endregion
    //#endregion

    //#region get Brand Model Category Year Manufacturing Data
    if (suspendStatus.trim()==="only-true")
    {
      //#region only-true
      if (pageNumber=="0")
      {
        return await Vehicles_Categories_Per_SubServices_Model.aggregate
        ([
        {
          $match: {
            'Sub_Service_Id': new ObjectId(Sub_Service_Id) , //City Trip sub-service
            'Is_Suspended':false
          }
        },
        {
          $lookup: {
            from: 'Vehicles_Classification',
            localField: '_id',
            foreignField: 'Category_ID',
            as: 'Vehicles_Classification'
          }
        },
        { $unwind: '$Vehicles_Classification' },
        {
          $lookup: {
            from: 'Vehicles_Data',
            localField: 'Vehicles_Classification.Vehicle_Id',
            foreignField: '_id',
            as: 'Vehicles_Data'
          }
        },
        { $unwind: '$Vehicles_Data' },
        {
          $lookup:
          {
            from: 'Model_LKP',
            localField: 'Vehicles_Data.Model_ID',
            foreignField: '_id',
            as: 'Model_LKP'
          }
        },
        { $unwind: '$Model_LKP' },
        {
          $lookup:
          {
            from: 'Brand_Name_LKP',
            localField: 'Model_LKP.Brand_ID',
            foreignField: '_id',
            as: 'Brand_Name_LKP'
          }
        },
        { $unwind: '$Brand_Name_LKP' },
        {
          $lookup:
          {
            from: 'Year_Manufacturing_LKP',
            localField: 'Vehicles_Data.Year_Manufacturing_ID',
            foreignField: '_id',
            as: 'Year_Manufacturing'
          }
        },
        { $unwind: '$Year_Manufacturing' },
        {
          $match: {
            'Vehicles_Classification.Is_Suspended':false,
            'Model_LKP.Is_Suspended':false,
            'Brand_Name_LKP.Is_Suspended':false,
            'Year_Manufacturing.Is_Suspended':false,
            'Vehicles_Data.Is_Suspended':true,
          }
        },
        {
          $project:
          {
            Classification_Title_En:1,
            Classification_Title_Ar:1,
            
            "Vehicle_ID": "$Vehicles_Data._id",
            Year_Manufacturing_ID:"$Year_Manufacturing.Year",
            Vehicle_Details_En: "$Vehicles_Data.Details_En",
            Vehicle_Details_Ar: "$Vehicles_Data.Details_Ar",

            Model_ID: "$Model_LKP._id",
            Model_Serial_Number: "$Model_LKP.Serial_Number",
            Model_Name_En: "$Model_LKP.Model_Name_En",
            Models_Data_Model_Name_Ar: "$Model_LKP.Model_Name_Ar",

            Brand_ID: "$Brand_Name_LKP._id",
            Brand_Serial_Number: "$Brand_Name_LKP.Serial_Number",
            Brand_Name_En: "$Brand_Name_LKP.Brand_Name_En",
            Brand_Name_Ar: "$Brand_Name_LKP.Brand_Name_Ar",
          }
        },
        ]);
      } 
      else
      {
        return await Vehicles_Categories_Per_SubServices_Model.aggregate
        ([
        {
          $match: {
            'Sub_Service_Id': new ObjectId(Sub_Service_Id) , //City Trip sub-service
            'Is_Suspended':false
          }
        },
        {
          $lookup: {
            from: 'Vehicles_Classification',
            localField: '_id',
            foreignField: 'Category_ID',
            as: 'Vehicles_Classification'
          }
        },
        { $unwind: '$Vehicles_Classification' },
        {
          $lookup: {
            from: 'Vehicles_Data',
            localField: 'Vehicles_Classification.Vehicle_Id',
            foreignField: '_id',
            as: 'Vehicles_Data'
          }
        },
        { $unwind: '$Vehicles_Data' },
        {
          $lookup:
          {
            from: 'Model_LKP',
            localField: 'Vehicles_Data.Model_ID',
            foreignField: '_id',
            as: 'Model_LKP'
          }
        },
        { $unwind: '$Model_LKP' },
        {
          $lookup:
          {
            from: 'Brand_Name_LKP',
            localField: 'Model_LKP.Brand_ID',
            foreignField: '_id',
            as: 'Brand_Name_LKP'
          }
        },
        { $unwind: '$Brand_Name_LKP' },
        {
          $lookup:
          {
            from: 'Year_Manufacturing_LKP',
            localField: 'Vehicles_Data.Year_Manufacturing_ID',
            foreignField: '_id',
            as: 'Year_Manufacturing'
          }
        },
        { $unwind: '$Year_Manufacturing' },
        {
          $match: {
            'Vehicles_Classification.Is_Suspended':false,
            'Model_LKP.Is_Suspended':false,
            'Brand_Name_LKP.Is_Suspended':false,
            'Year_Manufacturing.Is_Suspended':false,
            'Vehicles_Data.Is_Suspended':true,
          }
        },
        {
          $project:
          {
            Classification_Title_En:1,
            Classification_Title_Ar:1,
            
            "Vehicle_ID": "$Vehicles_Data._id",
            Year_Manufacturing_ID:"$Year_Manufacturing.Year",
            Vehicle_Details_En: "$Vehicles_Data.Details_En",
            Vehicle_Details_Ar: "$Vehicles_Data.Details_Ar",

            Model_ID: "$Model_LKP._id",
            Model_Serial_Number: "$Model_LKP.Serial_Number",
            Model_Name_En: "$Model_LKP.Model_Name_En",
            Models_Data_Model_Name_Ar: "$Model_LKP.Model_Name_Ar",

            Brand_ID: "$Brand_Name_LKP._id",
            Brand_Serial_Number: "$Brand_Name_LKP.Serial_Number",
            Brand_Name_En: "$Brand_Name_LKP.Brand_Name_En",
            Brand_Name_Ar: "$Brand_Name_LKP.Brand_Name_Ar",
          }
        },
        ]).skip(skip).limit(pageSize);
      }
      //#endregion
    } 
    else if(suspendStatus.trim()==="only-false")
    {
      //#region only-false
      if (pageNumber=="0")
      {
        return await Vehicles_Categories_Per_SubServices_Model.aggregate
        ([
        {
          $match: {
            'Sub_Service_Id': new ObjectId(Sub_Service_Id) , //City Trip sub-service
            'Is_Suspended':false
          }
        },
        {
          $lookup: {
            from: 'Vehicles_Classification',
            localField: '_id',
            foreignField: 'Category_ID',
            as: 'Vehicles_Classification'
          }
        },
        { $unwind: '$Vehicles_Classification' },
        {
          $lookup: {
            from: 'Vehicles_Data',
            localField: 'Vehicles_Classification.Vehicle_Id',
            foreignField: '_id',
            as: 'Vehicles_Data'
          }
        },
        { $unwind: '$Vehicles_Data' },
        {
          $lookup:
          {
            from: 'Model_LKP',
            localField: 'Vehicles_Data.Model_ID',
            foreignField: '_id',
            as: 'Model_LKP'
          }
        },
        { $unwind: '$Model_LKP' },
        {
          $lookup:
          {
            from: 'Brand_Name_LKP',
            localField: 'Model_LKP.Brand_ID',
            foreignField: '_id',
            as: 'Brand_Name_LKP'
          }
        },
        { $unwind: '$Brand_Name_LKP' },
        {
          $lookup:
          {
            from: 'Year_Manufacturing_LKP',
            localField: 'Vehicles_Data.Year_Manufacturing_ID',
            foreignField: '_id',
            as: 'Year_Manufacturing'
          }
        },
        { $unwind: '$Year_Manufacturing' },
        {
          $match: {
            'Vehicles_Classification.Is_Suspended':false,
            'Model_LKP.Is_Suspended':false,
            'Brand_Name_LKP.Is_Suspended':false,
            'Year_Manufacturing.Is_Suspended':false,
            'Vehicles_Data.Is_Suspended':false,
          }
        },
        {
          $project:
          {
            Classification_Title_En:1,
            Classification_Title_Ar:1,
            
            "Vehicle_ID": "$Vehicles_Data._id",
            Year_Manufacturing_ID:"$Year_Manufacturing.Year",
            Vehicle_Details_En: "$Vehicles_Data.Details_En",
            Vehicle_Details_Ar: "$Vehicles_Data.Details_Ar",

            Model_ID: "$Model_LKP._id",
            Model_Serial_Number: "$Model_LKP.Serial_Number",
            Model_Name_En: "$Model_LKP.Model_Name_En",
            Models_Data_Model_Name_Ar: "$Model_LKP.Model_Name_Ar",

            Brand_ID: "$Brand_Name_LKP._id",
            Brand_Serial_Number: "$Brand_Name_LKP.Serial_Number",
            Brand_Name_En: "$Brand_Name_LKP.Brand_Name_En",
            Brand_Name_Ar: "$Brand_Name_LKP.Brand_Name_Ar",
          }
        },
        ]);
      } 
      else
      {
        return await Vehicles_Categories_Per_SubServices_Model.aggregate
        ([
        {
          $match: {
            'Sub_Service_Id': new ObjectId(Sub_Service_Id) , //City Trip sub-service
            'Is_Suspended':false
          }
        },
        {
          $lookup: {
            from: 'Vehicles_Classification',
            localField: '_id',
            foreignField: 'Category_ID',
            as: 'Vehicles_Classification'
          }
        },
        { $unwind: '$Vehicles_Classification' },
        {
          $lookup: {
            from: 'Vehicles_Data',
            localField: 'Vehicles_Classification.Vehicle_Id',
            foreignField: '_id',
            as: 'Vehicles_Data'
          }
        },
        { $unwind: '$Vehicles_Data' },
        {
          $lookup:
          {
            from: 'Model_LKP',
            localField: 'Vehicles_Data.Model_ID',
            foreignField: '_id',
            as: 'Model_LKP'
          }
        },
        { $unwind: '$Model_LKP' },
        {
          $lookup:
          {
            from: 'Brand_Name_LKP',
            localField: 'Model_LKP.Brand_ID',
            foreignField: '_id',
            as: 'Brand_Name_LKP'
          }
        },
        { $unwind: '$Brand_Name_LKP' },
        {
          $lookup:
          {
            from: 'Year_Manufacturing_LKP',
            localField: 'Vehicles_Data.Year_Manufacturing_ID',
            foreignField: '_id',
            as: 'Year_Manufacturing'
          }
        },
        { $unwind: '$Year_Manufacturing' },
        {
          $match: {
            'Vehicles_Classification.Is_Suspended':false,
            'Model_LKP.Is_Suspended':false,
            'Brand_Name_LKP.Is_Suspended':false,
            'Year_Manufacturing.Is_Suspended':false,
            'Vehicles_Data.Is_Suspended':false,
          }
        },
        {
          $project:
          {
            Classification_Title_En:1,
            Classification_Title_Ar:1,
            
            "Vehicle_ID": "$Vehicles_Data._id",
            Year_Manufacturing_ID:"$Year_Manufacturing.Year",
            Vehicle_Details_En: "$Vehicles_Data.Details_En",
            Vehicle_Details_Ar: "$Vehicles_Data.Details_Ar",

            Model_ID: "$Model_LKP._id",
            Model_Serial_Number: "$Model_LKP.Serial_Number",
            Model_Name_En: "$Model_LKP.Model_Name_En",
            Models_Data_Model_Name_Ar: "$Model_LKP.Model_Name_Ar",

            Brand_ID: "$Brand_Name_LKP._id",
            Brand_Serial_Number: "$Brand_Name_LKP.Serial_Number",
            Brand_Name_En: "$Brand_Name_LKP.Brand_Name_En",
            Brand_Name_Ar: "$Brand_Name_LKP.Brand_Name_Ar",
          }
        },
        ]).skip(skip).limit(pageSize);
      }
      //#endregion
    }
    else if(suspendStatus.trim()==="all")
    {
      //#region all
      if (pageNumber=="0")
      {
        return await Vehicles_Categories_Per_SubServices_Model.aggregate
        ([
        {
          $match: {
            'Sub_Service_Id': new ObjectId(Sub_Service_Id) , //City Trip sub-service
            'Is_Suspended':false
          }
        },
        {
          $lookup: {
            from: 'Vehicles_Classification',
            localField: '_id',
            foreignField: 'Category_ID',
            as: 'Vehicles_Classification'
          }
        },
        { $unwind: '$Vehicles_Classification' },
        {
          $lookup: {
            from: 'Vehicles_Data',
            localField: 'Vehicles_Classification.Vehicle_Id',
            foreignField: '_id',
            as: 'Vehicles_Data'
          }
        },
        { $unwind: '$Vehicles_Data' },
        {
          $lookup:
          {
            from: 'Model_LKP',
            localField: 'Vehicles_Data.Model_ID',
            foreignField: '_id',
            as: 'Model_LKP'
          }
        },
        { $unwind: '$Model_LKP' },
        {
          $lookup:
          {
            from: 'Brand_Name_LKP',
            localField: 'Model_LKP.Brand_ID',
            foreignField: '_id',
            as: 'Brand_Name_LKP'
          }
        },
        { $unwind: '$Brand_Name_LKP' },
        {
          $lookup:
          {
            from: 'Year_Manufacturing_LKP',
            localField: 'Vehicles_Data.Year_Manufacturing_ID',
            foreignField: '_id',
            as: 'Year_Manufacturing'
          }
        },
        { $unwind: '$Year_Manufacturing' },
        {
          $match: {
            'Vehicles_Classification.Is_Suspended':false,
            'Model_LKP.Is_Suspended':false,
            'Brand_Name_LKP.Is_Suspended':false,
            'Year_Manufacturing.Is_Suspended':false,
          }
        },
        {
          $project:
          {
            Classification_Title_En:1,
            Classification_Title_Ar:1,
            
            "Vehicle_ID": "$Vehicles_Data._id",
            Year_Manufacturing_ID:"$Year_Manufacturing.Year",
            Vehicle_Details_En: "$Vehicles_Data.Details_En",
            Vehicle_Details_Ar: "$Vehicles_Data.Details_Ar",

            Model_ID: "$Model_LKP._id",
            Model_Serial_Number: "$Model_LKP.Serial_Number",
            Model_Name_En: "$Model_LKP.Model_Name_En",
            Models_Data_Model_Name_Ar: "$Model_LKP.Model_Name_Ar",

            Brand_ID: "$Brand_Name_LKP._id",
            Brand_Serial_Number: "$Brand_Name_LKP.Serial_Number",
            Brand_Name_En: "$Brand_Name_LKP.Brand_Name_En",
            Brand_Name_Ar: "$Brand_Name_LKP.Brand_Name_Ar",
          }
        },
        ]);
      } 
      else
      {
        return await Vehicles_Categories_Per_SubServices_Model.aggregate
        ([
        {
          $match: {
            'Sub_Service_Id': new ObjectId(Sub_Service_Id) , //City Trip sub-service
            'Is_Suspended':false
          }
        },
        {
          $lookup: {
            from: 'Vehicles_Classification',
            localField: '_id',
            foreignField: 'Category_ID',
            as: 'Vehicles_Classification'
          }
        },
        { $unwind: '$Vehicles_Classification' },
        {
          $lookup: {
            from: 'Vehicles_Data',
            localField: 'Vehicles_Classification.Vehicle_Id',
            foreignField: '_id',
            as: 'Vehicles_Data'
          }
        },
        { $unwind: '$Vehicles_Data' },
        {
          $lookup:
          {
            from: 'Model_LKP',
            localField: 'Vehicles_Data.Model_ID',
            foreignField: '_id',
            as: 'Model_LKP'
          }
        },
        { $unwind: '$Model_LKP' },
        {
          $lookup:
          {
            from: 'Brand_Name_LKP',
            localField: 'Model_LKP.Brand_ID',
            foreignField: '_id',
            as: 'Brand_Name_LKP'
          }
        },
        { $unwind: '$Brand_Name_LKP' },
        {
          $lookup:
          {
            from: 'Year_Manufacturing_LKP',
            localField: 'Vehicles_Data.Year_Manufacturing_ID',
            foreignField: '_id',
            as: 'Year_Manufacturing'
          }
        },
        { $unwind: '$Year_Manufacturing' },
        {
          $match: {
            'Vehicles_Classification.Is_Suspended':false,
            'Model_LKP.Is_Suspended':false,
            'Brand_Name_LKP.Is_Suspended':false,
            'Year_Manufacturing.Is_Suspended':false,
          }
        },
        {
          $project:
          {
            Classification_Title_En:1,
            Classification_Title_Ar:1,
            
            "Vehicle_ID": "$Vehicles_Data._id",
            Year_Manufacturing_ID:"$Year_Manufacturing.Year",
            Vehicle_Details_En: "$Vehicles_Data.Details_En",
            Vehicle_Details_Ar: "$Vehicles_Data.Details_Ar",

            Model_ID: "$Model_LKP._id",
            Model_Serial_Number: "$Model_LKP.Serial_Number",
            Model_Name_En: "$Model_LKP.Model_Name_En",
            Models_Data_Model_Name_Ar: "$Model_LKP.Model_Name_Ar",

            Brand_ID: "$Brand_Name_LKP._id",
            Brand_Serial_Number: "$Brand_Name_LKP.Serial_Number",
            Brand_Name_En: "$Brand_Name_LKP.Brand_Name_En",
            Brand_Name_Ar: "$Brand_Name_LKP.Brand_Name_Ar",
          }
        },
        ]).skip(skip).limit(pageSize);
      }
      //#endregion
    }
    else
    {
      return "";
    }
    //#endregion
};