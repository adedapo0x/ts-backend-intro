import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"
import config from "config"
import logger from "../utils/logger"

export interface IUser{
    name: string
    email: string
    password: string
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date
    updatedAt: Date
    comparePassword(pwd: string): Promise<boolean>
}

const userSchema = new Schema<IUserDocument>({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    const user = this as IUserDocument
    if (!user.isModified("password")){
        next()
    }
    try{
        const salt = await bcrypt.genSalt(config.get<number>('saltNo'))
        user.password = await bcrypt.hash(user.password, salt)
    } catch(e){
        logger.error("Error encountered while hashing password")
        throw e
    }
})

userSchema.methods.comparePassword = async function(pwd: string):Promise<boolean>{
    const user = this as IUser
    try{
        return await bcrypt.compare(pwd, user.password)
    } catch(e){
        logger.error("Error occurred while comparing passwords")
        return false
    }
}

const User = mongoose.model<IUserDocument>("User", userSchema)

export default User