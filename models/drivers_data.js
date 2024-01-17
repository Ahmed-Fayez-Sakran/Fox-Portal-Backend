const mongoose = require('mongoose');

const Drivers_Data_Schema = mongoose.Schema({
   
    Serial_Number:    { type: String, required: true, } ,

    Driver_Code:    { type: String, required: true, } ,

    Full_Name: { type: String, required: true, },

    Mobile: { type: String, required: true, }, 
    
    Email: { type: String, required: true, },
    
    Address: { type: String, required: true, }, 
   
    Photo_Profile: { type: String, required: true, }, 
     
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Drivers_Data' })

Drivers_Data_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Drivers_Data_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Drivers_Data', Drivers_Data_Schema);
