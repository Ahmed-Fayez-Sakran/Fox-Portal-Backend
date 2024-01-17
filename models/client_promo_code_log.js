const mongoose = require('mongoose');

const Client_Promo_Code_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Sub_Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },
       
    Promo_Code_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Promo_Code_Data', required:true, },

    Start_Date: { type: String,  required: true, } ,

    End_Date: { type: String,  required: true, } ,

    Duration_Per_Days: { type: Number, required: true, }, 	
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Client_Promo_Code_Log' })

Client_Promo_Code_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Client_Promo_Code_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Client_Promo_Code_Log', Client_Promo_Code_Log_Schema);
