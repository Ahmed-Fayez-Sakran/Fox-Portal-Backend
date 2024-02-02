const express = require("express");
const {
    get_Data_By_SuspendStatus,
    insert_promo_code_data,
    update_Row,
    update_Suspend_Status_One_Row,
    update_Suspend_Status_Many_Rows,

    update_Suspend_Status_One_Row_Per_Type,
    get_Data_By_SuspendStatus_By_Type,
    assign_promo_code,
} = require("../../controllers/offers/promo_codes");
 
const router = express.Router();


//#region API Links Explanation
//http://localhost:27017/api/v1/offers/promo_codes/en/get_data/1/all
//http://localhost:27017/api/v1/offers/promo_codes/:langTitle/get_data/:page_number/:suspendStatus
//#endregion
router.route("/:langTitle/get_data/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/offers/promo_codes/en/insert_data
//http://localhost:27017/api/v1/offers/promo_codes/:langTitle/insert_data
//#endregion
router.route("/:langTitle/insert_data").post(insert_promo_code_data);

//#region API Links Explanation
//http://localhost:27017/api/v1/offers/promo_codes/en/update_data/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/offers/promo_codes/:langTitle/update_data/:id
//#endregion
router.route("/:langTitle/update_data/:id").put(update_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/offers/promo_codes/en/update_suspend_status_one_row/activate
//http://localhost:27017/api/v1/offers/promo_codes/:langTitle/update_suspend_status_one_row/:status
//#endregion
router.route("/:langTitle/update_suspend_status_one_row/:status").put(update_Suspend_Status_One_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/offers/promo_codes/en/update_suspend_status_many_rows/activate
//http://localhost:27017/api/v1/offers/promo_codes/:langTitle/update_suspend_status_many_rows/:status
//#endregion
router.route("/:langTitle/update_suspend_status_many_rows/:status").put(update_Suspend_Status_Many_Rows);




//#region API Links Explanation
//http://localhost:27017/api/v1/offers/promo_codes/en/update_suspend_status_one_row/activate/client
//http://localhost:27017/api/v1/offers/promo_codes/:langTitle/update_suspend_status_one_row/:status/:type
//#endregion
router.route("/:langTitle/update_suspend_status_one_row/:status/:type").put(update_Suspend_Status_One_Row_Per_Type);

//#region API Links Explanation
//http://localhost:27017/api/v1/offers/promo_codes/en/get_data_per_type/0/all
//http://localhost:27017/api/v1/offers/promo_codes/:langTitle/get_data_per_type/:page_number/:suspendStatus
//#endregion
router.route("/:langTitle/get_data_per_type/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus_By_Type)

//#region API Links Explanation
//http://localhost:27017/api/v1/offers/promo_codes/en/assign_promo_code
//http://localhost:27017/api/v1/offers/promo_codes/:langTitle/assign_promo_code
//#endregion
router.route("/:langTitle/assign_promo_code").post(assign_promo_code);





module.exports = router;