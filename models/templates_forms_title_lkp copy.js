const mongoose = require('mongoose');

const Templates_Forms_Title_LKP_Schema = mongoose.Schema({
    Serial_Number:       { type: String, required: true, } ,

    Title_En: {type: String, required: true,},
    
    Title_Ar: { type: String, required: true,},

    Inserted_By:         { type: Number,  required: true, } ,

    Inserted_DateTime:   { type: String,  required: true, } ,    

    Updated_By:          { type: Number,  required: false, default: 0,} ,

    Updated_DateTime:    { type: String,  required: false, default: null,} ,

}, { collection: 'Templates_Forms_Title_LKP' })

Templates_Forms_Title_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Templates_Forms_Title_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Templates_Forms_Title_LKP', Templates_Forms_Title_LKP_Schema);