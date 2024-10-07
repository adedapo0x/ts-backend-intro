import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"
import config from "config"
import logger from "../utils/logger"

interface IUser extends Document{
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    comparePassword(pwd: string): Promise<boolean>
}

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    let user = this as IUser 
    if (!user.isModified("password")){
        next()
    }
    try{
        const salt = await bcrypt.genSalt(config.get<number>('saltNo'))
        user.password = await bcrypt.hashSync(user.password, salt)
    } catch(e){
        logger.error("Error encountered while hashing password")
        throw e
    }
})

userSchema.methods.comparePasswords = async function(pwd: string):Promise<boolean>{
    let user = this as IUser
    try{
        return await bcrypt.compare(pwd, user.password)
    } catch(e){
        logger.error("Error occured while comparing passwords")
        return false
    }
}

const User = mongoose.model<IUser>("User", userSchema)

export default User