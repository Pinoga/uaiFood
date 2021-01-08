import { Restaurant, Cuisine, Item } from './models/index';
import dbconnect from './db'

dbconnect()

const cuisine = new Cuisine({
    name: "Brasileira" 
})

cuisine.save((err) => {
    if (err) {
        console.error("Failed to save Cuisine document")
        return 
    }
})

Cuisine.findOne({_id: cuisine._id})
    .exec((err, cuisine) => {
        if (err) {
            console.error("Failed to find Cuisine document by id: %s", cuisine._id)
        }
        console.log(JSON.stringify(cuisine))
    })
