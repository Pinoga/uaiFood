import { Schema } from 'mongoose';


const RestaurantSchema = new Schema({
    name: String,
    cuisineType: {type: Schema.Types.ObjectId, ref: 'Cuisine'},
    location: [String],
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
})

export default RestaurantSchema