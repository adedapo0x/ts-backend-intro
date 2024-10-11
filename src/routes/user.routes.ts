import express from "express"
import validate from "../middlewares/validate"
import { httpRegister } from "../controllers/user.controller"
import { createUserSchema } from "../schema/user.schema"

const router = express.Router()

router.post('/api/users', validate(createUserSchema), httpRegister)

export default router