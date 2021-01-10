import {Item, Restaurant} from '../../models'

export default {
    async items() {
        try {
            return await Item.find({})
        } catch(err) {
            console.error(err)
            throw Error(`Error fetching items`);
        }
    },
    async createItem (args) {
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
    async updateItem (args) {
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
    }    
}