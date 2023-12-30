const mongoose = require('mongoose');

const User_Roles_LKP_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,
    
    Role_Title_En:    { type: String, required: true, } ,

}, { collection: 'User_Roles_LKP' })

User_Roles_LKP_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

User_Roles_LKP_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('User_Roles_LKP', User_Roles_LKP_Schema);