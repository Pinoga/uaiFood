import { IItem } from './../../models/item/index';
import {Item, Restaurant} from '../../models'

//Implementação de todos os serviços relacionados ao item
export default {
    //Retorna todos os itens existentes
    //Retorno sempre válido, seja um array vazio ou um array de itens
    async items() {
        try {
            return await Item.find({})
        } catch(err) {
            console.error(err.stack || err)
            throw Error(`Erro ao buscar os itens`);
        }
    },
    //Cria novo item
    //Tenta criar um item com os dados fornecidos e, em caso de sucesso, atualiza restaurante com o novo item
    async createItem (args) {
        const {item, restaurantId} = args;
        try {
        
            //Se um item com o mesmo nome já existe, gera um erro
            const restaurant = await Restaurant.findOne({_id: restaurantId})
            if (!restaurant) {
                throw Error(`Restaurante com id ${restaurantId} não existe`)
            }
        
            //Se o restaurante já possui um item com aquele nome, gera um erro
            const populatedRestaurant = await restaurant.populate('items').execPopulate()
            if (populatedRestaurant.items.map(i => (<unknown>i as IItem).name).includes(item.name)) {
                throw Error(`Restaurante já possui item com o nome ${item.name}`)
            }

            const newItem = await new Item(item).save();
            if (!new Item) {
                throw Error(`Erro ao criar novo item`)
            }

            const newRestaurant = await Restaurant.findOneAndUpdate({_id: restaurantId}, {$push: {items: newItem._id}}, {useFindAndModify: true, new: true});
            if (!newRestaurant) {
                throw Error(`Erro ao adicionar item ao restaurante`)
            }

            return newItem;
        } catch (err) {
            console.error(err.stack || err)
            throw err;
        }
    },
    //Atualiza item do cardápio de um restaurante
    //Busca se o restaurante com o id fornecido já existe, e em caso de sucesso, atualiza restaurante com o novo item
    async updateItem (args) {
        const {itemId, restaurantId, newData} = args;
        try {
            const restaurant = await Restaurant.findOne({_id: restaurantId});
            if (restaurant.items.includes(itemId)) {
                const item = await Item.findOneAndUpdate({_id: itemId}, {$set: newData}, {new: true, useFindAndModify: true});
                return item;
            }
            else {
                throw Error(`Restaurante com id ${restaurantId} não contém item com id ${itemId}`);
            }
        } catch (err) {
            console.error(err)
            throw err;
        }
    }    
}
