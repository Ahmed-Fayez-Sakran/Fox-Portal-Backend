const express = require("express");
const {
    get_Data_By_SuspendStatus,
    update_Row,
    update_Suspend_Status_One_Row,
    update_Suspend_Status_Many_Rows,
} = require("../../controllers/services/main_service_settings");
 
const router = express.Router();

//#region API Links Explanation
//http://localhost:27017/api/v1/services/main_service_settings/en/get_data/all
//http://localhost:27017/api/v1/services/main_service_settings/:langTitle/get_data/:suspendStatus
//#endregion
router.route("/:langTitle/get_data/:suspendStatus").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/services/main_service_settings/en/update_data/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/services/main_service_settings/:langTitle/update_data/:id
//#endregion
router.route("/:langTitle/update_data/:id").put(update_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/main_service_settings/en/update_suspend_status_one_row/activate
//http://localhost:27017/api/v1/services/main_service_settings/:langTitle/update_suspend_status_one_row/:status
//#endregion
router.route("/:langTitle/update_suspend_status_one_row/:status").put(update_Suspend_Status_One_Row);

 

//#region API Links Explanation
//http://localhost:27017/api/v1/services/main_service_settings/en/update_suspend_status_many_rows/activate
//http://localhost:27017/api/v1/services/main_service_settings/:langTitle/update_suspend_status_many_rows/:status
//#endregion
router.route("/:langTitle/update_suspend_status_many_rows/:status").put(update_Suspend_Status_Many_Rows);

 
module.exports = router;