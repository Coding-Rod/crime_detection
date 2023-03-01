import Boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { LoginUserDTO } from "../dtos/user.dto";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

const { config } = require("../config");
const { client } = require("../db/config");
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

const validateTokenAndId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { id } = req.params;
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw Boom.unauthorized("Invalid token");
    
        const user = await client.query("SELECT * FROM users WHERE iduser = $1", [id]);
        if (!user.rows[0]) throw Boom.notFound("User not found");
        
        const payload: JwtPayload = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload;
        if (!payload) throw Boom.unauthorized("Invalid token");
        if (payload.id !== user.rows[0].iduser) throw Boom.unauthorized("Invalid token");
        req.user = user.rows[0];
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export { checkApiKey, validateTokenAndId };