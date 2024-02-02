//#region Define Global Variables
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()
const logger = require('./utils/logger');
//#endregion

//#region middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
var corsOptions = {
    origin: "http://localhost:27017"
};
app.use(cors(corsOptions));
//#endregion

//#region Variables
const PORT = process.env.PORT || 27017;
const api = process.env.API_URL;
//#endregion

//#region Routes

    //#region Common

        //#region serial_number
        const serial_number_Routes = require("./routes/serial_number");
        app.use(`${api}/`, serial_number_Routes);
        //#endregion

        //#region Business Organization Settings
        const business_organization_settings_Routes = require("./routes/business_organization_settings");
        app.use(`${api}/`, business_organization_settings_Routes);
        //#endregion

        //#region user data
        const user_data_Routes = require("./routes/user_data");
        app.use(`${api}/`, user_data_Routes);
        //#endregion

        //#region Clients List
        const clients_list_Routes = require("./routes/clients_list");
        app.use(`${api}/`, clients_list_Routes);
        //#endregion
        
    //#endregion

    //#region services

        //#region Add-ons
        const Add_ons_Routes = require("./routes/services/add_ons");
        app.use(`${api}/services/add_ons/`, Add_ons_Routes);
        //#endregion

        //#region Services_With_Addons
        const service_with_add_ons_Routes = require("./routes/services/service_with_add_ons");
        app.use(`${api}/services/service_with_add_ons/`, service_with_add_ons_Routes);
        //#endregion

        //#region Main Service Settings
        const main_service_Routes = require("./routes/services/main_service_settings");
        app.use(`${api}/services/main_service_settings/`, main_service_Routes);
        //#endregion

        //#region Subservice Settings
        const subservice_settings_Routes = require("./routes/services/sub_service_settings");
        app.use(`${api}/services/sub_service_settings/`, subservice_settings_Routes);
        //#endregion

        //#region Trip Type Settings
        const trip_type_settings_Routes = require("./routes/services/trip_type_settings");
        app.use(`${api}/services/trip_type_settings/`, trip_type_settings_Routes);
        //#endregion

        //#region Rent Period
        const Rent_Period_Routes = require("./routes/services/rent_period");
        app.use(`${api}/services/rent_period/`, Rent_Period_Routes);
        //#endregion

        //#region Full Day Package Log
        const full_day_package_Routes = require("./routes/services/full_day_package_log");
        app.use(`${api}/services/full_day_package_log/`, full_day_package_Routes);
        //#endregion

        //#region Bus Trip Full Day Package Log
        const bus_trip_full_day_package_Routes = require("./routes/services/bus_trip_full_day_package_log");
        app.use(`${api}/services/bus_trip_full_day_package_log/`, bus_trip_full_day_package_Routes);
        //#endregion

        //#region Valet Schedule Package Log
        const Valet_Schedule_Package_Log_Routes = require("./routes/services/valet_schedule_package_log");
        app.use(`${api}/services/valet_schedule_package_log/`, Valet_Schedule_Package_Log_Routes);
        //#endregion

        //#region Service Prices
        const service_prices_Routes = require("./routes/services/service_prices");
        app.use(`${api}/services/service_prices/`, service_prices_Routes);
        //#endregion 

        //#region Add-Ons Prices
        const add_ons_pricing_Routes = require("./routes/services/add_ons_pricing");
        app.use(`${api}/services/add_ons_pricing/`, add_ons_pricing_Routes);
        //#endregion

        //#region Service Settings
        const service_settings_Routes = require("./routes/services/service_settings");
        app.use(`${api}/services/service_settings/`, service_settings_Routes);
        //#endregion

    //#endregion

    //#region Vehicles

        //#region Vehicles Data
        const vehicles_data_Routes = require("./routes/vehicles/vehicles_data");
        app.use(`${api}/vehicles/vehicles_data/`, vehicles_data_Routes);
        //#endregion
        
        //#region Vehicle / Vehicle Style List
        const vehicle_style_list_Routes = require("./routes/vehicles/vehicle_style_list");
        app.use(`${api}/vehicles/vehicle_style_list/`, vehicle_style_list_Routes);
        //#endregion
        
        //#region Vehicle / Vehicle Brand List
        const vehicle_brand_list_Routes = require("./routes/vehicles/vehicle_brand_list");
        app.use(`${api}/vehicles/vehicle_brand_list/`, vehicle_brand_list_Routes);
        //#endregion
        
        //#region Vehicle / Vehicle Model List
        const vehicle_model_list_Routes = require("./routes/vehicles/vehicle_model_list");
        app.use(`${api}/vehicles/vehicle_model_list/`, vehicle_model_list_Routes);
        //#endregion
        
        //#region Vehicle / Manufacture Year Setup
        const manufacture_year_setup_Routes = require("./routes/vehicles/manufacture_year_setup");
        app.use(`${api}/vehicles/manufacture_year_setup/`, manufacture_year_setup_Routes);
        //#endregion
        
        //#region Vehicle / Transmission Type Setup
        const transmission_type_setup_Routes = require("./routes/vehicles/transmission_type_setup");
        app.use(`${api}/vehicles/transmission_type_setup/`, transmission_type_setup_Routes);
        //#endregion
        
        //#region Vehicle / Fuel Type Setup
        const fuel_type_setup_Routes = require("./routes/vehicles/fuel_type_setup");
        app.use(`${api}/vehicles/fuel_type_setup/`, fuel_type_setup_Routes);
        //#endregion
        
        //#region Vehicle / Courier Categories Setup
        const courier_categories_setup_Routes = require("./routes/vehicles/courier_categories_setup");
        app.use(`${api}/vehicles/courier_categories_setup/`, courier_categories_setup_Routes);
        //#endregion
        
        //#region Vehicle / Courier Categories Settings
        const courier_categories_settings_Routes = require("./routes/vehicles/courier_categories_settings");
        app.use(`${api}/vehicles/courier_categories_settings/`, courier_categories_settings_Routes);
        //#endregion

        //#region Vehicles / Vehicle Settings
        const vehicle_settings_Routes = require("./routes/vehicles/vehicle_settings");
        app.use(`${api}/vehicles/vehicle_settings/`, vehicle_settings_Routes);
        //#endregion
        
        //#region Vehicles / Vehicle Classifications
        const vehicle_classifications_Routes = require("./routes/vehicles/vehicle_classifications");
        app.use(`${api}/vehicles/vehicle_classifications/`, vehicle_classifications_Routes);
        //#endregion
        
        //#region Vehicles / Vehicles
        const vehicles_Routes = require("./routes/vehicles/vehicles");
        app.use(`${api}/vehicles/vehicles/`, vehicles_Routes);
        //#endregion

    //#endregion

    //#region Offers

        //#region Discounts
        const discounts_Routes = require("./routes/offers/discounts");
        app.use(`${api}/offers/discounts/`, discounts_Routes);
        //#endregion

        //#region Promo Codes
        const promo_codes_Routes = require("./routes/offers/promo_codes");
        app.use(`${api}/offers/promo_codes/`, promo_codes_Routes);
        //#endregion
        
    //#endregion

    //#region Drivers
    const drivers_Routes = require("./routes/drivers");
    app.use(`${api}/drivers/`, drivers_Routes);
    //#endregion

    //#region Service Policy

        //#region company privacy policy
        const company_privacy_policy_Routes = require("./routes/service_policy/company_privacy_policy");
        app.use(`${api}/service_policy`, company_privacy_policy_Routes);
        //#endregion
        
        //#region Terms Conditions
        const terms_conditions_Routes = require("./routes/service_policy/terms_conditions");
        app.use(`${api}/service_policy`, terms_conditions_Routes);
        //#endregion

    //#endregion

    //#region General Settings
    const general_settings_Routes = require("./routes/general_settings/general_settings");
    app.use(`${api}/general_settings`, general_settings_Routes);
    //#endregion
    
    //#region Home
    const dashboard_Routes = require("./routes/home/dashboard");
    app.use(`${api}/home/dashboard`, dashboard_Routes);
    //#endregion
    
    //#region B2C_Limousine Services
    const b2c_Routes = require("./routes/b2c/limousine_services");
    app.use(`${api}/b2c/limousine_services`, b2c_Routes);
    //#endregion



//#endregion


//#region Database
require('./config/database')();
//#endregion

//#region Server
app.listen(PORT, () => {
    console.log('server is running http://localhost:27017');
    logger.info('Server is running on port :   '+ `${PORT}`,"app.js");
});
//#endregion

