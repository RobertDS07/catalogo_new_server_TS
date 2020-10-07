"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token = (user, expiresIn) => jsonwebtoken_1.default.sign({ user }, process.env.SECRET || 'iauds8as97913', {
    expiresIn
});
exports.default = token;
