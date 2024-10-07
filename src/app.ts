import express from "express"
import config from "config"
import connectDB from "./utils/connectDB"
import logger from "./utils/logger"
import userRouter from "./routes/user.routes"

const app =express()
const port = config.get<number>("port")

app.use(userRouter)

app.listen(port, async () => {
    await connectDB()
    logger.info(`App is running at https://localhost:${port}`)
})