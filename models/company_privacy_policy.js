const mongoose = require('mongoose');

const Company_Privacy_Policy_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,
    
    Policy_Title_En: { type: String, required: true, },

    Policy_Title_Ar: { type: String, required: true, }, 
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Company_Privacy_Policy' })

Company_Privacy_Policy_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Company_Privacy_Policy_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Company_Privacy_Policy', Company_Privacy_Policy_Schema);
