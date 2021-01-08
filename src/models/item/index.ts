import {Schema} from 'mongoose'

const ItemSchema = new Schema({
    name: String,
    cuisineType: {
        type: {type: Schema.Types.ObjectId, ref: 'cuisine'}
    },
    price: {
        type: Number,
        required: true
    }
})

export default ItemSchema