import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from '@middleware/errorHandler';
import v1Router from '@controller/v1';
import morgan from 'morgan';
import fs from 'fs';

const createServer = (): express.Application => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use(express.json());
  app.disable('x-powered-by');

  const accessLogStream = fs.createWriteStream(`log/${Date.now()}.log`, {flags: 'a'});
  app.use(morgan('common', {stream: accessLogStream}));
  app.use(morgan('dev'));


  app.use(errorHandler);

  app.use('/api/v1', v1Router);

  app.use('/', (_req: Request, res: Response) => {
    return res.json({ msg: 'Welcome to player dual API endpoint' });
  });
  app.use('*', (_req: Request, res: Response) => {
    res.status(404).json({ msg: 'API not found' });
  });
  return app;
};

export { createServer };
