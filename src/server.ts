import 'reflect-metadata';
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { ItemResolver } from './graphql/resolvers/item'
import { RestaurantResolver } from './graphql/resolvers/restaurant'

import dbconnect from './db'

export default async function startServer() {
    // const app = express()
    
    await dbconnect()

    //Schema executável do GraphQL, construído a partir dos resolvers dos dois modelos
    const schema = await buildSchema({
        resolvers: [RestaurantResolver, ItemResolver],
        validate: true
    }) 

    const server = new ApolloServer({
        schema, playground: true
    })

    await server.listen(process.env.PORT)
    console.log(`App is listening on port ${process.env.HOST_PORT}`)
}

startServer()
