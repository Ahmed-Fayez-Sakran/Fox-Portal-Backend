//#region Global Variables
var tbl_Model = require("../models/drivers_data");
const now_DateTime = require('../helpers/fun_datetime');
const ObjectId = require('mongodb').ObjectId;
//#endregion

exports.get_Data_By_SuspendStatus = async () => {
    try {
        const tbl_Object = await tbl_Model.aggregate([
            {
                "$project": {
                "id": "$_id",
                "Serial_Number": 1,
                "Driver_Code":1,
                "Full_Name": 1,
                "Mobile": 1,
                "Email": 1,
                "Address": 1,
                "Photo_Profile": 1,
                "Inserted_By": 1,
                "Inserted_DateTime": 1,
                "Updated_By": 1,
                "Updated_DateTime": 1,
                "Is_Suspended": 1,
                "_id": 0
                }
            }
        ]) ;
        
        return tbl_Object;

    } catch (error) {
      console.log(error.message);
    }
     
};

exports.check_Existancy = async (val_operation,val_ID,val_Driver_Code,val_Mobile) => {

    try {
        const return_Data = [];

        if (val_operation=="insert") {
            //#region insert
            let check_Driver_Code_Existancy = await tbl_Model.find({Driver_Code: val_Driver_Code});
            if (check_Driver_Code_Existancy.length<=0) {
                return_Data[0]= "Driver_Code_Not_Exist";
            } else {
                return_Data[0]= "Driver_Code_Exist";
            }

            let check_Mobile_Existancy = await tbl_Model.find({Mobile: val_Mobile});
            if (check_Mobile_Existancy.length<=0) {
                return_Data[1]= "Mobile_Not_Exist";
            } else {
                return_Data[1]= "Mobile_Exist";
            }

            if ( (return_Data[0]== "Driver_Code_Not_Exist") && (return_Data[1]== "Mobile_Not_Exist")) {
                return_Data[2]= "Insert_New_Driver";
            } else {
                return_Data[2]= "Redundant_Data";
            }
            //#endregion
        } else {
            //#region update
            let check_Driver_Code_Existancy = await tbl_Model.find
            ({
                $and:
                [
                    {Driver_Code: val_Driver_Code},
                    {'_id': {$ne : new ObjectId(val_ID)}}
                ]      
            });
            if (check_Driver_Code_Existancy.length<=0) {
                return_Data[0]= "Driver_Code_Not_Exist";
            } else {
                return_Data[0]= "Driver_Code_Exist";
            }
console.log("Driver_Code = "+return_Data[0])

            let check_Mobile_Existancy = await tbl_Model.find
            ({
                $and:
                [
                    {Mobile: val_Mobile},
                    {'_id': {$ne : new ObjectId(val_ID)}}
                ]      
            });
            if (check_Mobile_Existancy.length<=0) {
                return_Data[1]= "Mobile_Not_Exist";
            } else {
                return_Data[1]= "Mobile_Exist";
            }
console.log("Mobile = "+return_Data[1])
            
            if ( (return_Data[0]== "Driver_Code_Not_Exist") && (return_Data[1]== "Mobile_Not_Exist")) {
                return_Data[2]= "Insert_New_Driver";
            } else {
                return_Data[2]= "Redundant_Data";
            }
console.log("return = "+return_Data[2])            
            //#endregion
        }

        console.log("return_Data = "+ return_Data)
        return return_Data;

    } catch (error) {
        console.log(error.message);
    }

};