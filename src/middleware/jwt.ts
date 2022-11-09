import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { verifyAccessToken } from '@helper/jwt';

const API = '/api/v1';
const exclusive = {
  GET: ['/user', '/auth/google', '/auth/google/callback', '/favicon.ico'],
  POST: ['/auth/login', '/auth/register', '/auth/refresh'],
  PUT: [],
  DELETE: [],
};

export const jwtAuth = (_req: Request, res: Response, next: NextFunction) => {
  const PATH = _req.path.replace(API, '');
  const METHOD = _req.method;
  if (exclusive[METHOD].includes(PATH)) return next();
  const accessToken = _req.headers.authorization.split(' ')[1];
  if (!accessToken) return next(new createError.Unauthorized('Missing token'));
  const id = verifyAccessToken(accessToken);
  if (!id) return next(new createError.Unauthorized('Token invalid'));
  res.locals.id = id;
  return next();
};
