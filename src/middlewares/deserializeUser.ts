import { get } from "lodash"
import { Request, Response, NextFunction } from "express"
import {signJWT, verifyJWT} from "../utils/jwt";
import logger from "../utils/logger";
import Session from "../models/session.model";
import User from "../models/user.models";
import config from "config";


const reIssueAccessToken = async ({refreshToken}: {refreshToken: string}) => {
    const decoded = verifyJWT(refreshToken)
    if (!decoded || !get(decoded, "session")) return false

    const session = await Session.findById(get(decoded, "session"))
    if (!session || !session.valid) return false

    const user = await User.findOne({_id: session.user}).lean()

    if (!user) return false

    const accessToken = signJWT(
        {userId: user._id, session: session._id},
        {expiresIn: config.get("accessTokenTtl")}
    )
    return accessToken
}

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
    const rawRefreshToken = get(req, "headers.x-refresh")
    const refreshToken = Array.isArray(rawRefreshToken) ? rawRefreshToken[0] : rawRefreshToken
    if (!accessToken) {
        next()
    }
    try{
        const { decoded, expired } = verifyJWT(accessToken)
        if (decoded && !expired) {
            res.locals.user = decoded
            next()
        }
        if (expired && refreshToken){
            const newAccessToken = await reIssueAccessToken({ refreshToken })
            if (!newAccessToken){
                res.status(403).json({message: "Error confirming authorization"})
            }
            else {
                res.setHeader("x-access-token", newAccessToken)

                const result = verifyJWT(newAccessToken)
                res.locals.user = result.decoded
                next()
            }
            next()
        }
    } catch (e){
        logger.error("Error verifying JWT: ", e)
        res.status(400).json({message: "Error verifying JWT"})
    }

}