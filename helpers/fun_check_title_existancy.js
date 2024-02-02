module.exports.check_title_existancy = async (lkp_Table_Name , val_Id , val_Operation , val_Lang ,val_Title , val_Brand_ID , val_Sub_Service_Id) => {
    try {
        //#region Variables
        var ObjectId = require('mongodb').ObjectId;
        var tbl_Model = ""
        let itemsCount = ""
        //#endregion

        //#region Define check Operation type and check Models based on table name
        if (val_Operation=="insert")
        {
            //#region insert
            if (lkp_Table_Name=="business_organizations_lkp")
            {
                tbl_Model = require("../models/business_organizations_lkp");
                if (val_Lang=="ar")
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Organization_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Organization_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="addons_lkp")
            {
                tbl_Model = require("../models/addons_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Addons_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Addons_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="rent_period")
            {
                tbl_Model = require("../models/rent_period");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Period_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Period_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="full_day_package_log")
            {
                tbl_Model = require("../models/full_day_package_log");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Package_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Package_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="bus_trip_full_day_package_log")
            {
                tbl_Model = require("../models/bus_trip_full_day_package_log");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Package_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Package_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="valet_schedule_package_log")
            {
                tbl_Model = require("../models/valet_schedule_package_log");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Package_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Package_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="style_lkp")
            {
                tbl_Model = require("../models/style_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Style_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Style_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="brand_name_lkp")
            {
                tbl_Model = require("../models/brand_name_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Brand_Name_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Brand_Name_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="fuel_type_lkp")
            {
                tbl_Model = require("../models/fuel_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Fuel_Type_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Fuel_Type_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="model_lkp")
            {
                tbl_Model = require("../models/model_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Brand_ID: new ObjectId(val_Brand_ID) },
                            { Model_Name_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Brand_ID: new ObjectId(val_Brand_ID) },
                            { Model_Name_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="year_manufacturing_lkp")
            {
                tbl_Model = require("../models/year_manufacturing_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Year_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Year_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="transmission_type_lkp")
            {
                tbl_Model = require("../models/transmission_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Transmission_Type_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Transmission_Type_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="courier_categories_lkp")
            {
                tbl_Model = require("../models/courier_categories_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Category_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Category_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if(lkp_Table_Name=="vehicles_categories_per_subservices")
            {
                tbl_Model = require("../models/vehicles_categories_per_subservices");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Sub_Service_Id: new ObjectId(val_Sub_Service_Id) },
                            { Classification_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Sub_Service_Id: new ObjectId(val_Sub_Service_Id) },
                            { Classification_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]
                    }).count();
                }
            }
            else if (lkp_Table_Name=="airline_lkp") 
            {
                tbl_Model = require("../models/airline_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Airline_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Airline_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="cancel_reason_lkp") 
            {
                tbl_Model = require("../models/cancel_reason_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Cancel_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Cancel_Reason_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="courier_categories_lkp") 
            {
                tbl_Model = require("../models/courier_categories_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Category_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Category_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="creditcard_type_lkp") 
            {
                tbl_Model = require("../models/creditcard_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Type_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Type_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="extra_reason_lkp") 
            {
                tbl_Model = require("../models/extra_reason_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Extra_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Extra_Reason_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="payment_method_lkp")
            {
                tbl_Model = require("../models/payment_method_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Payment_Method_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Payment_Method_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="refund_reason_lkp")
            {
                tbl_Model = require("../models/refund_reason_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Refund_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Refund_Reason_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="report_reason_lkp") 
            {
                tbl_Model = require("../models/report_reason_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Report_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Report_Reason_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="discount_type_lkp") 
            {
                tbl_Model = require("../models/discount_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="vehicle_change_reasons_lkp") 
            {
                tbl_Model = require("../models/vehicle_change_reasons_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Change_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Change_Reason_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="order_status_lkp") 
            {
                tbl_Model = require("../models/order_status_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Order_Status_Title_Ar: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Order_Status_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="user_roles_lkp") 
            {
                tbl_Model = require("../models/user_roles_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Role_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Role_Title_En: val_Title },
                            { Is_Suspended: false }
                        ]                    
                    }).count();
                }
            }

            else 
            {
                return"";
            }
            //#endregion
        } else
        {
            //#region update
            if (lkp_Table_Name=="business_organizations_lkp")
            {
                tbl_Model = require("../models/business_organizations_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Organization_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Organization_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="addons_lkp")
            {
                tbl_Model = require("../models/addons_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Addons_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Addons_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="sub_services_lkp")
            {
                tbl_Model = require("../models/sub_services_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Sub_Service_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Sub_Service_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="main_services_lkp")
            {
                tbl_Model = require("../models/main_services_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Service_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Service_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="trip_type_lkp")
            {
                tbl_Model = require("../models/trip_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Type_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Type_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="rent_period")
            {
                tbl_Model = require("../models/rent_period");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Period_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Period_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="full_day_package_log")
            {
                tbl_Model = require("../models/full_day_package_log");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Package_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Package_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="bus_trip_full_day_package_log")
            {
                tbl_Model = require("../models/bus_trip_full_day_package_log");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Package_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Package_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="valet_schedule_package_log")
            {
                tbl_Model = require("../models/valet_schedule_package_log");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Package_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Package_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="style_lkp")
            {
                tbl_Model = require("../models/style_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Style_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Style_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="brand_name_lkp")
            {
                tbl_Model = require("../models/brand_name_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Brand_Name_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Brand_Name_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="fuel_type_lkp")
            {
                tbl_Model = require("../models/fuel_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Fuel_Type_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Fuel_Type_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="model_lkp")
            {
                tbl_Model = require("../models/model_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Brand_ID: new ObjectId(val_Brand_ID) },
                            { Model_Name_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Brand_ID: new ObjectId(val_Brand_ID) },
                            { Model_Name_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="year_manufacturing_lkp")
            {
                tbl_Model = require("../models/year_manufacturing_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Year_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Year_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="transmission_type_lkp")
            {
                tbl_Model = require("../models/transmission_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Transmission_Type_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Transmission_Type_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if (lkp_Table_Name=="courier_categories_lkp")
            {
                tbl_Model = require("../models/courier_categories_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Category_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Category_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }
            else if(lkp_Table_Name=="vehicles_categories_per_subservices")
            {
                tbl_Model = require("../models/vehicles_categories_per_subservices");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Sub_Service_Id: new ObjectId(val_Sub_Service_Id) },
                            { Classification_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]
                    }).count();
                } 
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: [
                            { Sub_Service_Id: new ObjectId(val_Sub_Service_Id) },
                            { Classification_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]
                    }).count();
                }
            }
            else if (lkp_Table_Name=="airline_lkp") 
            {
                tbl_Model = require("../models/airline_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Airline_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Airline_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="cancel_reason_lkp") 
            {
                tbl_Model = require("../models/cancel_reason_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Cancel_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Cancel_Reason_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="courier_categories_lkp") 
            {
                tbl_Model = require("../models/courier_categories_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Category_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Category_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="creditcard_type_lkp") 
            {
                tbl_Model = require("../models/creditcard_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Type_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Type_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="extra_reason_lkp") 
            {
                tbl_Model = require("../models/extra_reason_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Extra_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Extra_Reason_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="payment_method_lkp") 
            {
                tbl_Model = require("../models/payment_method_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Payment_Method_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Payment_Method_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="refund_reason_lkp") 
            {
                tbl_Model = require("../models/refund_reason_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Refund_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Refund_Reason_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="report_reason_lkp") 
            {
                tbl_Model = require("../models/report_reason_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Report_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Report_Reason_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="discount_type_lkp") 
            {
                tbl_Model = require("../models/discount_type_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="vehicle_change_reasons_lkp") 
            {
                tbl_Model = require("../models/vehicle_change_reasons_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Change_Reason_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Change_Reason_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="order_status_lkp") 
            {
                tbl_Model = require("../models/order_status_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Order_Status_Title_Ar: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Order_Status_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            } 
            else if (lkp_Table_Name=="user_roles_lkp") 
            {
                tbl_Model = require("../models/user_roles_lkp");
                if (val_Lang=="ar") 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Role_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
                else 
                {
                    itemsCount = await tbl_Model.find({
                        $and: 
                        [
                            { Role_Title_En: val_Title },
                            { Is_Suspended: false },
                            {'_id': {$ne : new ObjectId(val_Id)}}
                        ]                    
                    }).count();
                }
            }

            else 
            {
                return"";
            }
            //#endregion
        }
        //#endregion

        console.log("itemsCount = "+itemsCount)
        
        return itemsCount <=0 ? false : true;

    } catch (error) {
        const logger = require('../utils/logger');
        logger.error(error.message);
        console.log(error.message);
    }
};