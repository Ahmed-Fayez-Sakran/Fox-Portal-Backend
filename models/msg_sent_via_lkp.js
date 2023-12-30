const mongoose = require('mongoose');

const MSG_Sent_Via_LKP_Schema = mongoose.Schema({
    
    Serial_Number:     { type: String, required: true, } ,

    Title_En:          { type: String, required: true, },

    Title_Ar:          { type: String, required: true, },

}, { collection: 'MSG_Sent_Via_LKP' })

MSG_Sent_Via_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

MSG_Sent_Via_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('MSG_Sent_Via_LKP', MSG_Sent_Via_LKP_Schema);