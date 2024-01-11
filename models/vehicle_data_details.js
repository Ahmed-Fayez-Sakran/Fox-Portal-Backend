const mongoose = require('mongoose');

const Vehicle_Data_Details_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Vehicle_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles_Data', required:true, },

    Plate_Number: { type: String,  required: true, } ,

    Color:{ type: String,  required: true, } ,

    Is_Outsourcing: { type: Boolean, required: true, },

    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Vehicle_Data_Details' })

Vehicle_Data_Details_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Vehicle_Data_Details_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Vehicle_Data_Details', Vehicle_Data_Details_Schema);