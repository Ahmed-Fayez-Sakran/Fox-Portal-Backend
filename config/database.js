require("dotenv").config();
const mongoose = require('mongoose');

const logger = require('../utils/logger');

mongoose.set("strictQuery", false);

const connectDb = async () => {// 'mongodb://62.67.10.47:27017/'
    await mongoose.connect(process.env.DATABASE_URL, {//'mongodb://localhost/FoxPortal-DB'
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: process.env.DB_NAME
    })
    .then(() => {
        console.log('we are using ' + process.env.DB_NAME);
        console.log('Database Connection is ready...');
    })
    .catch((err) => {
        logger.error(err.message);
    });    
}

module.exports = connectDb;
