module.exports.Suspend_Booked_Token = async (val_User_ID) => {
    try {
        var tbl_Model = require("../models/user_tokens_log");
        
        await tbl_Model.updateMany (
            { User_ID: val_User_ID }, 
            { $set: { Is_Expired: true }}
        ).then(update_flg => {
            return update_flg;
        })

    } catch (error) {
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};