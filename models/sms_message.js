const mongoose = require('mongoose');

const SMS_Message_Schema = mongoose.Schema({
    sid: { type: String,  required: true, } ,

    date_created: { type: String,  required: true, } ,
    
    date_updated: { type: String,  required: true, } ,
    
    date_sent:    { type: String,  required: true, } ,

    account_sid:  { type: String,  required: true, } ,    

    to:           { type: String,  required: true, } ,

    from:         { type: String,  required: true, } ,

    messaging_service_sid:     { type: String,  required: true, } ,

    body:     { type: String,  required: true, } ,

    status:     { type: String,  required: true, } ,

    num_segments:     { type: String,  required: true, } ,

    num_media:     { type: String,  required: true, } ,

    direction:     { type: String,  required: true, } ,

    api_version:     { type: String,  required: true, } ,

    price:     { type: String,  required: true, } ,

    price_unit:     { type: String,  required: true, } ,

    error_code:     { type: String,  required: true, } ,

    error_message:     { type: String,  required: true, } ,

    uri:     { type: String,  required: true, } ,
    
    subresource_uris: {
        media: { type: String,  required: true, } ,
    }

}, { collection: 'SMS_Message' })

SMS_Message_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

SMS_Message_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('SMS_Message', SMS_Message_Schema);