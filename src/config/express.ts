import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from '@middleware/errorHandler';
import v1Router from '@controller/v1';
import morgan from 'morgan';
import fs from 'fs';
import createError from 'http-errors';
import { jwtAuth } from '@middleware/jwt';
import '@config/passport';
import passport from 'passport'

const createServer = (): express.Application => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({
    origin: JSON.stringify(process.env.CLIENTS)
  }));
  app.use(express.json());
  app.disable('x-powered-by');
  if (!fs.existsSync('log')){
    fs.mkdirSync('log');
  }
  const accessLogStream = fs.createWriteStream(`log/server.log`, {
    flags: 'a',
  });
  app.use(morgan('common', { stream: accessLogStream }));
  app.use(morgan('dev'));
  app.use(passport.initialize())
  app.use(jwtAuth);

  app.use('/api/v1', v1Router);

  app.use('*', (_req: Request, _res: Response, next: NextFunction) => {
    next(createError(404, 'URL not found'));
  });
  app.use(errorHandler);
  return app;
};

export { createServer };
