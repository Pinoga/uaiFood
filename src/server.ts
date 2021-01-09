import { Restaurant, Cuisine, Item } from './models';
import express from 'express'
import dbconnect from './db'
// import startServer from './server/start';

function startServer() {
    const app = express()

    app.use("/", (req, res) => res.json({msg: "bla"}))

    app.listen(process.env.PORT, () => {
        console.log("App is listening on port %d", process.env.PORT)
    })
}

startServer()
dbconnect()

async function createCuisine() {
    const cuisine = new Cuisine({
        name: "Brasileira" 
    })
    try {
        const res = await cuisine.save()
        console.log("Resposta do save: ", res)
    } catch (err) {
        console.error("Failed to save Cuisine document")
        console.error(err)
    }
    
    // await Cuisine.findOne({_id: cuisine._id})
    // .exec((err, cuisine) => {
    //     if (err) {
    //         console.error("Failed to find Cuisine document by id: %s", cuisine._id)
    //     }
    //     console.log(JSON.stringify(cuisine))
    // })
}

createCuisine()