const mongoose = require('mongoose');

const User_Data_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    Email: { type: String,  required: true, } ,

    Password: { type: String,  required: true, } ,

    First_Name: { type: String,  required: true, } ,

    Last_Name: { type: String,  required: true, } ,

    User_Roles_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Roles_LKP', required: true, } ,

    Phone_Number: { type: String,  required: true, } ,

    Address: { type: String,  required: true, } ,

    Location: { type: String,  required: true, } ,

    Photo_Profile: { type: String,  required: false, default: process.env.Main_URL + "public/uploads/user_default.png" } , 

    Inserted_DateTime:{ type: String,  required: true, } ,  

    Last_Login_DateTime:{ type: String,  required: false, default: null,} ,  

    LastUpdate_DateTime:{ type: String,  required: false, default: null,} , 

    Is_Business:{ type: Boolean,  required: true, default: false,} , 

    Business_Organization_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Business_Organizations_LKP', required: true, } ,

    Is_Verified:{ type: Boolean,  required: true, default: false,} , 

    Is_Suspended:{ type: Boolean,  required: true, default: false,} , 

    Inserted_By:{ type: Number,  required: true, default: 1,} , 

    Updated_By:{ type: Number,  required: false, default: 0,} , 

}, { collection: 'User_Data' })

User_Data_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

User_Data_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('User_Data', User_Data_Schema);