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

        //#region company privacy policy
        const company_privacy_policy_Routes = require("./routes/company_privacy_policy");
        app.use(`${api}`, company_privacy_policy_Routes);
        //#endregion

        //#region Clients List
        const clients_list_Routes = require("./routes/clients_list");
        app.use(`${api}/`, clients_list_Routes);
        //#endregion
        
    //#endregion


    //#region services

        //#region Subservice Settings
        const subservice_settings_Routes = require("./routes/services/sub_service_settings");
        app.use(`${api}/services/sub_service_settings/`, subservice_settings_Routes);
        //#endregion

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

