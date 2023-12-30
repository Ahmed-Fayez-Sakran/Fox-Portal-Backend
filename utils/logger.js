const { createLogger, transports, format} = require('winston');
require('winston-mongodb');

const logger = createLogger({
    transports:[
        new transports.File({
            filename: 'server-info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level:'info',
            db: process.env.DATABASE_URL,
            options:{
                useUnifiedTopology: true
            },
            collection:'server_info_logs',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level:'error',
            db: process.env.DATABASE_URL,
            options:{
                useUnifiedTopology: true
            },
            collection:'server_error_logs',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;