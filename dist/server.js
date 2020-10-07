"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_graphql_1 = require("express-graphql");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const schemas_1 = __importDefault(require("./graphql/schemas"));
const app = express_1.default();
app.use(cors_1.default());
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schemas_1.default,
    rootValue: resolvers_1.default,
    graphiql: true
}));
exports.default = app;
