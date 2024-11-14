import {validatePassword} from "../middlewares/password-validate";
import {Request, Response } from "express"
import Session from "../models/session.model";
import {signJWT} from "../utils/jwt";
import config from "config"
import logger from "../utils/logger"
import { createSessionInput } from "../schema/session.schema"

export const createSession = async (userID:string, userAgent:string) => {
    const session = await Session.create({user: userID, userAgent})
    return session.toJSON()
}

export const createUserSession = async (req: Request, res: Response) => {
    try {
        // Validates user password
        const user = await validatePassword(req.body)
        if (!user) return res.status(401).json({message: "Invalid email or password"})

        // create session
        const session = await createSession(user._id.toString(), req.get("user-agent") || "")

        // create access token
        const accessToken = signJWT({...user, session: session._id}, {expiresIn: config.get("accessTokenTtl")})

        // create refresh Token
        const refreshToken = signJWT({...user, session: session._id}, {expiresIn: config.get("refreshTokenTtl")})
        return res.json({accessToken, refreshToken})

    } catch (e) {
        logger.error("Error creating user session")
        return res.status(400).json({message: "Error encountered!"})
    }
}