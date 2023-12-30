const mongoose = require('mongoose');

const Logger_Schema = mongoose.Schema({
    
    level:     { type: String, required: true, } ,

    message:   { type: String,  required: true, } ,

    Meta:   { type: String,  required: true, } ,

    timestamp: { type: String,  required: true, } ,

}, { collection: 'Tracking_Logger' })

module.exports = mongoose.model("Tracking_Logger", Logger_Schema);