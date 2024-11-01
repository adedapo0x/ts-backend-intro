import {validatePassword} from "../middlewares/password-validate";
import {Request, Response} from "express"
import Session from "../models/session.model";

interface InputRequestBody {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const createSession = async (userID:string, userAgent:string) => {
    const session = await Session.create({user: userID, userAgent})
    return session.toJSON()
}

export async function createUserSession(req: Request<{}, {}, InputRequestBody>, res: Response) {
    try{
        // Validates user password
        const user= await validatePassword(req.body)
        if (!user) return res.status(401).json({message: "Invalid email or password"})

        const session = createSession(user._id.toString(), req.get("user-agent") || "")


    } catch (e) {

    }

}
