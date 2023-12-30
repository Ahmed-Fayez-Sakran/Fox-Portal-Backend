//#region Global Variables
var lkp_Table_Name = "";
const fun_handled_messages = require('../helpers/fun_handled_messages');
const fun_get_serial_number = require('../helpers/fun_get_serial_number');
const logger = require('../utils/logger');
//#endregion

exports.get_serial_number =  async(req, res) => {

    try {
        //#region Global Variables
        lkp_Table_Name = req.params.lkp_Table_Name;
        langTitle = req.params.langTitle;
        //#endregion
        
        new Promise(async (resolve, reject)=>{
            var exist = fun_get_serial_number.get_Serial_Number(lkp_Table_Name);
            resolve(exist);
        }).then((New_Serial_Number) => {
            if ((!New_Serial_Number)||(New_Serial_Number.length<=0)) {
                //#region wrong message selection
                new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,8);
                    resolve(result);
                }).then((msg) => {
                    res.status(500).json({data: [] , message: msg , status: "system error" });                    
                })
                //#endregion 
            } else {
                res.status(200).json({ data: New_Serial_Number , message: "" , status: "data selected" });
            }
        })

    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ data:[] , message:err.message , status: "error" });
    }

};