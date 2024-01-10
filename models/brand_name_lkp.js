const mongoose = require('mongoose');

const Brand_Name_LKP_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Brand_Name_En:    { type: String, required: true, },
    
    Brand_Name_Ar:    { type: String, required: true, }, 
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Brand_Name_LKP' })

Brand_Name_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Brand_Name_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Brand_Name_LKP', Brand_Name_LKP_Schema);
