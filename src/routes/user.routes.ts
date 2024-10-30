import express from "express"
import reqValidate from "../middlewares/req-validate"
import { httpRegister } from "../controllers/user.controller"
import { createUserSchema } from "../schema/user.schema"

const router = express.Router()

router.post('/api/users', reqValidate(createUserSchema), httpRegister)

export default router