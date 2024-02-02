const mongoose = require('mongoose');

const Client_Services_With_Addons_Prices_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Services_With_Addons_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Services_With_Addons', required:true, },
    
    Daily_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Weekly_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Monthly_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Fixed_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
        
    Price_In_Doha: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Price_Out_Doha: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Client_Services_With_Addons_Prices_Log' })

Client_Services_With_Addons_Prices_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Client_Services_With_Addons_Prices_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Client_Services_With_Addons_Prices_Log', Client_Services_With_Addons_Prices_Log_Schema);
