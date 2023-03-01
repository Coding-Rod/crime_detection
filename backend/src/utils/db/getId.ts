import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { config } from "../../config";
import { client } from "../../db/config";

const getId = async (token: string) => {
    const payload: JwtPayload = jwt.verify(token?.split(" ")[1] as string, config.jwtSecret as string) as JwtPayload;
    if (!payload) throw Boom.unauthorized("Invalid token");

    return payload.id;
}

export { getId };