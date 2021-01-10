import { graphqlHTTP } from 'express-graphql';
import schema from './schema'
import resolvers from './resolvers'

export default graphqlHTTP({
    schema, rootValue: resolvers, graphiql: true
})