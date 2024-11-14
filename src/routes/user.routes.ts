import express from "express"
import reqValidate from "../middlewares/req-validate"
import { httpRegister } from "../controllers/user.controller"
import { createUserSchema } from "../schema/user.schema"
import {createSessionSchema} from "../schema/session.schema";
import {createUserSession} from "../controllers/session.controller";

const router = express.Router()

router.post('/api/users', reqValidate(createUserSchema), httpRegister)
router.post("/api/session", reqValidate(createSessionSchema), createUserSession)

export default router

