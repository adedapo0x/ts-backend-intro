import mongoose from "mongoose"
import config from "config"

const dbUri = config.get<string>("dbUri")

export default async () => {
    try {
        await mongoose.connect(dbUri)
        console.log("Database connected successfully")
    } catch (error) {
        console.error("Could not connect to database")
        throw error
    }
}