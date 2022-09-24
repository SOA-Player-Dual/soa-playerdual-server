import {Request, Response, NextFunction} from 'express';

const errorHandler = (_req: Request, res: Response, next: NextFunction, error: Error) => {
    if (res.headersSent) return next(error);

    res.status(500).send(error.message);
}

export default errorHandler;