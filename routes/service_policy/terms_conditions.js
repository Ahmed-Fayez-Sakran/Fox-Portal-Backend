const express = require("express");
const {
    get_terms_conditions,
    create_Row,
} = require("../../controllers/service_policy/terms_conditions");
 
const router = express.Router();

//http://localhost:27017/api/v1/service_policy/en/terms_conditions/0/all
router.route("/:langTitle/terms_conditions/:page_number/:suspendStatus").get(get_terms_conditions)
 
//http://localhost:27017/api/v1/service_policy/en/terms_conditions
router.route("/:langTitle/terms_conditions").post(create_Row);

module.exports = router;