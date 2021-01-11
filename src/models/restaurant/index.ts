import { Document, Schema } from 'mongoose';

//Schema do modelo do Restaurante no MongoDB
//Apenas os IDs dos itens são salvos nos documentos, não os objetos
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
        required: true,
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


//O tipo de cozinha é indexado para a busca por similaridade
RestaurantSchema.index({cuisineType: 'text'});

//As coordenadas são indexadas para a busca por localização funcionar
RestaurantSchema.index({location: '2dsphere'});

export interface IRestaurant extends Document {
    name: string,
    cuisineType: string,
    city: string,
    location: [Number],
    items: [Schema.Types.ObjectId]
}


export default RestaurantSchema;