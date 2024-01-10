const mongoose = require('mongoose');

const Vehicles_Data_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Model_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Model_LKP', required:true, },
    
    Style_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Style_LKP', required:true, },

    photo_Path: { type: String, required: true, }, 

    Year_Manufacturing_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Year_Manufacturing_LKP', required:true, },

    Details_En: { type: String, required: true, }, 

    Details_Ar: { type: String, required: true, }, 

    Number_Of_Seats: { type: Number, required: true, }, 

    Number_Of_doors: { type: Number, required: true, }, 

    Luggage_Capacity: { type: Number, required: true, }, 

    Transmission_Type_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Transmission_Type_LKP', required:true, },

    Fuel_Type_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Fuel_Type_LKP', required:true, },

    Is_Outsourcing: { type: Boolean, required: true, },

    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Vehicles_Data' })

Vehicles_Data_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Vehicles_Data_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Vehicles_Data', Vehicles_Data_Schema);