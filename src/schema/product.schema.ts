import {object, string, number, TypeOf } from "zod"


const payload = object({
    title: string({
        required_error: "Title cannot be empty"
    }).min(2, "Title must be at least 2 characters long"),
    description: string({
        required_error: "Description cannot be empty"
    }).min(120, "Description must contain at least 120 characters"),
    price: number({
        required_error: "Price of product must be included",
        invalid_type_error: "Price must be a number"
    }),
    image: string({
        required_error: "Image cannot be empty and must be a string"
    })
})

const paramsPayload = object({
    _id: string({
        required_error: "Product ID is required"
    })
})

export const productSchema = {
    body: payload,
    params: paramsPayload
}

export const createProductSchema = object({ payload })
export const updateProductSchema = object({payload, paramsPayload })
export const getProductSchema = object({ paramsPayload })
export const deleteProductSchema = object({ paramsPayload })


export type createProductInput = TypeOf<typeof createProductSchema>
export type updateProductInput = TypeOf<typeof updateProductSchema>
export type getProductInput = TypeOf<typeof getProductSchema>
export type deleteProductInput = TypeOf<typeof deleteProductSchema>