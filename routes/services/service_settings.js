const express = require("express");
const {
    get_Data_By_SuspendStatus,
    create_Row,
    update_Row,
    updateMany_Rows_Data,
    add_New_Discount,
    View_Discount_Details
} = require("../../controllers/services/service_settings");
 
const router = express.Router();


//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_settings/en/get_data/1/all
//http://localhost:27017/api/v1/services/service_settings/:langTitle/get_data/:page_number/:suspendStatus
//#endregion
router.route("/:langTitle/get_data/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_settings/en/insert_data
//http://localhost:27017/api/v1/services/service_settings/:langTitle/insert_data
//#endregion
router.route("/:langTitle/insert_data").post(create_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_settings/en/update_data/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/services/service_settings/:langTitle/update_data/:id
//#endregion
router.route("/:langTitle/update_data/:id").put(update_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_settings/en/update_many_rows/activate
//http://localhost:27017/api/v1/services/service_settings/:langTitle/update_many_rows/:status
//#endregion
router.route("/:langTitle/update_many_rows/:status").put(updateMany_Rows_Data);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_settings/en/add_new_discount
//http://localhost:27017/api/v1/services/service_settings/:langTitle/add_new_discount
//#endregion
router.route("/:langTitle/add_new_discount").post(add_New_Discount);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_settings/en/view_discount_details/65893ef91e8f5d5861961a5f
//http://localhost:27017/api/v1/services/service_settings/:langTitle/view_discount_details/:id
//#endregion
router.route("/:langTitle/view_discount_details/:id").get(View_Discount_Details);


 
module.exports = router;