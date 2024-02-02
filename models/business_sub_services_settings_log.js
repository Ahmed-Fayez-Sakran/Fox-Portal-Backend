const mongoose = require('mongoose');

const Business_Sub_Services_Settings_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Sub_Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },

    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data', required:true, },

    Mini_Service_Duration_Per_Hours: { type: Number, required: true, },

    Notice_Period_Per_Hours: { type: Number, required: true, },

    Max_Cancellation_Duration_Per_Hours: { type: Number, required: true, },

    Discount_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount_Method_LKP', required:true, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Business_Sub_Services_Settings_Log' })

Business_Sub_Services_Settings_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Business_Sub_Services_Settings_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Business_Sub_Services_Settings_Log', Business_Sub_Services_Settings_Log_Schema);
