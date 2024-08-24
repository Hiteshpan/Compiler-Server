"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
    console.log('Token:', token);
    if (!token) {
        return res.status(401).send({ message: `Token: ${token}...No token provided. Access denied.` });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).send({ message: `Token: ${token}...Invalid token. Access denied.` });
        }
        req._id = data._id;
        next();
    });
};
exports.verifyToken = verifyToken;
