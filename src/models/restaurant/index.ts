import { Schema } from 'mongoose';


const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    cuisineType: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Cuisine'
    },
    location: {
        type: [String],
        required: true
    },
    items: {
        type: [{type: Schema.Types.ObjectId, ref: 'item'}],
    }
})

export default RestaurantSchema