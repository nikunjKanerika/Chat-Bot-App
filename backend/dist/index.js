"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 8001;
// Connect to the database
const db_1 = require("./db/db");
(0, db_1.Connection)();
const logger_1 = __importDefault(require("./utils/logger"));
app_1.default.listen(PORT, () => {
    logger_1.default.info(`server running at port ${PORT}`);
});
