import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import { RestaurantResolver } from './resolvers/restaurant';
import { ItemResolver } from './resolvers/item';


function schema() {
    let schema
    buildSchema({
        resolvers: [RestaurantResolver, ItemResolver],
    }).then(s => schema = s)    
    return schema
}
export default graphqlHTTP({
    schema: schema(),
    graphiql: true,
})