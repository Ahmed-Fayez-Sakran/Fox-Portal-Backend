require("dotenv").config();
const mongoose = require('mongoose');

const logger = require('../utils/logger');

mongoose.set("strictQuery", false);

// const connectDb = async () => {// 'mongodb://62.67.10.47:27017/'
//     await mongoose.connect(process.env.DATABASE_URL, {//'mongodb://localhost/FoxPortal-DB'
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true,
//         dbName: process.env.DB_NAME
//     })
//     .then(() => {
//         console.log('we are using ' + process.env.DB_NAME);
//         console.log('Database Connection is ready...');
//     })
//     .catch((err) => {
//         logger.error(err.message);
//     });    
// }


console.log('Start...1');

//start true connection
const connectDb = async () => {//mongodb://127.0.0.1:24017
    console.log('Start...2');
// mongodb://127.0.0.1:24017/FoxPortal_DB
const connectionString = "mongodb://localhost:27017/FoxPortal_DB";

console.log('Start...3');

const dbconnect = await mongoose.connect(connectionString, {  })
    .then(() => {
        console.log('we are using ' + process.env.DB_NAME);
        console.log('Database Connection is ready...');
    })
    .catch((err) => {
        console.log('Database Connection is NOT ready...')
        console.log(err)
        //logger.error(" ***** "+process.env.DB_NAME+" ***** "+err.message);
    });    
}

connectDb.call()
console.log('Start...4');



module.exports = connectDb;
