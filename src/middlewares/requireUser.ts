import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user

    if (!user){
        res.sendStatus(403)
    }
    next()
}

export default requireUser