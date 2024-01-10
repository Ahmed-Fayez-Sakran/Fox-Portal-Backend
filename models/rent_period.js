const mongoose = require('mongoose');

const Rent_Period_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,
    
    Period_Ar:    { type: String, required: true, } ,
    
    Period_En:    { type: String, required: true, } ,

    Start_Range_Per_Day: { type: Number, required: true, },

    End_Range_Per_Day: { type: Number, required: true, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Rent_Period' })

Rent_Period_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Rent_Period_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Rent_Period', Rent_Period_Schema);
