import Boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";

const { config } = require("../config");

interface RequestWithUser extends Request {
    user: any;
}

const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.query.apiKey || "";
    
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(Boom.unauthorized("Invalid API Key"));
    }
};

export { checkApiKey };