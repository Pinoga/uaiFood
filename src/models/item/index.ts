import {Schema} from 'mongoose'

const ItemSchema = new Schema({
    name: String,
    cuisineType: {type: Schema.Types.ObjectId, ref: 'Cuisine'},
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
    price: Number
})

export default ItemSchema