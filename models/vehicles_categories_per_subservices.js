const mongoose = require('mongoose');

const Vehicles_Categories_Per_SubServices_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Sub_Service_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },

    Classification_Title_En: { type: String,  required: true, } ,

    Classification_Title_Ar: { type: String,  required: true, } ,
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Vehicles_Categories_Per_SubServices' })

Vehicles_Categories_Per_SubServices_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Vehicles_Categories_Per_SubServices_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Vehicles_Categories_Per_SubServices', Vehicles_Categories_Per_SubServices_Schema);