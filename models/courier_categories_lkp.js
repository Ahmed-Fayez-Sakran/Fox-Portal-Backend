const mongoose = require('mongoose');

const Courier_Categories_LKP_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Category_Title_En: { type: String, required: true, },
    
    Category_Title_Ar: { type: String, required: true, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Courier_Categories_LKP' })

Courier_Categories_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Courier_Categories_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Courier_Categories_LKP', Courier_Categories_LKP_Schema);
