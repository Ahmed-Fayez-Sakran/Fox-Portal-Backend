const templates_Forms_Log_Model = require("../models/templates_forms_log");

module.exports.get_Template_Form = async (val_ID) => {
    try {
        return await templates_Forms_Log_Model.find({Serial_Number:val_ID}); 
    } catch (error) {
      console.log(error);
    }
};
