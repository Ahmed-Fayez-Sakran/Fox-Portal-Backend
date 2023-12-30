const mongoose = require('mongoose');

const UserEmailVerification_Log_Schema = mongoose.Schema({
    
    Serial_Number: { type: String,  required: true, } ,  

    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data', required:true, },

    Code: { type: String,  required: true, } , 

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Updated_DateTime: { type: String,  required: false, default: null,} ,

    Is_Expired:     { type: Boolean, required: true, default: false,} ,

}, { collection: 'UserEmailVerification_Log' })


UserEmailVerification_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

UserEmailVerification_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('UserEmailVerification_Log', UserEmailVerification_Log_Schema);