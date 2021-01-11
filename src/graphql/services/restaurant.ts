import {Item, Restaurant} from '../../models'

export default {
    //Retorna todos os restaurantes que passaram por todos os filtros fornecidos
    async restaurants(args) {
        console.log(args)
        const { city, distance, cuisineType, itemRelated } = args;
        const query = {};
        try {
            //Se a cidade for fornecida, restringe a busca aos restaurantes da cidade
            //TODO: implementar busca por semelhança de palavras para melhorar a usabilidade da API
            if (city) {
                query['city'] = city;
            }

            //Se a distância for fornecida, restringe a busca a todos os restaurantes em um raio 
            //ao redor das coordenadas fornecidas usando o GeoJSON do MongoDB e o index '2dsphere'
            if (distance) {
                query['location'] = {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: distance.center
                        },
                        $maxDistance: distance.radius*1000,
                        $minDistance: 0,
                    }
                };
            }

            //Se o tipo de cozinha for fornecido, restringe a busca aos restaurantes com o mesmo tipo de cozinha
            if (cuisineType) {
                query['cuisineType'] = cuisineType
            }
            
            //Se o termo de itens relacionados for fornecido, restringe a busca pelos restaurantes que possuem 
            //os itens que têm nome ou tipo de cozinha similares ao termo 
            //O tipo de cozinha e nome, na coleção itens, possuem o index $text, por isso são agregados na mesma busca
            if (itemRelated) {
                const relatedItems = await Item.find({
                    $text: {
                        $search: itemRelated,
                    }
                }, '_id');
                console.log(relatedItems);
                query['items'] = {
                    $in: relatedItems,
                };
            }

            //Popula os itens nos restaurantes, pois apenas os IDs são salvos no restaurante 
            return await Restaurant.find(query).populate('items');
        } catch (err) {
            console.error(err.stack || err)
            throw Error(`Erro ao buscar restaurantes.`);
        }        
    },

    //Cria um novo restaurante e seus subitens, se fornecidos
    async createRestaurant(restaurant) {
        try {
            
            //Se um restaurante com o mesmo nome já existe, gera um erro
            const exists = await Restaurant.find({name: restaurant.name})
            if (!exists) {
                throw Error(`Restaurante com nome ${restaurant.name} já existe.`)
            }

            //Primeiro salva os itens fornecidos, armazenando num array para posterior salvamento do restaurante
            //TODO: Implementar transaction para abortar qualquer operação caso algum erro ocorra
            const savedItems = [];
            for (let item of restaurant.items) {
                savedItems.push((await new Item(item).save())._id);
            }
            
            //Finalmente salva o restaurante com o array de itens
            const newRestaurant = await new Restaurant({
                name: restaurant.name,
                cuisineType: restaurant.cuisineType,
                city: restaurant.city,
                location: restaurant.location,
                items: savedItems
            }).save()

            if (!newRestaurant) {
                throw Error(`Erro ao criar restaurante.`)
            }
            return newRestaurant.populate('items').execPopulate();
        } catch (err) {
            console.error(err.stack || err)
            throw err;
        }
    }
}