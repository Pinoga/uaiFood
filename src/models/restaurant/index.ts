import { Document, Schema } from 'mongoose';
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

    email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10        
    },

    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        unique: true
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
        type: [Number],
        required: true,
    },
    items: [{type: Schema.Types.ObjectId, ref: 'item'}],
});
RestaurantSchema.index({location: '2dsphere'});
RestaurantSchema.index({cuisineType: 'text'});

export interface IRestaurant extends Document {
    email: string,
    password: string,
    name: string,
    cuisineType: string,
    city: string,
    location: [Number],
    items: [Schema.Types.ObjectId]
}


export default RestaurantSchema;