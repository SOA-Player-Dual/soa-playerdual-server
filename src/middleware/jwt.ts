import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { verifyAccessToken } from '@helper/jwt';
import { pathToRegexp } from 'path-to-regexp';

const API = '/api/v1';
const exclusive = {
  GET: ['/user', '/auth/google', '/auth/google/callback', '/favicon.ico', '/game', '/game/:id'],
  POST: ['/auth/login', '/auth/register', '/auth/refresh'],
  PUT: [],
  DELETE: [],
};

const whitelist = {
  GET: exclusive.GET.map(path => pathToRegexp(path)),
  POST: exclusive.POST.map(path => pathToRegexp(path)),
  PUT: exclusive.PUT.map(path => pathToRegexp(path)),
  DELETE: exclusive.DELETE.map(path => pathToRegexp(path))
}

export const jwtAuth = (_req: Request, res: Response, next: NextFunction) => {
  const PATH = _req.path.replace(API, '');
  const METHOD = _req.method;
  if (whitelist[METHOD].filter(regex => regex.test(PATH)).length !== 0) return next();
  const accessToken = _req.headers?.authorization?.split(' ')[1];
  if (!accessToken) return next(new createError.Unauthorized('Missing token'));
  const id = verifyAccessToken(accessToken);
  if (!id) return next(new createError.Unauthorized('Token invalid'));
  res.locals.id = id;
  return next();
};
