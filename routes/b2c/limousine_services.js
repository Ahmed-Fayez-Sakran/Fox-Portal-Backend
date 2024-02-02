const express = require("express");
const {
  get_Data_By_SuspendStatus,
  create_Row,
  update_Data,
  updateMany_Rows_Data,
  search_data,
//   updateMany_Rows_Data,
} = require("../../controllers/b2c/limousine_services");
 
const router = express.Router();

//http://localhost:27017/api/v1/b2c/limousine_services/en/insert_data
 router.route("/:lkp_Table_Name/:langTitle/insert_data").post(create_Row);

//http://localhost:27017/api/v1/b2c/limousine_services/en/get_data/1/all
router.route("/:lkp_Table_Name/:langTitle/get_data/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus)

//http://localhost:27017/api/v1/b2c/limousine_services/en/update_data/651beeec4cde306913c4f4a2
router.route("/:lkp_Table_Name/:langTitle/update_data/:id").put(update_Data);

//http://localhost:27017/api/v1/b2c/limousine_services/en/update_many_rows/activate
router.route("/:lkp_Table_Name/:langTitle/update_many_rows/:status").put(updateMany_Rows_Data);

//http://localhost:27017/api/v1/b2c/limousine_services/en/search_data/all
router.route("/:lkp_Table_Name/:langTitle/search_data/:suspendStatus").get(search_data);


module.exports = router;