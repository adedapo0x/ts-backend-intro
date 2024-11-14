import { Request, Response } from "express";
import logger from "../utils/logger"
import User from "../models/user.models"
import { UserInputType } from "../schema/user.schema"
import { omit } from "lodash"

export const httpRegister = async (req: Request<{}, {}, UserInputType["body"]>, res: Response) => {
    try {
        const { email } = req.body
        // check if email ,already exists
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message: "Email already in use, try another!"})
        }

        const user = await User.create(req.body)
        return res.status(201).json({
            message: "User created successfully!",
            created_user: omit(user.toJSON(), "password")
        })
    } catch (e) {
        logger.error(e)
        return res.status(400).json({message: "Error encountered while creating user"})
    }
}