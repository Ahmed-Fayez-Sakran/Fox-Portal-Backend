const user_data_Model = require("../models/user_data");

module.exports.get_Admin_Operation_Team_Emails = async (row_Object) => {
    try {

        const list_Emails = await user_data_Model.find({ 
            User_Roles_ID: { 
                $in: ['65187389de9d4f1d31451dd0','65187389de9d4f1d31451dd1'] } 
        })
        .select('-_id Email');

        return list_Emails;
    } catch (error) {
      console.log(error);
    }
};