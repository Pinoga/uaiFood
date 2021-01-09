import express from 'express'
import RestaurantRouter from './restaurant'

const ApiRouter = express.Router()

ApiRouter.use("/restaurant", RestaurantRouter)

export default ApiRouter