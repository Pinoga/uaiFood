import { Item, Restaurant } from '../../models'

const resolvers = {
    Query: {
        async restaurants (root, args, context, info) {
            console.log(args)
            const { city, distance, cuisineType, itemRelated } = args;
            const query = {};
            try {
    
                if (city) {
                    query['city'] = city;
                }
    
                if (distance) {
                    query['location'] = {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: distance.center
                            },
                            $maxDistance: distance.radius*1000,
                            $minDistance: 0,
                        }
                    };
                }
    
                if (cuisineType) {
                    query['$text'] = {
                        $search: cuisineType,
                        $language: "pt",
                        $caseSensitive: false,
                        $diacriticSensitive: false,
                    };
                }
    
                if (itemRelated) {
                    const relatedItems = await Item.find({
                        $text: {
                            $search: itemRelated,
                        }
                    }, '_id');
                    console.log(relatedItems);
                    query['items'] = {
                        $in: relatedItems,
                    };
                }
                return await Restaurant.find(query).populate('items');
            } catch (err) {
                console.error(err)
                throw Error(`Error fetching restaurants`);
            }
        },
        async items(root, args, context, info) {
            try {
                return await Item.find({})
            } catch(err) {
                console.error(err)
                throw Error(`Error fetching items`);
            }
        },
    },
    Mutation: {
        async createRestaurant(root, args, context, info) {
            const {restaurant} = args;
            try {
                const savedItems = [];
                for (let item of restaurant.items) {
                    savedItems.push((await new Item(item).save())._id);
                }
                const newRestaurant = await new Restaurant({
                    name: restaurant.name,
                    cuisineType: restaurant.cuisineType,
                    city: restaurant.city,
                    location: restaurant.location,
                    items: savedItems
                }).save();
                return newRestaurant.populate('items').execPopulate();
            } catch (err) {
                console.error(err)
                throw Error(`Error creating new Restaurant`);
            }
        },
    
        async createItem (root, args, context, info) {
            const {item, restaurantId} = args;
            try {
                const newItem = await new Item(item).save();
                await Restaurant.findOneAndUpdate({_id: restaurantId}, {$push: {items: newItem._id}});
                return newItem;
            } catch (err) {
                console.error(err)
                throw Error(`Error creating new Item`);
            }
        },
    
         async updateItem (root, args, context, info) {
            const {itemId, restaurantId, newData} = args;
            try {
                const restaurant = await Restaurant.findOne({_id: restaurantId});
                if (!restaurant) throw Error(`Restaurant not found for id ${restaurantId}`);
                if (restaurant.items.includes(itemId)) {
                    const item = await Item.findOneAndUpdate({_id: itemId}, {$set: newData}, {new: true, useFindAndModify: true});
                    return item;
                }
                else {
                    throw Error(`Restaurant with id ${restaurantId} does not contain Item with id ${itemId}`);
                }
            } catch (err) {
                console.error(err)
                throw Error(`Error updating Item with id ${itemId}`);
            }
        },
    }
};

export default resolvers;