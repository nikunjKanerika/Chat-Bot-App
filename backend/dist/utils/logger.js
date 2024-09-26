"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, json, timestamp, colorize, printf, align } = winston_1.format;
const consoleLogFormat = combine(colorize({ all: true }), timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A',
}), align(), printf(({ level, message, timestamp }) => {
    return `${level} ${timestamp}: ${message}`;
}));
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: consoleLogFormat,
    transports: [
        new winston_1.transports.Console({
            format: consoleLogFormat,
        }),
        new winston_1.transports.File({
            filename: "./logs/backend-profile-app-error.log",
            level: 'error'
        }),
        new winston_1.transports.File({
            filename: "./logs/backend-profile-combined.log"
        })
    ]
});
exports.default = logger;
