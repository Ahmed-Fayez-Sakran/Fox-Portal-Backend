const express = require("express");
const {
    get_Data_By_SuspendStatus,
    Add_Courier_Category,
    update_Row,
    update_Suspend_Status_One_Row,
    update_Suspend_Status_Many_Rows,
} = require("../../controllers/vehicles/courier_categories_settings");
 
const router = express.Router();


//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/en/get_data/1/all
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/:langTitle/get_data/:page_number/:suspendStatus
//#endregion
router.route("/:langTitle/get_data/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/en/insert_data
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/:langTitle/insert_data
//#endregion
router.route("/:langTitle/insert_data").post(Add_Courier_Category);

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/en/update_data/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/:langTitle/update_data/:id
//#endregion
router.route("/:langTitle/update_data/:id").put(update_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/en/update_suspend_status_one_row/activate
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/:langTitle/update_suspend_status_one_row/:status
//#endregion
router.route("/:langTitle/update_suspend_status_one_row/:status").put(update_Suspend_Status_One_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/en/update_suspend_status_many_rows/activate
//http://localhost:27017/api/v1/vehicles/courier_categories_settings/:langTitle/update_suspend_status_many_rows/:status
//#endregion
router.route("/:langTitle/update_suspend_status_many_rows/:status").put(update_Suspend_Status_Many_Rows);


 
module.exports = router;