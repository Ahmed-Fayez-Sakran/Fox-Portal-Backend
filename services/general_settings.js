//#region Global Variables
var tbl_Model = ""
//var discount_type_Model = ""
const now_DateTime = require('../helpers/fun_datetime');
const obj_Get_Photo_Path = require('../helpers/fun_get_photo_path');
//#endregion


exports.check_Sent_LKP_Tables_Existancy = async (lkp_Table_Name) => {

    try {
        //console.log("lkp_Table_Name is equal = "+lkp_Table_Name)
        const lkp_Tables = [
            "addons_lkp","airline_lkp","brand_name_lkp","business_organizations_lkp","cancel_reason_lkp",
            "courier_categories_lkp","creditcard_type_lkp","discount_method_lkp","extra_reason_lkp","fuel_type_lkp",
            "model_lkp","payment_method_lkp","refund_reason_lkp","report_reason_lkp","style_lkp",
            "transmission_type_lkp","vehicle_change_reasons_lkp","year_manufacturing_lkp","main_services_lkp","sub_services_lkp",
            "discount_type_lkp","trip_type_lkp","order_status_lkp","user_roles_lkp"
        ];      
        //console.log("lkp_Tables.includes(lkp_Table_Name) = "+lkp_Tables.includes(lkp_Table_Name))  
        return (lkp_Tables.includes(lkp_Table_Name));
    } catch (error) {
        console.log(error.message);
    }

};

