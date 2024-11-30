import express from "express"
import reqValidate from "../middlewares/req-validate"
import { httpRegister } from "../controllers/user.controller"
import { createUserSchema } from "../schema/user.schema"
import {sessionSchema} from "../schema/session.schema";
import {createUserSession, getUserSessions} from "../controllers/session.controller";
import requireUser from "../middlewares/requireUser";

const router = express.Router()

router.post('/api/users', reqValidate(createUserSchema), httpRegister)
router.post("/api/sessions", reqValidate(sessionSchema), createUserSession)
router.get("/api/sessions", requireUser, getUserSessions)

export default router

