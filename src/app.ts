import express from "express"
import config from "config"
import connectDB from "./utils/connectDB"
import logger from "./utils/logger"
import userRouter from "./routes/user.routes"
import { Request, Response, NextFunction } from "express"

const app =express()
const port = config.get<number>("port") || 1337

app.use(userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack)
    res.status(500).json({
        status: "error",
        message: "An unexpected error occured"
    })

})

app.listen(port, async () => {
    await connectDB()
    logger.info(`App is running at https://localhost:${port}`)
})