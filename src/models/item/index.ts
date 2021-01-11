import {Document, Schema} from 'mongoose';

//Schema do modelo do Item no MongoDB
//Todos os campos obrigatórios
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


//Tanto o tipo de cozinha quando o nome do item são indexados para buscar itens relacionados
ItemSchema.index({cuisineType: 'text'})
ItemSchema.index({name: 'text'})

export interface IItem extends Document {
    name: string,
    cuisineType: string,
    price: Number
}


export default ItemSchema;