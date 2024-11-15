import mongoose, { Schema, Document } from "mongoose"
import { IUserDocument } from "./user.models"

export interface ISession extends Document {
    user: IUserDocument["_id"]
    valid: boolean
    userAgent: string
}

const sessionSchema = new Schema<ISession>({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    valid: {type: Boolean, default: true },
    userAgent: String
})

const Session = mongoose.model<ISession>("Session", sessionSchema)

export default Session

