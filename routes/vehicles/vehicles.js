const express = require("express");
const {
    get_Data_By_SuspendStatus,
    Insert_New_vehicle,
    Insert_vehicle_Details,
    update_Row,
    update_vehicle_details,
    update_Suspend_Status_One_Row,
    update_Suspend_Status_Many_Rows,
} = require("../../controllers/vehicles/vehicles");
 
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
        cb(null, 'public/vehicles_photos');
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
//http://localhost:27017/api/v1/vehicles/vehicles/en/get_data/1/all
//http://localhost:27017/api/v1/vehicles/vehicles/:langTitle/get_data/:page_number/:suspendStatus
//#endregion
router.route("/:langTitle/get_data/:page_number/:suspendStatus").get(get_Data_By_SuspendStatus)

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/vehicles/en/insert_data
//http://localhost:27017/api/v1/vehicles/vehicles/:langTitle/insert_data
//#endregion
router.route("/:langTitle/insert_data").post(uploadOptions.single('photo_Path'),Insert_New_vehicle);

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/vehicles/en/insert_vehicle_detail
//http://localhost:27017/api/v1/vehicles/vehicles/:langTitle/insert_vehicle_detail
//#endregion
router.route("/:langTitle/insert_vehicle_detail").post(Insert_vehicle_Details);

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/vehicles/en/update_data/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/vehicles/vehicles/:langTitle/update_data/:id
//#endregion
router.route("/:langTitle/update_data/:id").put(uploadOptions.single('photo_Path'),update_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/vehicles/en/update_vehicle_details/651beeec4cde306913c4f4a2
//http://localhost:27017/api/v1/vehicles/vehicles/:langTitle/update_vehicle_details/:id
//#endregion
router.route("/:langTitle/update_vehicle_details/:id").put(update_vehicle_details);

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/vehicles/en/update_suspend_status_one_row/activate
//http://localhost:27017/api/v1/vehicles/vehicles/:langTitle/update_suspend_status_one_row/:status
//#endregion
router.route("/:langTitle/update_suspend_status_one_row/:status").put(update_Suspend_Status_One_Row);

//#region API Links Explanation
//http://localhost:27017/api/v1/vehicles/vehicles/en/update_suspend_status_many_rows/activate
//http://localhost:27017/api/v1/vehicles/vehicles/:langTitle/update_suspend_status_many_rows/:status
//#endregion
router.route("/:langTitle/update_suspend_status_many_rows/:status").put(update_Suspend_Status_Many_Rows);


 
module.exports = router;