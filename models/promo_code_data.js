const mongoose = require('mongoose');

const Promo_Code_Data_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Code: { type: String,  required: true, } ,

    Title_En: { type: String,  required: true, } ,

    Title_Ar: { type: String,  required: true, } ,

    Percentage_Rate: { type: mongoose.Types.Decimal128, required: true, }, 
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Promo_Code_Data' })

Promo_Code_Data_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Promo_Code_Data_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Promo_Code_Data', Promo_Code_Data_Schema);