exports.get_Data_By_SuspendStatus = async (lkp_Table_Name,suspendStatus,pageNumber) => {

    try {
        //#region Variables
        var val_Returned_Object = "";
        var pageSize = 10 ;
        var skip = (pageNumber - 1) * pageSize;
        //#endregion

        //#region Create Model Object Based on Table Name
        if (lkp_Table_Name=="airline_lkp") {
            tbl_Model = require("../models/airline_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Airline_Title_En": 1,
                            "Airline_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Airline_Title_En": 1,
                            "Airline_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }                
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                        "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Airline_Title_En": 1,
                            "Airline_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                        }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                        "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Airline_Title_En": 1,
                            "Airline_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                        }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Airline_Title_En": 1,
                            "Airline_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Airline_Title_En": 1,
                            "Airline_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="discount_type_lkp") {
            tbl_Model = require("../models/discount_type_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Title_En": 1,
                            "Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Title_En": 1,
                            "Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }                
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Title_En": 1,
                            "Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Title_En": 1,
                            "Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }                
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Title_En": 1,
                            "Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Title_En": 1,
                            "Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }                
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="creditcard_type_lkp") {
            tbl_Model = require("../models/creditcard_type_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Type_Title_En": 1,
                            "Type_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Type_Title_En": 1,
                            "Type_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }                
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Type_Title_En": 1,
                            "Type_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Type_Title_En": 1,
                            "Type_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Type_Title_En": 1,
                            "Type_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Type_Title_En": 1,
                            "Type_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="report_reason_lkp") {
            tbl_Model = require("../models/report_reason_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Report_Reason_Title_En": 1,
                            "Report_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Report_Reason_Title_En": 1,
                            "Report_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Report_Reason_Title_En": 1,
                            "Report_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Report_Reason_Title_En": 1,
                            "Report_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Report_Reason_Title_En": 1,
                            "Report_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Report_Reason_Title_En": 1,
                            "Report_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="cancel_reason_lkp") {
            tbl_Model = require("../models/cancel_reason_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Cancel_Reason_Title_En": 1,
                            "Cancel_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Cancel_Reason_Title_En": 1,
                            "Cancel_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Cancel_Reason_Title_En": 1,
                            "Cancel_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Cancel_Reason_Title_En": 1,
                            "Cancel_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Cancel_Reason_Title_En": 1,
                            "Cancel_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Cancel_Reason_Title_En": 1,
                            "Cancel_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="extra_reason_lkp") {
            tbl_Model = require("../models/extra_reason_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Extra_Reason_Title_En": 1,
                            "Extra_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Extra_Reason_Title_En": 1,
                            "Extra_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Extra_Reason_Title_En": 1,
                            "Extra_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Extra_Reason_Title_En": 1,
                            "Extra_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Extra_Reason_Title_En": 1,
                            "Extra_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Extra_Reason_Title_En": 1,
                            "Extra_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="refund_reason_lkp") {
            tbl_Model = require("../models/refund_reason_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Refund_Reason_Title_En": 1,
                            "Refund_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Refund_Reason_Title_En": 1,
                            "Refund_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Refund_Reason_Title_En": 1,
                            "Refund_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Refund_Reason_Title_En": 1,
                            "Refund_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Refund_Reason_Title_En": 1,
                            "Refund_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Refund_Reason_Title_En": 1,
                            "Refund_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="payment_method_lkp") {
            tbl_Model = require("../models/payment_method_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Payment_Method_Title_En": 1,
                            "Payment_Method_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Payment_Method_Title_En": 1,
                            "Payment_Method_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Payment_Method_Title_En": 1,
                            "Payment_Method_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Payment_Method_Title_En": 1,
                            "Payment_Method_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Payment_Method_Title_En": 1,
                            "Payment_Method_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Payment_Method_Title_En": 1,
                            "Payment_Method_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="vehicle_change_reasons_lkp") {
            tbl_Model = require("../models/vehicle_change_reasons_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Change_Reason_Title_En": 1,
                            "Change_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Change_Reason_Title_En": 1,
                            "Change_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Change_Reason_Title_En": 1,
                            "Change_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Change_Reason_Title_En": 1,
                            "Change_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Change_Reason_Title_En": 1,
                            "Change_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Change_Reason_Title_En": 1,
                            "Change_Reason_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="order_status_lkp") {
            tbl_Model = require("../models/order_status_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Order_Status_Title_En": 1,
                            "Order_Status_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Order_Status_Title_En": 1,
                            "Order_Status_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Order_Status_Title_En": 1,
                            "Order_Status_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                    { $match: { Is_Suspended: false } },
                    {
                        "$project": {
                        "id": "$_id",
                        "Serial_Number": 1,
                        "Order_Status_Title_En": 1,
                        "Order_Status_Title_Ar": 1,
                        "Inserted_By": 1,
                        "Inserted_DateTime": 1,
                        "Updated_By": 1,
                        "Updated_DateTime": 1,
                        "Is_Suspended": 1,
                        "_id": 0
                        }
                    }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Order_Status_Title_En": 1,
                            "Order_Status_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                            "id": "$_id",
                            "Serial_Number": 1,
                            "Order_Status_Title_En": 1,
                            "Order_Status_Title_Ar": 1,
                            "Inserted_By": 1,
                            "Inserted_DateTime": 1,
                            "Updated_By": 1,
                            "Updated_DateTime": 1,
                            "Is_Suspended": 1,
                            "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else if (lkp_Table_Name=="user_roles_lkp") {
            tbl_Model = require("../models/user_roles_lkp");

            if (suspendStatus.trim() ==="only-true") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                                "id": "$_id",
                                "Serial_Number": 1,
                                "Role_Title_En": 1,
                                "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: true } },
                        {
                            "$project": {
                                "id": "$_id",
                                "Serial_Number": 1,
                                "Role_Title_En": 1,
                                "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="only-false") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                                "id": "$_id",
                                "Serial_Number": 1,
                                "Role_Title_En": 1,
                                "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        { $match: { Is_Suspended: false } },
                        {
                            "$project": {
                                "id": "$_id",
                                "Serial_Number": 1,
                                "Role_Title_En": 1,
                                "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else if(suspendStatus.trim() ==="all") {
                if (pageNumber=="0") {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                                "id": "$_id",
                                "Serial_Number": 1,
                                "Role_Title_En": 1,
                                "_id": 0
                            }
                        }
                    ]);
                } else {
                    val_Returned_Object = await tbl_Model.aggregate([
                        {
                            "$project": {
                                "id": "$_id",
                                "Serial_Number": 1,
                                "Role_Title_En": 1,
                                "_id": 0
                            }
                        }
                    ]).skip(skip).limit(pageSize);
                }
            } else{
                return"";
            }
            
        }
        else {
            return"";
        }
        //#endregion
    } catch (error) {
      console.log(error.message);
    }
     
};
