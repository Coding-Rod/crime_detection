import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { User } from "../../models/user.model";

import { config } from "../../config";

const getId = async (token: string) : Promise<User["id"]> => {
    const payload: JwtPayload = jwt.verify(token?.split(" ")[1] as string, config.jwtSecret as string) as JwtPayload;
    if (!payload) throw Boom.unauthorized("Invalid token");

    return payload.id;
}

export { getId };