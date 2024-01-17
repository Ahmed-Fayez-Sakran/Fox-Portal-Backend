const mongoose = require('mongoose');

const Business_Prices_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Sub_Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },
    
    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data', required:true, }, 

    Vehicle_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles_Data', required:true, },

    Package_ID: { type: mongoose.Schema.Types.ObjectId, required:false, default: '', },
    
    Package_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Daily_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Weekly_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, }, 

    Monthly_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Extra_KM_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Max_KM_Per_Day: { type: Number, required: false, default: 0, },

    Open_Gauge_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Mini_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Fixed_KM_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Fixed_Minute_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Airport_Fees: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Is_Fixed_Value: { type: Boolean, required: false, default: false, },
    
    Flat_Schedule_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Fixed_Trip_Price:    { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Normal_Hour_Rate_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, }, 
    
    Max_KM_Per_Hour: { type: Number, required: false, default: 0,} , 
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0, } ,

    Updated_DateTime: { type: String,  required: false, default: null, } ,

    Is_Suspended:     { type: Boolean, required: true, default: false, } ,

}, { collection: 'Business_Prices_Log' })

Business_Prices_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Business_Prices_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Business_Prices_Log', Business_Prices_Log_Schema);
