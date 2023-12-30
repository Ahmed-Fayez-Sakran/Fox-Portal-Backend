const express = require("express");
const {
    get_company_privacy_policy,
    create_Row,
} = require("../controllers/company_privacy_policy");
 
const router = express.Router();

//http://localhost:27017/api/v1/en/company_privacy_policy/all
router.route("/:langTitle/company_privacy_policy/:suspendStatus").get(get_company_privacy_policy)
 
//http://localhost:27017/api/v1/en/company_privacy_policy
router.route("/:langTitle/company_privacy_policy").post(create_Row);

module.exports = router;