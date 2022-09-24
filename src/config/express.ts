import express from 'express';
import cors from 'cors';
import errorHandler from '@middleware/errorHandler';


const createServer = (): express.Application => {
    const app = express();

    app.use(express.urlencoded({extended: true}));
    app.use(cors());
    app.use(express.json());

    // app.use('/', indexRouter);

    // @ts-ignore
    app.use(errorHandler);

    return app;
};

export { createServer };