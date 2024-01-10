const mongoose = require('mongoose');

const Vehicles_Classification_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Vehicle_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles_Data', required:true, },

    Category_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles_Categories_Per_SubServices', required:true, },

    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Vehicles_Classification' })

Vehicles_Classification_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Vehicles_Classification_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Vehicles_Classification', Vehicles_Classification_Schema);