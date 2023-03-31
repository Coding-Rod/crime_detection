import { badRequest } from "@hapi/boom";
import { Request, Response, NextFunction } from 'express';

export const validatorHandler = (schema: object, property: string) => {
    return (req: Request, res: Response, next: NextFunction) => {

        if ('validate' in schema && typeof schema.validate === 'function') {
            const { error } = schema.validate(req[property as keyof Request], { abortEarly: false });
            const valid = error == null;
            
            if (valid) {
                next();
            } else {
                const { details } = error;
                const message = (details as any[]).map(i => i.message).join(',');
                
                next(badRequest(message));
            }
        } else {
            next(badRequest('Schema is not valid, it must have a validate function'));
        }
    };
};

export default validatorHandler;
