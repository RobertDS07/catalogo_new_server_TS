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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../../models/User"));
const verifyData_1 = __importDefault(require("../../utils/verifyData"));
const verifyToken_1 = __importDefault(require("../../utils/verifyToken"));
const createToken_1 = __importDefault(require("../../utils/createToken"));
exports.resolvers = {
    createUser: ({ data }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            verifyData_1.default(data);
            if (data.password.length < 5)
                throw new Error('Senha deve conter 5 caracteres ou mais.');
            const alredyExist = yield User_1.default.findOne({
                $or: [
                    { email: data.email },
                    { whatsapp: data.whatsapp }
                ]
            });
            if (!!alredyExist)
                throw new Error('Já temos um registro com essas credencias em nosso sistema.');
            const newUser = yield User_1.default.create(data);
            newUser.password = '';
            const token = createToken_1.default(newUser, '365d');
            return token;
        }
        catch (e) {
            return e;
        }
    }),
    login: ({ password, email }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            verifyData_1.default({ email, password });
            const user = yield User_1.default.findOne({ email }).select('+password');
            if (!user || !(yield bcryptjs_1.default.compare(password, user.password)))
                throw new Error('Credenciais invalidas.');
            user.password = '';
            const token = createToken_1.default(user, '365d');
            return token;
        }
        catch (e) {
            return e;
        }
    }),
    verifyToken: ({ token }) => __awaiter(void 0, void 0, void 0, function* () {
        const validToken = yield verifyToken_1.default(token);
        if (!validToken)
            return;
        return validToken.user;
    })
};
