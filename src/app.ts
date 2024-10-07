import express from "express"
import config from "config"
import connectDB from "./utils/connectDB"
import logger from "./utils/logger"

const app =express()
const port = config.get<number>("port")


app.listen(port, async () => {
    await connectDB()
    logger.info(`App is running at https://localhost:${port}`)
})