import express from "express"
import dotenv from "dotenv"
import config from "config"
import connectDB from "./utils/connectDB"
import logger from "./utils/logger"
import userRouter from "./routes/user.routes"
import { Request, Response, NextFunction } from "express"

import { privateKey, publicKey } from "../config/key"
import {deserializeUser} from "./middlewares/deserializeUser";
dotenv.config()

const app = express()
const port = config.get<number>("port") || 1337

app.use(express.json())

app.use(deserializeUser)
app.use(userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    res.status(500).json({
        status: "error",
        message: "An unexpected error occurred"
    })
})

app.listen(port, async () => {
    await connectDB()
    logger.info(`App is running at https://localhost:${port}`)
})