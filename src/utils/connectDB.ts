import mongoose from "mongoose"
import config from "config"
import logger from "./logger"

const dbUri = config.get<string>("dbUri")

export default async () => {
    try {
        await mongoose.connect(dbUri)
        logger.info("Database connected successfully")
    } catch (error) {
        logger.error("Could not connect to database")
        throw error
    }
}

