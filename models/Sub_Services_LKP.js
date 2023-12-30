const mongoose = require('mongoose');

const Sub_Services_LKP_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Sub_Service_Title_En: { type: String, required: true, } ,
    
    Sub_Service_Title_Ar: { type: String, required: true, }, 
    
    Main_Service_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Main_Services_LKP', required:true, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Sub_Services_LKP' })

Sub_Services_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Sub_Services_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Sub_Services_LKP', Sub_Services_LKP_Schema);