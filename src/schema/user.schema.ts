import z, { object, string } from "zod"
import { validationSchema} from "../middlewares/req-validate";

export const createUserBodySchema = object({
    name: string({
        required_error: "Name is required"
    }).min(3, "Name must have a minimum length of 3 characters"),
    email: string({
        required_error: "Email is required"
    }).email("Please enter a valid email"),
    password: string({
        required_error: "Password is required"
    }).min(6, "Password must have a minimum length of 6 characters"),
    confirmPassword: string({
        required_error: "Password is required"
    })
    }).refine((data):boolean => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    })

export const createUserSchema: validationSchema = {
    body: createUserBodySchema
}

export type UserInputType = z.infer<typeof createUserBodySchema>
