module.exports.get_Photo_Path = async (id,sent_Table) => {
    try {
        //#region Variables
        var tbl_Model = ""
        var item = ""
        var returned_Photo = ""
        //#endregion
        if(sent_Table=="user_data") {
            tbl_Model = require("../models/user_data");
            item = await tbl_Model.findById(id).sort({ _id: -1 }).limit(1);
            returned_Photo =  item.Photo_Profile;
        }
        else if (sent_Table=="business_organizations_lkp") {
            tbl_Model = require("../models/business_organizations_lkp");
            item = await tbl_Model.findById(id).sort({ _id: -1 }).limit(1);
            returned_Photo =  item.Photo_Organization;
        }
        else if (sent_Table=="vehicles_data") {
            tbl_Model = require("../models/vehicles_data");
            item = await tbl_Model.findById(id).sort({ _id: -1 }).limit(1);
            returned_Photo =  item.photo_Path;
        }
        // else if (sent_Table=="addons_lkp") {
        //     tbl_Model = require("../models/addons_lkp");
        //     item = await tbl_Model.findById(id).sort({ _id: -1 }).limit(1);
        //     returned_Photo =  item.Photo_Path;
        // }
        return returned_Photo;

    } catch (error) {
        console.log(error.message);
    }
};