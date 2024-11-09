import { Request, Response, NextFunction } from "express";
import {AnyZodObject, ZodError} from "zod";
import  logger from "../utils/logger"

const reqValidate = (schema: AnyZodObject) =>
    async (req: Request, res: Response, next:NextFunction)  => {
        try{
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next()
        } catch(e){
            logger.error(e)
            if (e instanceof ZodError){
                return res.status(400).json({message: "Validation error", error: e.issues})
            }
            return res.status(400).json({
                status: "error",
                message: "An unexpected error occurred!",
            })
        }
}

export default reqValidate