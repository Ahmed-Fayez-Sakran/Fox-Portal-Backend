const mongoose = require('mongoose');

const Templates_Forms_Log_Schema = mongoose.Schema({

    Serial_Number:       { type: String, required: true, } ,

    Title_ID:            { type: mongoose.Schema.Types.ObjectId, ref: 'Templates_Forms_Title_LKP', required:true, },

    Subject_En:          { type: String, required: true, },

    Subject_Ar:          { type: String, required: true, },

    Description_En:      { type: String, required: true, },

    Description_Ar:      { type: String, required: true, }, 
       
    MSG_Sent_Via_LKP_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'MSG_Sent_Via_LKP', required:true },

    Inserted_By:         { type: Number,  required: true, } ,

    Inserted_DateTime:   { type: String,  required: true, } ,    

    Updated_By:          { type: Number,  required: false, default: 0,} ,

    Updated_DateTime:    { type: String,  required: false, default: null,} ,

    Is_Suspended:        { type: Boolean, required: true, default: false,} ,

}, { collection: 'Templates_Forms_Log' })


Templates_Forms_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Templates_Forms_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Templates_Forms_Log', Templates_Forms_Log_Schema);