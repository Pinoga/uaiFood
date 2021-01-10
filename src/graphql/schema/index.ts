// import { ItemResolver } from './../resolvers/item';
// import { RestaurantResolver } from './../resolvers/restaurant';
// import {buildSchema} from 'type-graphql'

// const typeDefs = `
//     type Item {
//         id: ID
//         name: String!
//         cuisineType: String!
//         price: Float!
//     }

//     type Point {
//         type: String!
//         coordinates: [Int]!
//     }

//     type Restaurant {
//         id: ID
//         name: String!
//         cuisineType: String!
//         city: String!
//         location: [Int!]!
//         items: [Item]
//     }
    
//     input DistanceInput {
//         center: [Int!]!
//         radius: Int!
//     }
    
//     input ItemInput {
//         name: String!
//         cuisineType: String!
//         price: Float!
//     }
    
//     input ItemInputOptional {
//         name: String
//         cuisineType: String
//         price: Float
//     }
    
//     input RestaurantInput {
//         name: String!
//         cuisineType: String!
//         city: String!
//         items: [ItemInput]
//         location: [Int!]!
//     }
    
//     type Query {
//         restaurants(city: String, distance: DistanceInput, cuisineType: String, itemRelated: String): [Restaurant]
//         items: [Item]
//     }

//     type Mutation {
//         createRestaurant(restaurant: RestaurantInput!): Restaurant
//         createItem(item: ItemInput!, restaurantId: ID!): Item
//         updateItem(restaurantId: ID!, itemId: ID!, newData: ItemInputOptional!): Item
//     }

//     schema {
//         query: Query
//         mutation: Mutation
//     }
// `



// const schema = buildSchema(`
//     type Query {
//         message(a: String!): String
//     }
// `)


// const customizationOptions = {};

// const RestaurantTC = composeMongoose(Restaurant, customizationOptions);
// const ItemTC = composeMongoose(Item, customizationOptions);

// const TItemTC = toInputObjectType(ItemTC)

// const RestaurantQuery = {
//     restaurantMany: RestaurantTC.mongooseResolvers.findMany(),
//     restaurantById: RestaurantTC.mongooseResolvers.findById(),
// };
// const RestaurantMutation = {
//     restaurantCreateOne: RestaurantTC.mongooseResolvers.createOne(),
// };


// const schemaComposer = new SchemaComposer();

// const resolver = schemaComposer.createResolver({
//     name: 'addItemToRestaurant',
//     kind: 'mutation',
//     resolve: () => {}
//     // resolve: async (source, args, context, info)  => {
//         //     const item = await Item.create({
//             //         ...args.item
//             //     })
//             //     return Restaurant.findByIdAndUpdate(args.restaurantId, {$push: args.restaurantId})
//             // }
//         });
        
//         ItemTC.addResolver(resolver)
        
// const ItemQuery = {
//     itemById: ItemTC.mongooseResolvers.findById(),
// };
// const ItemMutation = {
//     itemCreateOne: ItemTC.mongooseResolvers.createOne(),
//     itemUpdateOne: ItemTC.mongooseResolvers.updateOne(),
//     addItemToRestaurant: ItemTC.getResolver('addItemToRestaurant')
// };

// schemaComposer.Query.addFields({
//     ...ItemQuery,
//     ...RestaurantQuery,
// });

// schemaComposer.Mutation.addFields({
//     ...ItemMutation,
//     ...RestaurantMutation,
// });

// export default schemaComposer.buildSchema();