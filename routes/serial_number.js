const express = require("express");
const {
    get_serial_number,
} = require("../controllers/serial_number");

const router = express.Router();

//#region API Links Explanation
//http://localhost:27017/api/v1/business_organizations_lkp/en/get_serial_number
//http://localhost:27017/api/v1/:lkp_Table_Name/:langTitle/get_serial_number
//#endregion
router.route("/:lkp_Table_Name/:langTitle/get_serial_number").get(get_serial_number);

module.exports = router;