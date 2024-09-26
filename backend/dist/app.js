"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import globalErrorHandler from './middlewares/error-middleware'
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
//routes import
const chat_router_1 = __importDefault(require("./routes/chat-router"));
app.all('*');
//routes declaration
app.use('/api/v1', chat_router_1.default);
//global error handling middleware
// app.use(globalErrorHandler);
exports.default = app;
