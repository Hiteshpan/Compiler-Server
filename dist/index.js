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
// const port = parseInt(process.env.PORT || "3000", 10);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    // origin: ["http://localhost:5173", process.env.CLIENT_URL!],
    origin: ["https://compiler-client.vercel.app/", process.env.CLIENT_URL],
    methods: ['POST', 'GET'],
    credentials: true,
}));
app.use("/compiler", compilerRouter_1.compilerRouter);
app.use("/user", userRouter_1.userRouter);
(0, dbConnect_1.dbConnect)();
// app.listen(port, '0.0.0.0', () => {
//     console.log(`App listening on port ${port}`)
// })
const port = parseInt(process.env.PORT_URL || "3000", 10);
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
