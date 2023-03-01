import Boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { LoginUserDTO } from "../dtos/user.dto";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { config } from "../config";
import { client } from "../db/config";
interface RequestWithUser extends Request {
    user: LoginUserDTO;
}

const checkApiKey = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const apiKey = req.query.apiKey || "";
    
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(Boom.unauthorized("Invalid API Key"));
    }
};

export { checkApiKey };