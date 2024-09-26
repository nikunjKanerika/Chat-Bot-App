"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const prodErrors = (res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }
    else {
        logger_1.default.error(`Error: ${error.message} | Stack: ${error.stack}`);
        res.status(error.statusCode).json({
            status: 'error',
            message: 'Something went wrong. Please try again later'
        });
    }
};
const devErrors = (res, error) => {
    logger_1.default.error(`${error.statusCode} ${error.message}`);
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrack: error.stack,
        error: error
    });
};
exports.default = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV === 'production') {
        prodErrors(res, error);
    }
    else if (process.env.NODE_ENV === 'development') {
        devErrors(res, error);
    }
    else {
        res.status(error.statusCode).json({
            status: error.status,
            message: 'An unexpected error occurred.'
        });
    }
    // devErrors(res,error);
};
