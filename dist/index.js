"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const dbConnect_1 = require("./lib/dbConnect");
const compilerRouter_1 = require("./routes/compilerRouter");
const userRouter_1 = require("./routes/userRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "3000", 10);
app.use(express_1.default.json());
(0, dbConnect_1.dbConnect)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [process.env.CLIENT_URL || 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.options('*', (0, cors_1.default)({
    origin: [process.env.CLIENT_URL || 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://compiler-client.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log('Access-Control-Allow-Origin:', res.getHeader('Access-Control-Allow-Origin'));
    });
    next();
});
app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
});
app.use("/compiler", compilerRouter_1.compilerRouter);
app.use("/user", userRouter_1.userRouter);
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`);
});
