import User from "../models/user.models";
import {omit} from "lodash";
import logger from "../utils/logger";

export const validatePassword = async ({email, password}:{email:string, password: string}) => {
    try{
        const user = await User.findOne({ email })
        if (!user) return false

        const isValid = await user.comparePassword(password)
        if (!isValid) return false

        return omit(user.toJSON(), "password")
    } catch (e){
        logger.error("Error encountered while confirming password")
        throw e
    }
}