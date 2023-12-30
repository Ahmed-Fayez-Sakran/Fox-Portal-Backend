
var crypto = require('crypto');
exports.generate_Random_Value_Hex = async (len) => {
    try {
         return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len).toUpperCase();   // return required number of characters
    } catch (error) {
        throw error;
    }
};