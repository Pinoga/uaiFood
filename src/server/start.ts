import { graphqlHTTP } from 'express-graphql';
import express from 'express'
import { buildSchema } from 'type-graphql'
import { ItemResolver } from '../graphql/resolvers/item'
import { RestaurantResolver } from '../graphql/resolvers/restaurant'

export default async function startServer() {
    const app = express()

    const schema = await buildSchema({
        resolvers: [RestaurantResolver, ItemResolver],
        validate: true
    }) 

    app.use("/graphql", graphqlHTTP({schema, graphiql: true}))

    app.listen(process.env.PORT, () => {
        console.log("App is listening on port %d", process.env.PORT)
    })
}