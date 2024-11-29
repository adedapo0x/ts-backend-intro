import { object, string, TypeOf } from "zod"
import { validationSchema } from "../middlewares/req-validate"

export const createSessionSchema = object({
    email: string({
        required_error: "Email is required",
    }).email("Please enter a valid email"),
    password: string({
        required_error: "Password is required",
    })
})

export const sessionSchema: validationSchema = {
    body: createSessionSchema
}

export type createSessionInput = TypeOf<typeof createSessionSchema>