import {Item, Restaurant} from '../../models'

export default {
    async restaurants(args) {
        console.log(args)
        const { city, distance, cuisineType, itemRelated } = args;
        const query = {};
        try {
            if (city) {
                query['city'] = city;
            }

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

            if (cuisineType) {
                query['$text'] = {
                    $search: cuisineType,
                    $language: "pt",
                    $caseSensitive: false,
                    $diacriticSensitive: false,
                };
            }

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
            return await Restaurant.find(query).populate('items');
        } catch (err) {
            console.error(err)
            throw Error(`Erro ao buscar restaurantes.`);
        }        
    },
    async createRestaurant(restaurant) {
        try {
            const exists = await Restaurant.find({name: restaurant.name})
            if (exists) {
                throw Error(`Restaurante com nome ${restaurant.name} já existe.`)
            }

            const savedItems = [];
            for (let item of restaurant.items) {
                savedItems.push((await new Item(item).save())._id);
            }
            
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
            console.error(err)
            throw err;
        }
    }
}