import { Schema } from 'mongoose';
import Item from '../item'

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, {
    _id: false
});

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    cuisineType: {
        type: String,
        // type: Schema.Types.ObjectId,
        required: true, 
        // ref: 'Cuisine'
    },
    city: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 50
    },
    location: {
        type: pointSchema,
        required: true
    },
    items: [{type: Schema.Types.ObjectId, ref: 'item'}],
});

export default RestaurantSchema;