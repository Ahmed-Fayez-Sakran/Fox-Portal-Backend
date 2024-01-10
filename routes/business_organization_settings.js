const express = require("express");
const {
    View_All,
	Edit_Business_Organization,
    Add_User,
    Add_Business_Organization,
        
    update_Suspend_Status_One_Row,
    update_Suspend_Status_Many_Rows,
} = require("../controllers/business_organization_settings");
 
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
        cb(null, 'public/business_organizations_photos');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });


const storage_2 = multer.diskStorage({
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

const uploadOptions_2 = multer({ storage: storage_2 });
//#endregion


//#region API Links Explanation
//http://localhost:27017/api/v1/en/business_organization_settings/all/all
//http://localhost:27017/api/v1/:langTitle/business_organization_settings/:suspendStatus/:reviewedStatus
//#endregion
router.route("/:langTitle/business_organization_settings/:suspendStatus/:reviewedStatus").get(View_All)
 
//#region API Links Explanation
//http://localhost:27017/api/v1/en/business_organization_settings/658c9e5fc477a743ce6f2c21
//http://localhost:27017/api/v1/:langTitle/business_organization_settings/:id
//#endregion
router.route("/:langTitle/business_organization_settings/:id").put(uploadOptions.single('Photo_Organization'),Edit_Business_Organization);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/business_organization_settings/add_user_data
//http://localhost:27017/api/v1/:langTitle/business_organization_settings/add_user_data
//#endregion
router.route("/:langTitle/business_organization_settings/add_user_data").post(uploadOptions_2.single('Photo_Profile'),Add_User);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/business_organization_settings
//http://localhost:27017/api/v1/:langTitle/business_organization_settings
//#endregion
router.route("/:langTitle/business_organization_settings").post(uploadOptions.single('Photo_Organization'),Add_Business_Organization);



 
//#region API Links Explanation
//http://localhost:27017/api/v1/en/business_organization_settings/update_suspend_status_one_row/activate
//http://localhost:27017/api/v1/:langTitle/business_organization_settings/update_suspend_status_one_row/:status
//#endregion
router.route("/:langTitle/business_organization_settings/update_suspend_status_one_row/:status").put(update_Suspend_Status_One_Row);

 
//#region API Links Explanation
//http://localhost:27017/api/v1/en/business_organization_settings/update_suspend_status_many_rows/activate
//http://localhost:27017/api/v1/:langTitle/business_organization_settings/update_suspend_status_many_rows/:status
//#endregion
router.route("/:langTitle/business_organization_settings/update_suspend_status_many_rows/:status").put(update_Suspend_Status_Many_Rows);
 


module.exports = router;