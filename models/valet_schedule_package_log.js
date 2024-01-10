const mongoose = require('mongoose');

const Valet_Schedule_Package_Log_Schema = mongoose.Schema({

    Serial_Number:    { type: String, required: true, } ,
    
    Package_Title_En:    { type: String, required: true, } ,

    Package_Title_Ar: { type: String, required: true, }, 
    

    //Package_Price: { type: mongoose.Types.Decimal128, required: true, default: 0.00, },    

    Package_Decription_En: { type: String, required: false, default: '', }, 

    Package_Decription_Ar: { type: String, required: false, default: '', }, 

    Number_Of_Days:       { type: Number,  required: false, default: 0,} ,

    Number_Of_Hours:       { type: Number,  required: false, default: 0,} ,
    
    
    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_By:       { type: Number,  required: false, default: 0,} ,

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Suspended:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'Valet_Schedule_Package_Log' })

Valet_Schedule_Package_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Valet_Schedule_Package_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Valet_Schedule_Package_Log', Valet_Schedule_Package_Log_Schema);
