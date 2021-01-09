import express from 'express'
import ApiRouter from './api'

const MainRouter = express.Router()

MainRouter.use("/api", ApiRouter)

export default MainRouter