const express = require("express");
const {
    get_Data_By_SuspendStatus,
    Insert_New_Vehicles_Advance_Notice_Period_Log,
} = require("../../controllers/vehicles/vehicle_settings");
 
const router = express.Router();


//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/vehicle_settings/en/get_data/1/all
//http://localhost:27017/api/v1/vehicles/vehicle_settings/:langTitle/get_data/:page_number/:suspendStatus
//#endregion
router.route("/:langTitle/get_data/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/vehicle_settings/en/insert_data
//http://localhost:27017/api/v1/vehicles/vehicle_settings/:langTitle/insert_data
//#endregion
router.route("/:langTitle/insert_data").post(Insert_New_Vehicles_Advance_Notice_Period_Log);

 
module.exports = router;