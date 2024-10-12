import mongoose, { Schema, Document } from "mongoose"
import { IUser } from "./user.models"

export interface ISession extends Document {
    user: IUser["_id"]
    valid: boolean
    userAgent: string
    createdAt: Date
    updatedAt: Date
}

const sessionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    valid: {type: Boolean, default: true },
    userAgent: String
})

const Session = mongoose.model<ISession>("Session", sessionSchema)
export default Session

