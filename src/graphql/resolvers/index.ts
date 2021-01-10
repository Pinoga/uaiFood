import { Item, Restaurant } from '../../models'

const resolvers = {
    async restaurants (root, args, context, info) {
        return await Restaurant.find({}).populate('items');
    },
    async items(root, args, context, info) {
        console.log(await Item.find({}))
        try {
            return await Item.find({})
        } catch(err) {
            throw err
        }
    },
    async createRestaurant(root, args, context, info) {
        const input = root.restaurant;
        try {
            const savedItems = []
            for (let item of input.items) {
                savedItems.push((await new Item(item).save())._id);
            }
            const newRestaurant = await new Restaurant({
                name: input.name,
                cuisineType: input.cuisineType,
                city: input.city,
                location: input.location,
                items: savedItems
            }).save();
            return newRestaurant.populate('items').execPopulate();
        } catch (err) {
            throw err;
        }
    },

    async createItem (root, args, context, info) {
        const {item, restaurantId} = root;
        try {
            const newItem = await new Item(item).save();
            await Restaurant.findOneAndUpdate({_id: restaurantId}, {$push: {items: newItem._id}});
            return newItem;
        } catch (err) {
            throw err;
        }
    },

     async updateItem (root, args, context, info) {
        const {itemId, restaurantId, newData} = root;
        try {
            (await Restaurant.find({}))
        } catch (err) {
            throw err
        }
    },
};

export default resolvers;