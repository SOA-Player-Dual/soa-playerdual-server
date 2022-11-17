import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import 'dotenv/config';

const errorHandler = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(error);
    }
    return res.status(error.statusCode).json({ error: error.message });
  } catch (_err) {
    return res.status(500).json({ error: 'Unexpected error from server' });
  }
};

export default errorHandler;
