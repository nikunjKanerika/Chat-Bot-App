import {createLogger,format,transports} from 'winston';
const { combine, json, timestamp, colorize, printf, align} = format;

const consoleLogFormat = combine(
    colorize({all:true}),
    timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf(({level,message,timestamp})=>{
        return `${level} ${timestamp}: ${message}`;
    })
)
const logger = createLogger({
    level: 'info',
    format: consoleLogFormat,
    transports: [
        new transports.Console({
            format: consoleLogFormat,
        }),
        new transports.File({
            filename: "./logs/backend-profile-app-error.log",
            level: 'error'
        }),
        new transports.File({
            filename: "./logs/backend-profile-combined.log"
        })
    ]
})

export default logger;