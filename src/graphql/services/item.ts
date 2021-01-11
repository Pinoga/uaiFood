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
            const newItem = await new Item(item).save();
            await Restaurant.findOneAndUpdate({_id: restaurantId}, {$push: {items: newItem._id}}, {useFindAndModify: true});
            return newItem;
        } catch (err) {
            console.error(err.stack || err)
            throw Error(`Erro ao criar novo item.`);
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
                throw Error(`Restaurant with id ${restaurantId} does not contain Item with id ${itemId}`);
            }
        } catch (err) {
            console.error(err)
            throw err;
        }
    }    
}