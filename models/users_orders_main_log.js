const mongoose = require('mongoose');

const Users_Orders_Main_Log_Schema = mongoose.Schema({
    
    Serial_Number:    { type: String, required: true, } ,

    User_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User_Data', required:true, },

    Sub_Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Sub_Services_LKP', required:true, },

    Service_Price: { type: mongoose.Types.Decimal128, required: true, default: 0.00, },

    Add_ons_Price: { type: mongoose.Types.Decimal128, required: false, default: 0.00, },
    
    Total_Value_Supposed_Paid: { type: mongoose.Types.Decimal128, required: true, default: 0.00, },
    
    Actually_Paid_Value: { type: mongoose.Types.Decimal128, required: true, default: 0.00, },
    
    Is_Discount: { type: Boolean, required: false, default: false, },

    Is_Promo_Code:{ type: Boolean, required: false, default: false, },

    Is_Extra: { type: Boolean, required: false, default: false, },

    Is_Special_Request:{ type: Boolean, required: false, default: false, },

    Is_Reported: { type: Boolean, required: false, default: false, },

    Is_Refund: { type: Boolean, required: false, default: false, },

    Order_Status_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order_Status_LKP', required:true, },

    Operation_Confimation_By: { type: String, required: true, }, 

    Accountant_Confimation_By: { type: String, required: true, }, 

    Inserted_By:      { type: Number,  required: true, } ,

    Inserted_DateTime:{ type: String,  required: true, } ,    

    Payment_Method_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment_Method_LKP', required:true, },

    Payment_Transaction_Reference_Number: { type: String, required: true, },
    
}, { collection: 'Users_Orders_Main_Log' })

Users_Orders_Main_Log_Schema.virtual('id').get(function () {
    return this._id.toHexString();
});

Users_Orders_Main_Log_Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Users_Orders_Main_Log', Users_Orders_Main_Log_Schema);