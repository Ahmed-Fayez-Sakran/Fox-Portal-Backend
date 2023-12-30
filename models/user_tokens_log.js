const mongoose = require('mongoose');

const User_Tokens_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data', required:true, },
    
    Token: { type: String, required: true, }, 
    
    Inserted_DateTime:{ type: String,  required: true, } ,    

    Expire_DateTime: { type: String,  required: false, default: null,} ,

    Is_Expired:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'User_Tokens_Log' })


User_Tokens_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

User_Tokens_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('User_Tokens_Log', User_Tokens_Log_Schema);