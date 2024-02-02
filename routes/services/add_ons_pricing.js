const express = require("express");
const {
    get_Data_By_SuspendStatus,
    create_Row,
    update_Row,
    updateMany_Rows_Data,
} = require("../../controllers/services/add_ons_pricing");
 
const router = express.Router();


//#region API Links Explanation
//http://localhost:27017/api/v1/services/add_ons_pricing/en/get_data/1/all
//http://localhost:27017/api/v1/services/add_ons_pricing/:langTitle/get_data/:page_number/:suspendStatus
//#endregion
router.route("/:langTitle/get_data/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/services/add_ons_pricing/en/insert_data
//http://localhost:27017/api/v1/services/add_ons_pricing/:langTitle/insert_data
//#endregion
router.route("/:langTitle/insert_data").post(create_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/add_ons_pricing/en/update_data/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/services/add_ons_pricing/:langTitle/update_data/:id
//#endregion
router.route("/:langTitle/update_data/:id").put(update_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/add_ons_pricing/en/update_many_rows/activate
//http://localhost:27017/api/v1/services/add_ons_pricing/:langTitle/update_many_rows/:status
//#endregion
router.route("/:langTitle/update_many_rows/:status").put(updateMany_Rows_Data);


 
module.exports = router;