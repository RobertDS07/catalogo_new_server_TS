import { mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { buildSchema } from 'graphql'
import { print } from 'graphql'
import path from 'path'

const typesArray = loadFilesSync(path.join(__dirname, 'modules', '**', '*.gql'))

const mergedSchemas = mergeTypeDefs(typesArray)
const printedSchemas = print(mergedSchemas)

const schemas = buildSchema(printedSchemas)

export default schemas