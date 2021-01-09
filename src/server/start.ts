import express from 'express'
import MainRouter from '../routes'

export default function startServer() {
    const app = express()

    app.use("/", MainRouter)

    app.listen(process.env.PORT, () => {
        console.log("App is listening on port %d", process.env.PORT)
    })
}