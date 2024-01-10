const mongoose = require('mongoose');

const Model_LKP_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Brand_ID:         { type: mongoose.Schema.Types.ObjectId, ref: 'Brand_Name_LKP', required:true, },

    Model_Name_En:    { type: String, required: true, } ,

    Model_Name_Ar:    { type: String, required: true, } ,
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Model_LKP' })

Model_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Model_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Model_LKP', Model_LKP_Schema);
