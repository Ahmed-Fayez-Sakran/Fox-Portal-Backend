const mongoose = require('mongoose');

const Services_With_Addons_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Addons_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Addons_LKP', required:true, },
    
    Sub_Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },
    
    Inserted_By:           { type: Number,  required: true, } ,

    Inserted_DateTime:     { type: String,  required: true, } ,    

    Updated_By:            { type: Number,  required: false, default: 0,} ,

    Updated_DateTime:      { type: String,  required: false, default: null,} ,

    
    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Services_With_Addons' })

Services_With_Addons_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Services_With_Addons_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Services_With_Addons', Services_With_Addons_Schema);