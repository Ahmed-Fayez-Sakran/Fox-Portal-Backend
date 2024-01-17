//#region Global Variables
var Courier_Categories_LKP_Model = require("../models/courier_categories_lkp");
var Courier_Details_Model = require("../models/courier_details");
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
        val_Returned_Object = await Courier_Categories_LKP_Model.aggregate
        ([

          {
              $lookup: 
              {
                  from: 'Courier_Details',
                  localField: '_id',
                  foreignField: 'Courier_Categories_LKP_ID',
                  as: 'Courier_Details_Details'
              }
          },
          { $unwind: '$Courier_Details_Details' },
      
          {
              $lookup: 
              {
                  from: 'Vehicles_Data',
                  localField: 'Courier_Details_Details.Vehicle_ID',
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
                  from: 'Style_LKP',
                  localField: 'Vehicles_Data_Details.Style_ID',
                  foreignField: '_id',
                  as: 'Style_LKP_Details'
              }
          },
          { $unwind: '$Style_LKP_Details' },
       
          {
              $match:
              {
                  "Courier_Details_Details.Is_Suspended": true
              }
          },
      
      
          {
              $project:
              {
                  
                  _id:0,
                  Serial_Number:1,
                  Category_Title_En:1,
                  Category_Title_Ar:1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
      
                  Courier_Details:
                  {
                      ID: "$Courier_Details_Details._id",
                      Serial_Number: "$Courier_Details_Details.Serial_Number",
                      Vehicle_ID:"$Courier_Details_Details.Vehicle_ID",
                      Courier_Categories_LKP_ID:"$Courier_Details_Details.Courier_Categories_LKP_ID",
                      Is_Suspended:"$Courier_Details_Details.Is_Suspended",
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
        val_Returned_Object = await Courier_Categories_LKP_Model.aggregate
        ([

          {
              $lookup: 
              {
                  from: 'Courier_Details',
                  localField: '_id',
                  foreignField: 'Courier_Categories_LKP_ID',
                  as: 'Courier_Details_Details'
              }
          },
          { $unwind: '$Courier_Details_Details' },
      
          {
              $lookup: 
              {
                  from: 'Vehicles_Data',
                  localField: 'Courier_Details_Details.Vehicle_ID',
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
                  from: 'Style_LKP',
                  localField: 'Vehicles_Data_Details.Style_ID',
                  foreignField: '_id',
                  as: 'Style_LKP_Details'
              }
          },
          { $unwind: '$Style_LKP_Details' },
       
          {
              $match:
              {
                  "Courier_Details_Details.Is_Suspended": true
              }
          },
      
      
          {
              $project:
              {
                  
                  _id:0,
                  Serial_Number:1,
                  Category_Title_En:1,
                  Category_Title_Ar:1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
      
                  Courier_Details:
                  {
                      ID: "$Courier_Details_Details._id",
                      Serial_Number: "$Courier_Details_Details.Serial_Number",
                      Vehicle_ID:"$Courier_Details_Details.Vehicle_ID",
                      Courier_Categories_LKP_ID:"$Courier_Details_Details.Courier_Categories_LKP_ID",
                      Is_Suspended:"$Courier_Details_Details.Is_Suspended",
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
        val_Returned_Object = await Courier_Categories_LKP_Model.aggregate
        ([

          {
              $lookup: 
              {
                  from: 'Courier_Details',
                  localField: '_id',
                  foreignField: 'Courier_Categories_LKP_ID',
                  as: 'Courier_Details_Details'
              }
          },
          { $unwind: '$Courier_Details_Details' },
      
          {
              $lookup: 
              {
                  from: 'Vehicles_Data',
                  localField: 'Courier_Details_Details.Vehicle_ID',
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
                  from: 'Style_LKP',
                  localField: 'Vehicles_Data_Details.Style_ID',
                  foreignField: '_id',
                  as: 'Style_LKP_Details'
              }
          },
          { $unwind: '$Style_LKP_Details' },
       
          {
              $match:
              {
                  "Courier_Details_Details.Is_Suspended": false
              }
          },
      
      
          {
              $project:
              {
                  
                  _id:0,
                  Serial_Number:1,
                  Category_Title_En:1,
                  Category_Title_Ar:1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
      
                  Courier_Details:
                  {
                      ID: "$Courier_Details_Details._id",
                      Serial_Number: "$Courier_Details_Details.Serial_Number",
                      Vehicle_ID:"$Courier_Details_Details.Vehicle_ID",
                      Courier_Categories_LKP_ID:"$Courier_Details_Details.Courier_Categories_LKP_ID",
                      Is_Suspended:"$Courier_Details_Details.Is_Suspended",
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
        val_Returned_Object = await Courier_Categories_LKP_Model.aggregate
        ([

            {
                $lookup: 
                {
                    from: 'Courier_Details',
                    localField: '_id',
                    foreignField: 'Courier_Categories_LKP_ID',
                    as: 'Courier_Details_Details'
                }
            },
            { $unwind: '$Courier_Details_Details' },
        
            {
                $lookup: 
                {
                    from: 'Vehicles_Data',
                    localField: 'Courier_Details_Details.Vehicle_ID',
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
                    from: 'Style_LKP',
                    localField: 'Vehicles_Data_Details.Style_ID',
                    foreignField: '_id',
                    as: 'Style_LKP_Details'
                }
            },
            { $unwind: '$Style_LKP_Details' },
         
            {
                $match:
                {
                    "Courier_Details_Details.Is_Suspended": false
                }
            },
        
        
            {
                $project:
                {
                    
                    _id:0,
                    Serial_Number:1,
                    Category_Title_En:1,
                    Category_Title_Ar:1,
                    Inserted_By: 1,
                    Inserted_DateTime: 1,
                    Updated_By: 1,
                    Updated_DateTime: 1,
                    Is_Suspended: 1,
        
                    Courier_Details:
                    {
                        ID: "$Courier_Details_Details._id",
                        Serial_Number: "$Courier_Details_Details.Serial_Number",
                        Vehicle_ID:"$Courier_Details_Details.Vehicle_ID",
                        Courier_Categories_LKP_ID:"$Courier_Details_Details.Courier_Categories_LKP_ID",
                        Is_Suspended:"$Courier_Details_Details.Is_Suspended",
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
        val_Returned_Object = await Courier_Categories_LKP_Model.aggregate
        ([

          {
              $lookup: 
              {
                  from: 'Courier_Details',
                  localField: '_id',
                  foreignField: 'Courier_Categories_LKP_ID',
                  as: 'Courier_Details_Details'
              }
          },
          { $unwind: '$Courier_Details_Details' },
      
          {
              $lookup: 
              {
                  from: 'Vehicles_Data',
                  localField: 'Courier_Details_Details.Vehicle_ID',
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
                  Category_Title_En:1,
                  Category_Title_Ar:1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
      
                  Courier_Details:
                  {
                      ID: "$Courier_Details_Details._id",
                      Serial_Number: "$Courier_Details_Details.Serial_Number",
                      Vehicle_ID:"$Courier_Details_Details.Vehicle_ID",
                      Courier_Categories_LKP_ID:"$Courier_Details_Details.Courier_Categories_LKP_ID",
                      Is_Suspended:"$Courier_Details_Details.Is_Suspended",
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
        val_Returned_Object = await Courier_Categories_LKP_Model.aggregate
        ([

          {
              $lookup: 
              {
                  from: 'Courier_Details',
                  localField: '_id',
                  foreignField: 'Courier_Categories_LKP_ID',
                  as: 'Courier_Details_Details'
              }
          },
          { $unwind: '$Courier_Details_Details' },
      
          {
              $lookup: 
              {
                  from: 'Vehicles_Data',
                  localField: 'Courier_Details_Details.Vehicle_ID',
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
                  Category_Title_En:1,
                  Category_Title_Ar:1,
                  Inserted_By: 1,
                  Inserted_DateTime: 1,
                  Updated_By: 1,
                  Updated_DateTime: 1,
                  Is_Suspended: 1,
      
                  Courier_Details:
                  {
                      ID: "$Courier_Details_Details._id",
                      Serial_Number: "$Courier_Details_Details.Serial_Number",
                      Vehicle_ID:"$Courier_Details_Details.Vehicle_ID",
                      Courier_Categories_LKP_ID:"$Courier_Details_Details.Courier_Categories_LKP_ID",
                      Is_Suspended:"$Courier_Details_Details.Is_Suspended",
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

exports.check_vehicle_Detail_Existancy = async (val_Courier_Categories_LKP_ID,val_Vehicle_ID) => {

    try {
      return await Courier_Details_Model.find
      ({
          $and:
          [
            { Vehicle_ID: new ObjectId(val_Vehicle_ID) },
            { Courier_Categories_LKP_ID: new ObjectId(val_Courier_Categories_LKP_ID) },
          ]
      });
  
    } catch (error) {
        console.log(error.message);
        logger.error(err.message);
    }
  
};

exports.check_Existancy = async (val_Vehicle_ID , val_Courier_Categories_LKP_ID) => {

  try {
    const return_Data = [];
    let itemsCount = ""

    itemsCount = await Courier_Details_Model.find({
      $and:
      [
        { Courier_Categories_LKP_ID: new ObjectId(val_Courier_Categories_LKP_ID) },
        { Vehicle_ID: new ObjectId(val_Vehicle_ID) },
        //{ Is_Suspended: false}
      ]
    });

    if (itemsCount.length<=0) {
      return_Data[0]= "";
      return_Data[1]= false;
    } else {
      return_Data[0]= itemsCount[0]._id;
      return_Data[1]= true;
    }
    console.log("return_Data Array = "+return_Data)
    return return_Data;

  } catch (err) {
    logger.error(err.message);
  }
  
};
