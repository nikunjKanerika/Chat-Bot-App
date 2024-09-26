"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DATABASE;
const DATABASE_PORT = process.env.DATABASE_PORT;
const HOST = process.env.HOST;
exports.client = new pg_1.Client({
    host: HOST,
    port: Number(DATABASE_PORT),
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE
});
const Connection = () => {
    exports.client.connect()
        .then(() => logger_1.default.info('Database connected successfully'))
        .catch(() => logger_1.default.error('Error while connection'));
};
exports.Connection = Connection;
