import jwt from "jsonwebtoken"
import { privateKey, publicKey} from "../../config/key"
import logger from "./logger"

export const signJWT = (payload: object, options?: jwt.SignOptions | undefined) => {
   try{
       return jwt.sign(payload,
           privateKey,
           { ...(options && options), algorithm: "RS256"})
   } catch (e) {
       logger.error("Failed to create JWT: ", e)
   }
}


export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] })
        return {
            decoded,
            valid: true,
            expired: false
        }
    } catch (e) {
        return {
            valid: false,
            expired: true,
            decoded: null
        }
    }
}