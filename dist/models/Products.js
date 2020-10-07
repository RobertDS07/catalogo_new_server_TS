"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    fotourl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
    }
});
const Product = mongoose_1.default.model('Produto', Schema);
exports.default = Product;
