import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { verifyAccessToken } from '@helper/jwt';
import { pathToRegexp } from 'path-to-regexp';

const API = '/api/v1';
const exclusive = {
  GET: [
    '/auth/google',
    '/auth/google/callback',
    '/favicon.ico',
    '/game',
    '/game/:id',
    '/auth/refresh',
    '/player',
    '/player/:id/rating',
    '/player/:id/follower',
    '/player/:id/donate',
    '/search',
    '/user/id/:id',
    '/user/:urlCode',
  ],
  POST: [
    '/auth/login',
    '/auth/register',
    '/auth/recover',
    '/auth/recover/verification',
  ],
  PUT: [],
  DELETE: [],
};
const special = ['/user/following', '/user/transaction'];

const whitelist = {
  GET: exclusive.GET.map((path) => pathToRegexp(path)),
  POST: exclusive.POST.map((path) => pathToRegexp(path)),
  PUT: exclusive.PUT.map((path) => pathToRegexp(path)),
  DELETE: exclusive.DELETE.map((path) => pathToRegexp(path)),
};

export const jwtAuth = (_req: Request, res: Response, next: NextFunction) => {
  const PATH = _req.path.replace(API, '');
  const METHOD = _req.method;
  const accessToken = _req.headers?.authorization?.split(' ')[1];
  if (!special.includes(PATH)) {
    if (whitelist[METHOD].filter((regex) => regex.test(PATH)).length !== 0)
      return next();
  }
  if (!accessToken) return next(new createError.Unauthorized('Missing token'));
  const { id, role } = verifyAccessToken(accessToken);
  if (!id) return next(new createError.Unauthorized('Token invalid'));
  res.locals.id = id;
  res.locals.role = role;
  return next();
};
