const mongoose = require('mongoose');

const Discount_Method_LKP_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Method_Title_En: { type: String, required: true, },

    Method_Title_Ar: { type: String, required: true, },
    
    Discount_Type_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount_Type_LKP', required:true, },//Discount_Type_LKP
    
    Percentage_Rate: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Fixed_Rate: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,
    
    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Discount_Method_LKP' })

Discount_Method_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Discount_Method_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Discount_Method_LKP', Discount_Method_LKP_Schema);
