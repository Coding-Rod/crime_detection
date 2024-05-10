import { Request, Response, NextFunction } from 'express';
import { Boom } from '@hapi/boom';

const logErrors = (err: Error, req: Request, res: Response , next: NextFunction) => {
    console.log(err);
    next(err);
}

const errorHandler = (err: Error, req: Request, res: Response , next: NextFunction) => {
    res.status(500).send({ error: err.message });
    next(err);
}

const boomErrorHandler = (err: Error | Boom<any>, req: Request, res: Response , next: NextFunction) => {
    if (err instanceof Boom) {
        const { output: { statusCode, payload } } = err;
        res.status(statusCode).json(payload);
    } else {
        next(err);
    }
}

export { logErrors, errorHandler, boomErrorHandler };