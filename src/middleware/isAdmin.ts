import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

const isAdmin = (_req: Request, res: Response, next: NextFunction) => {
  return res.locals.role === 'admin'
    ? next()
    : next(createError(403, "You don't have permission to do this"));
};

export default isAdmin;
