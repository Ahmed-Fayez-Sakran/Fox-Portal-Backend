const express = require("express");
const {
    get_company_privacy_policy,
    create_Row,
} = require("../../controllers/service_policy/company_privacy_policy");
 
const router = express.Router();

//http://localhost:27017/api/v1/service_policy/en/company_privacy_policy/0/all
router.route("/:langTitle/company_privacy_policy/:page_number/:suspendStatus").get(get_company_privacy_policy)
 
//http://localhost:27017/api/v1/service_policy/en/company_privacy_policy
router.route("/:langTitle/company_privacy_policy").post(create_Row);

module.exports = router;