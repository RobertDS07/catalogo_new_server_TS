"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const load_files_1 = require("@graphql-tools/load-files");
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
const path_1 = __importDefault(require("path"));
const typesArray = load_files_1.loadFilesSync(path_1.default.join(__dirname, 'modules', '**', '*.gql'));
const mergedSchemas = merge_1.mergeTypeDefs(typesArray);
const printedSchemas = graphql_2.print(mergedSchemas);
const schemas = graphql_1.buildSchema(printedSchemas);
exports.default = schemas;
