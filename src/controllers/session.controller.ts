import { validatePassword } from "../middlewares/password-validate"
import { Request, Response } from "express"
import Session from "../models/session.model"
import { signJWT } from "../utils/jwt"
import config from "config"
import logger from "../utils/logger"
import { createSessionInput } from "../schema/session.schema"

export const createSession = async (userID:string, userAgent:string) => {
    try{
        const session = await Session.create({user: userID, userAgent})
        return session.toJSON()
    } catch (e){
        logger.error("Error encountered while creating session")
    }
}

export const createUserSession = async (req: Request<{}, {}, createSessionInput>, res: Response) => {
    try {
        // Validates user password
        const user = await validatePassword(req.body)
        if (!user) {
            res.status(401).json({message: "Invalid email or password"})
        }
        else {
            // create session
            const session = await createSession(user._id.toString(), req.get("user-agent") || "")

            if (!session){
                res.status(400).json({message: "Session not created"})
            } else {
                // create access token
                const accessToken = signJWT({userId: user._id, session: session._id}, {expiresIn: config.get("accessTokenTtl")})

                // create refresh Token
                const refreshToken = signJWT({userId: user._id, session: session._id}, {expiresIn: config.get("refreshTokenTtl")})
                res.json({accessToken, refreshToken})
            }
        }

    } catch (e) {
        logger.error("Error creating user session: ", e)
        res.status(400).json({message: "Error encountered!"})
    }
}

export const getUserSessions = async (req: Request, res: Response) => {
    try {
        const userID = res.locals.user.userId

        const sessions = await Session.find({user: userID, valid: true})

        res.json({sessions})
    } catch (e) {
        logger.error("Error getting user sessions: ", e)
        res.status(400).json({message: "Error getting user sessions!"})
    }


}

export const deleteSession = async (req: Request, res: Response) => {
    try{
        const session = res.locals.user.session

        await Session.updateOne({_id: session}, {valid: false})

        res.send({
            accessToken: null,
            refreshToken: null
        })
    } catch (e) {
        logger.error("Error logging out: ", e)
        res.status(400).json({message: "Error while logging out!"})
    }

}