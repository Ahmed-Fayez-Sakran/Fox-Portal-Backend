const mongoose = require('mongoose');

const Handled_Messages_LKP_Schema = mongoose.Schema({
    
    Serial_Number:     { type: Number, required: true, } ,

    Messages_Title_En: { type: String,  required: true, } ,

    Messages_Title_Ar: { type: String,  required: true, } ,

}, { collection: 'Handled_Messages_LKP' })

module.exports = mongoose.model("Handled_Messages_LKP", Handled_Messages_LKP_Schema);