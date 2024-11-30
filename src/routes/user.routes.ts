import express from "express"
import reqValidate from "../middlewares/req-validate"
import { httpRegister } from "../controllers/user.controller"
import { createUserSchema } from "../schema/user.schema"
import {sessionSchema} from "../schema/session.schema";
import {createUserSession, deleteSession, getUserSessions} from "../controllers/session.controller";
import requireUser from "../middlewares/requireUser";

const router = express.Router()

router.post('/api/users', reqValidate(createUserSchema), httpRegister)
router.post("/api/sessions", reqValidate(sessionSchema), createUserSession)
router.get("/api/sessions", requireUser, getUserSessions)
router.delete("/api/sessions", requireUser, deleteSession)
export default router

