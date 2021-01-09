import restaurantController from './../../../controllers/restaurant';
import express from 'express'

const RestaurantRouter = express.Router()

RestaurantRouter.route("/register")
    .post(restaurantController.register)

RestaurantRouter.route("/list")
    .get(restaurantController.list)

export default RestaurantRouter