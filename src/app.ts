import express from "express"
import config from "config"
import connectDB from "./utils/connectDB"

const app =express()
const port = config.get<number>("port")


app.listen(port, async () => {
    await connectDB()
    console.log("App is running!!")
})