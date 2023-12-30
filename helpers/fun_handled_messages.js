const handled_messages_Model = require("../models/handled_messages_lkp");

module.exports.get_handled_message = async (langTitle,val_Serial_Number) => {
    try {
        if (langTitle=="en") {
            let returned_Date =  await handled_messages_Model.find({ Serial_Number: val_Serial_Number }).select("-_id Messages_Title_En");
            return returned_Date[0].Messages_Title_En;
        } else {
            let returned_Date =  await handled_messages_Model.find({ Serial_Number: val_Serial_Number }).select("-_id Messages_Title_Ar");
            return returned_Date[0].Messages_Title_Ar;
        }
    } catch (error) {
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};
