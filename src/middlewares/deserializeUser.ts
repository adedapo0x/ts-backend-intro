import { get } from "lodash"
import { Request, Response, NextFunction } from "express"
import {verifyJWT} from "../utils/jwt";
import logger from "../utils/logger";

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")

    if (!accessToken) {
        next()
    }
    try{
        const { decoded, expired } = verifyJWT(accessToken)
        if (decoded) {
            res.locals.user = decoded
        }
        next()
    } catch (e){
        logger.error("Error verifying JWT: ", e)
        res.status(400).json({message: "Error verifying JWT"})
    }

}