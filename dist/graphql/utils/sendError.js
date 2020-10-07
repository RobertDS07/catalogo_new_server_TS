"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendError = (msg) => {
    throw new Error(msg);
};
exports.default = sendError;
