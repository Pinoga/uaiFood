import express from 'express'
import itemController from '../../../controllers/item'

const ItemRouter = express.Router()

ItemRouter.route("/register")
    .post(itemController.register)

ItemRouter.route("/update")
    .put(itemController.update)

export default ItemRouter