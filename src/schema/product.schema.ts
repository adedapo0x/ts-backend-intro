import {object, string, TypeOf } from "zod"


const payload = object({
    title: string({
        required_error: "Title must be a string"
    }).min(2, "Title must be at least 2 characters long"),
    description: string({
        required_error: "Description must be a string"
    }).min(120, "Description must contain at least 120 characters")
})