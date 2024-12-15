import { Request, Response } from "express"
import {createProductInput, deleteProductInput, getProductInput, updateProductInput} from "../schema/product.schema";
import Product from "../models/products.model";
import logger from "../utils/logger";

export const createProduct = async (req: Request<{},{},createProductInput>, res: Response) => {
    try{
        const userID = res.locals.user._id
        const body = req.body

        const product = await Product.create({...body, user: userID })
        res.json({product})
    } catch (e) {
        logger.error("Error creating product", e)
    }
}

export const getProduct = async (req: Request<getProductInput["paramsPayload"]>, res: Response) => {
    try{
        const productId = req.params._id
        const product = await Product.findById(productId)
        if (!product) {
            res.status(404).json({message: "Product Not Found"})
        } else {
            res.json({product})
        }
    } catch (e) {
        logger.error("Error while fetching product: ", e)
    }
}

export const updateProduct = async (req: Request<updateProductInput["paramsPayload"], {}, updateProductInput["payload"]>, res: Response) => {
    try{
        const userID = res.locals.user._id
        const productID = req.params._id

        const update = req.body
        const product = await Product.findById(productID)
        if (!product){
            res.status(404).json({message: "Product not found"})
        } else if (product.user != userID) {
            res.status(403).json({message: "Unauthorized access"})
        } else {
            const updatedProduct = await Product.findByIdAndUpdate(productID, product, {new: true})
            res.json({updatedProduct})
        }
    } catch (e) {
        logger.error("Error updating product", e)
    }
}

export const deleteProduct = async (req: Request<deleteProductInput["paramsPayload"]>, res: Response) => {
    try{
        const userID = res.locals.user._id
        const productID = req.params._id

        const product = await Product.findById(productID)
        if (!product){
            res.status(404).json({message: "Product not found"})
        } else if (product.user != userID) {
            res.status(403).json({message: "Unauthorized access"})
        } else {
            await Product.deleteOne({_id: productID})
        }
    } catch (e) {
        logger.error("Error deleting product", e)
    }
}