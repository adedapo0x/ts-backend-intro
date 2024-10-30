import {validatePassword} from "../middlewares/password-validate";

const createUserSession = async (req: Request, res: Response) => {
    try{
        // Validates user password
        const user = validatePassword(req.body)
    } catch (e) {

    }

}