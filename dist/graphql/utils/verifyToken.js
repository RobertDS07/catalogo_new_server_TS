"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => new Promise((res) => jsonwebtoken_1.default.verify(token, process.env.SECRET || 'iauds8as97913', (err, decoded) => {
    if (err)
        res();
    res(decoded);
}));
exports.default = verifyToken;
