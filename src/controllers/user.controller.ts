import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger"
import User from "../models/user.models"
import { CreateUserInput } from "../schema/user.schema";

export const httpRegister = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response): Promise<void> => {
    try {
        const { email } = req.body
        // check if email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser){
            res.status(400).json({message: "Email already in use, try another!"})
        }       

        const user = await User.create(req.body)
        res.send(user)
    } catch (e: any) {
        logger.error(e)
        res.status(409).send(e.message) 
    }
}