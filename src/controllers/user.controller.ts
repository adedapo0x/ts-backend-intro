import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger"
import User from "../models/user.models"
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash"


export const httpRegister = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email } = req.body
        // check if email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser){
            res.status(400).json({message: "Email already in use, try another!"})
        }       

        const user = await User.create(req.body)
        res.status(201).json({
            message: "User created successfully!",
            created_user: omit(user.toJSON(), "password")
        })
    } catch (e) {
        logger.error(e)
        next(e)
    }
}

