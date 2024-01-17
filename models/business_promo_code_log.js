const mongoose = require('mongoose');

const Business_Promo_Code_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Sub_Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },
    
    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data', required:true, },

    Promo_Code_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Promo_Code_Data', required:true, },

    Start_Date: { type: String,  required: true, } ,

    End_Date: { type: String,  required: true, } ,

    Duration_Per_Days: { type: Number, required: true, }, 	
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Business_Promo_Code_Log' })

Business_Promo_Code_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Business_Promo_Code_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Business_Promo_Code_Log', Business_Promo_Code_Log_Schema);
