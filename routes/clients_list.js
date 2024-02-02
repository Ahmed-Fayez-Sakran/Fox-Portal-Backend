const express = require("express");
const {
    edit_client,
    create_client_with_settings,

    create_service_settings,
    create_service_prices,
    create_add_on_settings,
    create_terms_conditions,
} = require("../controllers/clients_list");
 
const router = express.Router();
 
//#region Image Upload
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(null, 'public/user_personal_photos');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });
//#endregion


//#region API Links Explanation
//http://localhost:27017/api/v1/en/clients_list/edit_client/651926f21eac3d61ea2b7b9f
//http://localhost:27017/api/v1/:langTitle/clients_list/edit_client/:id
//#endregion
router.route("/:langTitle/clients_list/edit_client/:id").put(uploadOptions.single('Photo_Profile'),edit_client);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/clients_list/create_client_with_settings
//http://localhost:27017/api/v1/:langTitle/clients_list/create_client_with_settings
//#endregion
router.route("/:langTitle/clients_list/create_client_with_settings").post(create_client_with_settings)



//#region API Links Explanation
//http://localhost:27017/api/v1/en/clients_list/create_service_settings
//http://localhost:27017/api/v1/:langTitle/clients_list/create_service_settings
//#endregion
router.route("/:langTitle/clients_list/create_service_settings").post(create_service_settings)

//#region API Links Explanation
//http://localhost:27017/api/v1/en/clients_list/create_service_prices
//http://localhost:27017/api/v1/:langTitle/clients_list/create_service_prices
//#endregion
router.route("/:langTitle/clients_list/create_service_prices").post(create_service_prices)

//#region API Links Explanation
//http://localhost:27017/api/v1/en/clients_list/create_add_on_settings
//http://localhost:27017/api/v1/:langTitle/clients_list/create_add_on_settings
//#endregion
router.route("/:langTitle/clients_list/create_add_on_settings").post(create_add_on_settings)

//#region API Links Explanation
//http://localhost:27017/api/v1/en/clients_list/create_terms_conditions
//http://localhost:27017/api/v1/:langTitle/clients_list/create_terms_conditions
//#endregion
router.route("/:langTitle/clients_list/create_terms_conditions").post(create_terms_conditions)




module.exports = router;