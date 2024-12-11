import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "./config";

if(!JWT_USER_PASSWORD) {
    throw new Error("JWT USER Password is not defined");
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if(!header) {
        res.status(403).json({
            message: "Authorization Unsuccessful",
        })
    } else {
        const decoded = jwt.verify(header, JWT_USER_PASSWORD) as JwtPayload;

        if(decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: "Authorization Unsuccessful"
            });
        }
    }


}