import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'

import rootValue from './graphql/resolvers'
import schema from './graphql/schemas'

const app = express()

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

export default app