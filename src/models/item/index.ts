import {Document, Schema} from 'mongoose';

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cuisineType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});
ItemSchema.index({cuisineType: 'text'})
ItemSchema.index({name: 'text'})

export interface IItem extends Document {
    name: string,
    cuisineType: string,
    price: Number
}


export default ItemSchema;