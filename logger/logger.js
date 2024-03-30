const {format, createLogger, transports, transport} = require('winston')
require('winston-daily-rotate-file')
require('winston-mongodb')

const {combine, timestamp, label, prettyPrint} = format

const infoFileRotateTransport = new transports.DailyRotateFile({
    level: "info",
    filename: "logs/info-%DATE%.log",
    datePattern: "DD-MM-YYYY",
    maxFiles: "10d"
})

const logger = createLogger({
    format: combine (
        label({label: "Logs for Users Products App"}),
        timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }),
        format.json(),
        // prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            level: "debug",
            filename: "logs/debug.log"
        }),
        new transports.File({
            level: "error",
            filename: "logs/error.log"
        }),
        infoFileRotateTransport,
        new transports.MongoDB({
            level: "info",
            db: process.env.MONGODB_URI,
            collection: "server_logs",
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
})

module.exports = logger