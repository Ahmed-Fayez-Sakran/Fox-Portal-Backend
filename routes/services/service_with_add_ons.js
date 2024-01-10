const express = require("express");
const {
    get_Data_By_SuspendStatus,
    create_Row,
    update_Suspend_Status_One_Row,
    update_Suspend_Status_Many_Rows,
} = require("../../controllers/services/service_with_add_ons");
 
const router = express.Router();


//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_with_add_ons/en/get_data/all/1
//http://localhost:27017/api/v1/services/service_with_add_ons/:langTitle/get_data/:suspendStatus/:page_number
//#endregion
router.route("/:langTitle/get_data/:suspendStatus/:page_number").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_with_add_ons/en/insert_data
//http://localhost:27017/api/v1/services/service_with_add_ons/:langTitle/insert_data
//#endregion
router.route("/:langTitle/insert_data").post(create_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_with_add_ons/en/update_suspend_status_one_row/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/services/service_with_add_ons/:langTitle/update_suspend_status_one_row/:id
//#endregion
router.route("/:langTitle/update_suspend_status_one_row/:id").put(update_Suspend_Status_One_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_with_add_ons/en/update_suspend_status_many_rows/activate
//http://localhost:27017/api/v1/services/service_with_add_ons/:langTitle/update_suspend_status_many_rows/:status
//#endregion
router.route("/:langTitle/update_suspend_status_many_rows/:status").put(update_Suspend_Status_Many_Rows);


 
module.exports = router;