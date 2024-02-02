const mongoose = require('mongoose');

const Cancel_Reason_LKP_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,
    
    Cancel_Reason_Title_En: { type: String, required: true, },

    Cancel_Reason_Title_Ar: { type: String, required: true, }, 
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Cancel_Reason_LKP' })

Cancel_Reason_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Cancel_Reason_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Cancel_Reason_LKP', Cancel_Reason_LKP_Schema);
