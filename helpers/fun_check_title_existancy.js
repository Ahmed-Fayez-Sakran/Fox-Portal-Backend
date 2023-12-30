module.exports.check_title_existancy = async (lkp_Table_Name,val_Id,val_Operation,val_Title_Ar,val_Title_En) => {
    try {
        //#region Variables
        var ObjectId = require('mongodb').ObjectId;
        var tbl_Model = ""
        let itemsCount = ""
        //#endregion

        //#region Define check Operation type and check Models based on table name
        if (val_Operation=="insert") {
            //#region insert
            if (lkp_Table_Name=="business_organizations_lkp") {
                tbl_Model = require("../models/business_organizations_lkp");
                itemsCount = await tbl_Model.find({
                    $or: 
                    [
                        { Organization_Title_En: { $regex: val_Title_En, $options: "i" } },
                        { Organization_Title_Ar: { $regex: val_Title_Ar, $options: "i" } }
                    ]
                });
            }
            else {
                return"";
            }
            //#endregion
        } else{
            //#region update
            if (lkp_Table_Name=="business_organizations_lkp") {
                tbl_Model = require("../models/business_organizations_lkp");
                itemsCount = await tbl_Model.find({
                    $and: 
                    [
                        {
                            $or: 
                            [
                                { Organization_Title_En: val_Title_En },
                                { Organization_Title_Ar: val_Title_Ar }
                            ]
                        },
                        {'_id': {$ne : new ObjectId(val_Id)}}
                    ]                    
                });
            } else if (sent_Table=="sub_services_lkp") {
                tbl_Model = require("../models/Sub_Services_LKP");
                itemsCount = await tbl_Model.find({
                    $and: 
                    [
                        {
                            $or: 
                            [
                                { Sub_Service_Title_En: val_Title_En },
                                { Sub_Service_Title_Ar: val_Title_Ar }
                            ]
                        },
                        {'_id': {$ne : new ObjectId(val_Id)}}
                    ]                    
                });
            }
            else {
                return"";
            }
            //#endregion
        }        
        //#endregion

        return (itemsCount.length)<=0 ? false : true;

    } catch (error) {
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};