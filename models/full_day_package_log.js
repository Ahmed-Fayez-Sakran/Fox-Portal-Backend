const mongoose = require('mongoose');

const Full_Day_Package_Log_Schema = mongoose.Schema({

    Serial_Number:    { type: String, required: true, } ,
    
    Package_Title_En:    { type: String, required: true, } ,

    Package_Title_Ar: { type: String, required: true, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Full_Day_Package_Log' })

Full_Day_Package_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Full_Day_Package_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Full_Day_Package_Log', Full_Day_Package_Log_Schema);
