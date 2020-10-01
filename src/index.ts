import server from './server'
import DB from './database'

DB()

server.listen(process.env.PORT || 8081, () => console.log('http://localhost:8081/graphql'))