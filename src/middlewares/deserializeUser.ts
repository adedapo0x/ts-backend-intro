import { get } from "lodash"
import { Request, Response, NextFunction } from "express"
import {signJWT, verifyJWT} from "../utils/jwt";
import logger from "../utils/logger";
import Session from "../models/session.model";
import User from "../models/user.models";
import config from "config";


const reIssueAccessToken = async ({refreshToken}: {refreshToken: string}) => {
    try{
        const obj = verifyJWT(refreshToken)
        if (!obj.decoded || !get(obj.decoded, "session")){
            logger.error(1)
            return false
        }

        const session = await Session.findById(get(obj.decoded, "session"))
        if (!session || !session.valid){
            logger.error(2)
            return false
        }

        const user = await User.findOne({_id: session.user}).lean()

        if (!user) {
            logger.error(3)
            return false
        }

        const accessToken = signJWT(
            {userId: user._id, session: session._id},
            {expiresIn: config.get("accessTokenTtl")}
        )
        return accessToken
    } catch (e) {
        logger.error("Error re-issuing access token", e)
    }

}

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
    const rawRefreshToken = get(req, "headers.x-refresh") // as content here may be a string or an array of strings
    const refreshToken = Array.isArray(rawRefreshToken) ? rawRefreshToken[0] : rawRefreshToken
    if (!accessToken) {
        return next()
    }
    try{
        const { decoded, expired } = verifyJWT(accessToken)
        if (decoded && !expired) {
            res.locals.user = decoded
            return next()
        }
        if (expired && refreshToken){
            const newAccessToken = await reIssueAccessToken({ refreshToken })
            logger.info(newAccessToken)
            if (!newAccessToken){
                res.status(403).json({message: "Error confirming authorization"})
            }
            else {
                res.setHeader("x-access-token", newAccessToken)

                const result = verifyJWT(newAccessToken)
                res.locals.user = result.decoded
                return next()
            }
        }
    } catch (e){
        logger.error("Error verifying JWT: ", e)
        res.status(400).json({message: "Error verifying JWT"})
    }

}