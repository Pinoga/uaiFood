import {Item, Restaurant} from '../../models'

<<<<<<< HEAD
export default {
=======
//Implementação de todos os serviços relacionados ao item
export default {
    //Retorna todos os itens existentes
    //Retorno sempre válido, seja um array vazio ou um array de itens
>>>>>>> tmp
    async items() {
        try {
            return await Item.find({})
        } catch(err) {
<<<<<<< HEAD
            console.error(err)
            throw Error(`Error fetching items`);
        }
    },
=======
            console.error(err.stack || err)
            throw Error(`Erro ao buscar os itens`);
        }
    },
    //Cria novo item
    //Tenta criar um item com os dados fornecidos e, em caso de sucesso, atualiza restaurante com o novo item
>>>>>>> tmp
    async createItem (args) {
        const {item, restaurantId} = args;
        try {
            const newItem = await new Item(item).save();
            await Restaurant.findOneAndUpdate({_id: restaurantId}, {$push: {items: newItem._id}});
            return newItem;
        } catch (err) {
<<<<<<< HEAD
            console.error(err)
            throw Error(`Error creating new Item`);
        }
    },
=======
            console.error(err.stack || err)
            throw Error(`Erro ao criar novo item.`);
        }
    },
    //Atualiza item do cardápio de um restaurante
    //Busca se o restaurante com o id fornecido já existe, e em caso de sucesso, atualiza restaurante com o novo item
>>>>>>> tmp
    async updateItem (args) {
        const {itemId, restaurantId, newData} = args;
        try {
            const restaurant = await Restaurant.findOne({_id: restaurantId});
<<<<<<< HEAD
            if (!restaurant) throw Error(`Restaurant not found for id ${restaurantId}`);
=======
>>>>>>> tmp
            if (restaurant.items.includes(itemId)) {
                const item = await Item.findOneAndUpdate({_id: itemId}, {$set: newData}, {new: true, useFindAndModify: true});
                return item;
            }
            else {
                throw Error(`Restaurant with id ${restaurantId} does not contain Item with id ${itemId}`);
            }
        } catch (err) {
            console.error(err)
<<<<<<< HEAD
            throw Error(`Error updating Item with id ${itemId}`);
=======
            throw err;
>>>>>>> tmp
        }
    }    
}