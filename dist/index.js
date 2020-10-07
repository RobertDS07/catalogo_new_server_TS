"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const database_1 = __importDefault(require("./database"));
database_1.default();
server_1.default.listen(process.env.PORT || 8081, () => console.log('http://localhost:8081/graphql'));
