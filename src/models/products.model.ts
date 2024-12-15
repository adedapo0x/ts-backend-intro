import mongoose, {Document, Schema, model} from 'mongoose'
import {IUserDocument} from "./user.models";

interface IProduct extends Document {
    user: IUserDocument["_id"]
    title: string
    description: string
    price: number
    image: string
}

const productSchema = new Schema<IProduct>({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
}, {
    timestamps: true
})

const Product = model<IProduct>("Product", productSchema)

export default Product