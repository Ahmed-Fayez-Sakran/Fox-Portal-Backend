const express = require("express");
const {
    get_vehicles_Data_Based_on_Subservice,
    // get_Data_By_SuspendStatus,
    // create_Row,
    // update_Row,
    // updateMany_Rows_Data,
} = require("../../controllers/vehicles/vehicles_data");
 
const router = express.Router();


//#region API Links Explanation 
//http://localhost:27017/api/v1/vehicles_data/vehicles_data_based_on_subservice/en/city_trip/all/1
//http://localhost:27017/api/v1/vehicles_data/vehicles_data_based_on_subservice/:langTitle/:sub_service_title/:suspendStatus/:page_number
//#endregion
router.route("/vehicles_data_based_on_subservice/:langTitle/:sub_service_title/:suspendStatus/:page_number").get(get_vehicles_Data_Based_on_Subservice)

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_prices/en/insert_data
//http://localhost:27017/api/v1/services/service_prices/:langTitle/insert_data
//#endregion
//router.route("/:langTitle/insert_data").post(create_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_prices/en/update_data/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/services/service_prices/:langTitle/update_data/:id
//#endregion
//router.route("/:langTitle/update_data/:id").put(update_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/services/service_prices/en/update_many_rows/activate
//http://localhost:27017/api/v1/services/service_prices/:langTitle/update_many_rows/:status
//#endregion
//router.route("/:langTitle/update_many_rows/:status").put(updateMany_Rows_Data);


 
module.exports = router;