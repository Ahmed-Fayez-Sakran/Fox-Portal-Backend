const mongoose = require('mongoose');

const Business_Vehicles_Advance_Notice_Period_Log_Schema = mongoose.Schema({
    
    //Serial_Number:    { type: String, required: true, } ,

    Vehicle_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles_Data', required:true, },

    Sub_Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },

    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data', required:true, },
    
    Notice_Period_Per_Hours: { type: Number, required: true, }, 

    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Business_Vehicles_Advance_Notice_Period_Log' })

Business_Vehicles_Advance_Notice_Period_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Business_Vehicles_Advance_Notice_Period_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Business_Vehicles_Advance_Notice_Period_Log', Business_Vehicles_Advance_Notice_Period_Log_Schema);
