"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyData = (data) => {
    for (const x in data) {
        if (data[x] === null || data[x] === undefined || String(data[x]).trim() === '') {
            throw new Error(`Não é possível enviar o campo ${x} vazio.`);
        }
    }
};
exports.default = verifyData;
