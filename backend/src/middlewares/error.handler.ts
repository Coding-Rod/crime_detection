import { Request, Response, NextFunction } from 'express';

const logErrors = (err: Error, req: Request, res: Response , next: NextFunction) => {
    console.log(err);
    next(err);
}

const errorHandler = (err: Error, req: Request, res: Response , next: NextFunction) => {
    res.status(500).send({ error: err.message });
    next(err);
}

export { logErrors, errorHandler };