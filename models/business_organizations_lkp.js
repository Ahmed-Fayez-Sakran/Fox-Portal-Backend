const mongoose = require('mongoose');

const Business_Organizations_LKP_Schema = mongoose.Schema({
    
    Serial_Number:            { type: String, required: true, } ,
    
    Organization_Title_En:    { type: String, required: true, } ,
    
    Organization_Title_Ar:    { type: String, required: true, } ,
    
    Organization_Address:    { type: String, required: true, } ,
    
    Organization_Location:    { type: String, required: true, } ,

    Photo_Organization:       { type: String,  required: false, default:'./public/business_organizations_photos/business_default.jpg' } ,

    Inserted_By:              { type: Number,  required: true, } ,

    Inserted_DateTime:        { type: String,  required: true, } ,    

    Updated_By:               { type: Number,  required: false, default: 0,} ,

    Updated_DateTime:         { type: String,  required: false, default: null,} ,
    
    Is_Reviewed:              { type: Boolean, required: true, default: false,} ,

    Is_Suspended:             { type: Boolean, required: true, default: false,} ,

}, { collection: 'Business_Organizations_LKP' })

Business_Organizations_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Business_Organizations_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Business_Organizations_LKP', Business_Organizations_LKP_Schema);