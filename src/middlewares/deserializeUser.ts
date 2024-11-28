import { get } from "lodash"
import { Request, Response, NextFunction } from "express"
import {verifyJWT} from "../utils/jwt";

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")

    if (!accessToken) {
        next()
    }
    const { decoded, expired } = verifyJWT(accessToken)
    if (decoded) {
        res.locals.user = decoded
        next()
    }


}