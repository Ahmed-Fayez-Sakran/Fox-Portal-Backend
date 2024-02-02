const mongoose = require('mongoose');

const Client_Terms_Conditions_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Sub_Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },
    
    Terms_Conditions_Description_En: { type: String, required: true, },
    
    Terms_Conditions_Description_Ar: { type: String, required: true, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Client_Terms_Conditions_Log' })

Client_Terms_Conditions_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Client_Terms_Conditions_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Client_Terms_Conditions_Log', Client_Terms_Conditions_Log_Schema);
