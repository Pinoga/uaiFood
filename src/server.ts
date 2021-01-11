import 'reflect-metadata';
import express from 'express'
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql'

import { ItemResolver } from './graphql/resolvers/item'
import { RestaurantResolver } from './graphql/resolvers/restaurant'

import dbconnect from './db'

export default async function startServer() {
    const app = express()
    
    await dbconnect()

    //Schema executável do GraphQL, construído a partir dos resolvers dos dois modelos
    const schema = await buildSchema({
        resolvers: [RestaurantResolver, ItemResolver],
        validate: true
    }) 

    //Endpoint para todos os requests à API
    app.use("/graphql", graphqlHTTP({schema, graphiql: true}))

    app.listen(process.env.PORT, () => {
        console.log("App is listening on port %d", process.env.PORT)
    })
}

startServer()
