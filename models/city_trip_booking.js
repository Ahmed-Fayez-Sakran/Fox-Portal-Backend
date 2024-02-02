const mongoose = require('mongoose');

const City_Trip_Booking_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Order_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Users_Orders_Main_Log', required:true, },
    
    Pickup_DateTime: { type: String, required: true, default: null, }, 

    Drop_Off_DateTime: { type: String, required: true, default: null, }, 

    Pickup_Location: { type: String, required: true, }, 

    Drop_Off_Location: { type: String, required: true, }, 

    Start_KM_Gauge: { type: String, required: true, },
    
    End_KM_Gauge: { type: String, required: true, }, 

    Passenger_Name: { type: String, required: true, }, 

    Passenger_Phone: { type: String, required: true, }, 

    Passengers_Number: { type: Number, required: true, }, 

    Additional_Remarks: { type: String, required: false, default:'', }, 

    Distance_Per_KM: { type: String, required: true, }, 

    Number_Of_Minutes: { type: Number, required: true, }, 

    Trip_Price: {type: mongoose.Types.Decimal128, required: false, default: 0.00, },
       
    Add_ons_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Total_Price_Per_Trip: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },

    Inserted_DateTime:{ type: String,  required: true, } ,
    
    Is_Single_Stops:{ type: Boolean, required: true, default: true,} ,

    Order_Status_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order_Status_LKP', required:true, },

    Quickbooks_Reference_Number: { type: String, required: true, },    
    
}, { collection: 'City_Trip_Booking' })

City_Trip_Booking_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

City_Trip_Booking_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('City_Trip_Booking', City_Trip_Booking_Schema);
