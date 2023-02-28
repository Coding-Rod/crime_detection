import Boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { LoginUserDTO } from "../dtos/user.dto";
const { config } = require("../config");

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