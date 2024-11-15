import { Request, Response, NextFunction } from "express";
import z, { ZodError } from "zod";
import  logger from "../utils/logger"

export interface validationSchema  {
    body?: z.ZodType<any>
    query?: z.ZodType<any>
    params?: z.ZodType<any>
}

const reqValidate = function (schema: validationSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.body) {
                req.body = await schema.body.parseAsync(req.body) 
            }
            if (schema.query) {
                req.query = await schema.query.parseAsync(req.query)
            }
            if (schema.params) {
                req.params = await schema.params.parseAsync(req.params)
            }
            next()
        } catch (e) {
            logger.error(e)
            if (e instanceof ZodError) {
                res.status(400).json({message: "Validation error", error: e.issues})
            }
            res.status(400).json({
                status: "error",
                message: "An unexpected error occurred!",
            })
        }
    }
}


export default reqValidate