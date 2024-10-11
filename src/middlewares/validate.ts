import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next:NextFunction):Promise<void> => {
    try{
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    } catch(e: any){
        res.status(400).json({
            status: "error",
            message: "Invalid input",
            details: e.errors
        })
    }
}
export default validate