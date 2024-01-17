const express = require("express");
const {
    get_Data_By_SuspendStatus,
    insert_driver,
    update_Row,
    update_Suspend_Status_One_Row,
    update_Suspend_Status_Many_Rows,
} = require("../controllers/drivers");
 
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
        cb(null, 'public/drivers_photos');
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
//http://localhost:27017/api/v1/drivers/en/get_data/1/all
//http://localhost:27017/api/v1/drivers/:langTitle/get_data/:page_number/:suspendStatus
//#endregion
router.route("/:langTitle/get_data/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/drivers/en/insert_data
//http://localhost:27017/api/v1/drivers/:langTitle/insert_data
//#endregion
router.route("/:langTitle/insert_data").post(uploadOptions.single('Photo_Profile'),insert_driver);

//#region API Links Explanation
//http://localhost:27017/api/v1/drivers/en/update_data/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/drivers/:langTitle/update_data/:id
//#endregion
router.route("/:langTitle/update_data/:id").put(uploadOptions.single('Photo_Profile'),update_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/drivers/en/update_suspend_status_one_row/activate
//http://localhost:27017/api/v1/drivers/:langTitle/update_suspend_status_one_row/:status
//#endregion
router.route("/:langTitle/update_suspend_status_one_row/:status").put(update_Suspend_Status_One_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/drivers/en/update_suspend_status_many_rows/activate
//http://localhost:27017/api/v1/drivers/:langTitle/update_suspend_status_many_rows/:status
//#endregion
router.route("/:langTitle/update_suspend_status_many_rows/:status").put(update_Suspend_Status_Many_Rows);


 
module.exports = router;