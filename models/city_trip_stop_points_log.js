const mongoose = require('mongoose');

const City_Trip_Stop_Points_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    City_Trip_Booking_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'City_Trip_Booking', required:true, },

    Pickup_Location: { type: String, required: true, },

    Drop_Off_Location: { type: String, required: true, },

    Distance_Per_KM: { type: Number, required: true, },

    Number_Of_Minutes: { type: Number, required: true, },
    
    Price_Per_Stop: { type: mongoose.Types.Decimal128, required: true, },
       
}, { collection: 'City_Trip_Stop_Points_Log' })

City_Trip_Stop_Points_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

City_Trip_Stop_Points_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('City_Trip_Stop_Points_Log', City_Trip_Stop_Points_Log_Schema);
