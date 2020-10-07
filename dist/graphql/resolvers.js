"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const load_files_1 = require("@graphql-tools/load-files");
const path_1 = __importDefault(require("path"));
const resolversArry = load_files_1.loadFilesSync(path_1.default.join(__dirname, 'modules', '**', 'resolvers.js'));
const mergedResolvers = merge_1.mergeResolvers(resolversArry);
exports.default = mergedResolvers;
