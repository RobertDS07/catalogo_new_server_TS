"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Products_1 = __importDefault(require("../../../models/Products"));
const verifyData_1 = __importDefault(require("../../utils/verifyData"));
const verifyToken_1 = __importDefault(require("../../utils/verifyToken"));
exports.resolvers = {
    products: ({ sort, skip, limit, search, category }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!search)
                search = '';
            if (!skip)
                skip = 0;
            const products = !category ? !sort ? yield Products_1.default.find({ name: { $regex: search } }).skip(skip).sort('category').limit(limit) : yield Products_1.default.find(({ name: { $regex: search } })).sort({ price: sort }).skip(skip).limit(limit) : !sort ? yield Products_1.default.find({ $and: [{ name: { $regex: search } }, { category }] }).skip(skip).sort('category').limit(limit) : yield Products_1.default.find({ $and: [{ name: { $regex: search } }, { category }] }).sort({ price: sort }).skip(skip).limit(limit);
            if (!products)
                throw new Error('Ooops, houve algo de errado. Tente novamente mais tarde.');
            return products;
        }
        catch (e) {
            return e;
        }
    }),
    product: ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield Products_1.default.findOne({ _id });
        return product;
    }),
    categories: () => __awaiter(void 0, void 0, void 0, function* () { return yield Products_1.default.distinct('category'); }),
    createProduct: ({ token, data }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            verifyData_1.default(data);
            const verifiedToken = yield verifyToken_1.default(token);
            if (!verifiedToken)
                throw new Error('Houve algum problema com suas credencias, tente fazer login novamente.');
            if (!verifiedToken.user.admin)
                throw new Error('Você não esta autorizado a fazer isso.');
            const createdProduct = yield Products_1.default.create(data);
            if (!createdProduct)
                throw new Error('Houve algum problema na hora de cadastrar, tente novamente.');
            return true;
        }
        catch (e) {
            return e;
        }
    }),
    updateProduct: ({ token, data, _id }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            verifyData_1.default(data);
            const verifiedToken = yield verifyToken_1.default(token);
            if (!verifiedToken)
                throw new Error('Houve algum problema com suas credencias, tente fazer login novamente.');
            if (!verifiedToken.user.admin)
                throw new Error('Você não esta autorizado a fazer isso.');
            const updatedProduct = yield Products_1.default.updateOne({ _id }, data);
            if (!updatedProduct)
                throw new Error('Ocorreu algum erro no processo... Tente novamente.');
            return true;
        }
        catch (e) {
            return e;
        }
    }),
    deleteProduct: ({ token, _id }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const verifiedToken = yield verifyToken_1.default(token);
            if (!verifiedToken)
                throw new Error('Houve algum problema com suas credencias, tente fazer login novamente.');
            if (!verifiedToken.user.admin)
                throw new Error('Você não esta autorizado a fazer isso.');
            const deletedProduct = yield Products_1.default.findOneAndDelete({ _id });
            if (!deletedProduct)
                throw new Error('Ocorreu algum erro no processo... Tente novamente.');
            return true;
        }
        catch (e) {
            return e;
        }
    })
};
