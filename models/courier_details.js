const mongoose = require('mongoose');

const Courier_Details_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Courier_Categories_LKP_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Courier_Categories_LKP', required:true, },

    Vehicle_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles_Data', required:true, },

    Size: { type: String, required: true, },

    Description_En: { type: String, required: true, },
    
    Description_Ar: { type: String, required: true, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Courier_Details' })

Courier_Details_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Courier_Details_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Courier_Details', Courier_Details_Schema);
