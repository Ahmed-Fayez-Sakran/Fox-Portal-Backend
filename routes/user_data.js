const express = require("express");
const {
    //get_All_User,
    check_User_Existancy,
    create_User,
    signin,
    update_My_Profile_Name,
    update_My_Profile_Address,
    
    Email_Verification,
    Phone_Verification,
    Resend_Code_To_Email,
    Resend_Code_To_Phone,
    //get_Personal_Data,

    check_phone_number_existancy,
    check_Email_existancy,
    Email_Profile_Verification,
    Phone_Profile_Verification,
    Change_Photo_Profile,

    Update_Password,
    Password_Verification,

    List_Users,

    Reset_Password,
    Make_Password,

    List_Users_Inside_Organization,

} = require("../controllers/user_data");
 
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

const storage_1 = multer.diskStorage({
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

const uploadOptions_1 = multer({ storage: storage_1 });
//#endregion

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data
//http://localhost:27017/api/v1/:langTitle/user_data
//#endregion
router.route("/:langTitle/user_data").get(get_All_User)
 
//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/check_user_existancy
//http://localhost:27017/api/v1/:langTitle/user_data/check_user_existancy
//#endregion
router.route("/:langTitle/user_data/check_user_existancy").get(check_User_Existancy)

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data
//http://localhost:27017/api/v1/:langTitle/user_data
//#endregion
router.route("/:langTitle/user_data").post(uploadOptions.single('Photo_Organization'),create_User)//Photo_Profile

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/signin
//http://localhost:27017/api/v1/:langTitle/user_data/signin
//#endregion
router.route("/:langTitle/user_data/signin").post(signin);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/update_my_profile_name
//http://localhost:27017/api/v1/:langTitle/user_data/update_my_profile_name
//#endregion
router.route("/:langTitle/user_data/update_my_profile_name").put(update_My_Profile_Name);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/update_my_profile_address
//http://localhost:27017/api/v1/:langTitle/user_data/update_my_profile_address
//#endregion
router.route("/:langTitle/user_data/update_my_profile_address").put(update_My_Profile_Address);



//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/email_verification
//http://localhost:27017/api/v1/:langTitle/user_data/email_verification
//#endregion
router.route("/:langTitle/user_data/email_verification").put(Email_Verification);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/phone_verification
//http://localhost:27017/api/v1/:langTitle/user_data/phone_verification
//#endregion
router.route("/:langTitle/user_data/phone_verification").put(Phone_Verification);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/resend_code_to_email
//http://localhost:27017/api/v1/:langTitle/user_data/resend_code_to_email
//#endregion
router.route("/:langTitle/user_data/resend_code_to_email").post(Resend_Code_To_Email);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/resend_code_to_phone
//http://localhost:27017/api/v1/:langTitle/user_data/resend_code_to_phone
//#endregion
router.route("/:langTitle/user_data/resend_code_to_phone").post(Resend_Code_To_Phone);
 
//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/6558833669bf6e1a13fbff50
//http://localhost:27017/api/v1/:langTitle/user_data/:user_id
//#endregion
router.route("/:langTitle/user_data/:user_id").get(get_Personal_Data)

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/update_password
//http://localhost:27017/api/v1/:langTitle/user_data/update_password
//#endregion
router.route("/:langTitle/user_data/update_password").put(Update_Password);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/password_verification
//http://localhost:27017/api/v1/:langTitle/user_data/password_verification
//#endregion
router.route("/:langTitle/user_data/password_verification").put(Password_Verification);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/check_phone_number_existancy
//http://localhost:27017/api/v1/:langTitle/user_data/check_phone_number_existancy
//#endregion
router.route("/:langTitle/user_data/check_phone_number_existancy").post(check_phone_number_existancy);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/check_email_existancy
//http://localhost:27017/api/v1/:langTitle/user_data/check_email_existancy
//#endregion
router.route("/:langTitle/user_data/check_email_existancy").post(check_Email_existancy);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/email_profile_verification
//http://localhost:27017/api/v1/:langTitle/user_data/email_profile_verification
//#endregion
router.route("/:langTitle/user_data/email_profile_verification").post(Email_Profile_Verification);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/phone_profile_verification
//http://localhost:27017/api/v1/:langTitle/user_data/phone_profile_verification
//#endregion
router.route("/:langTitle/user_data/phone_profile_verification").post(Phone_Profile_Verification);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/change_photo_profile
//http://localhost:27017/api/v1/:langTitle/user_data/change_photo_profile
//#endregion
router.route("/:langTitle/user_data/change_photo_profile").put(uploadOptions.single('Photo_Profile'),Change_Photo_Profile);
 
//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/list_users/all/1/fox_user_operation_users,business_client_operation_users
//http://localhost:27017/api/v1/:langTitle/user_data/list_users/:suspendStatus/:page_number/:user_types
//user_type
// [
//     all_users   --> except admin role
//     registered_client_users
//     non_registered_client_users  
//     business_client_admin_users 
//     business_client_operation_users 
//     business_client_finance_users 
//     fox_user_operation_users 
//     fox_user_finance_users 
//     outsourcing_owner_users
// ]
//#endregion
router.route("/:langTitle/user_data/list_users/:suspendStatus/:page_number/:user_types").get(List_Users)
 
//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/list_users_inside_organization/all/0/658c9e5fc477a743ce6f2c21
//http://localhost:27017/api/v1/:langTitle/user_data/list_users_inside_organization/:suspendStatus/:page_number/:id
//#endregion
router.route("/:langTitle/user_data/list_users_inside_organization/:suspendStatus/:page_number/:id").get(List_Users_Inside_Organization)


//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/reset_password
//http://localhost:27017/api/v1/:langTitle/user_data/reset_password
//#endregion
router.route("/:langTitle/user_data/reset_password").put(Reset_Password);

//#region API Links Explanation
//http://localhost:27017/api/v1/en/user_data/make_password
//http://localhost:27017/api/v1/:langTitle/user_data/make_password
//#endregion
router.route("/:langTitle/user_data/make_password").put(Make_Password);


module.exports = router;