import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import requestRouter from './controllers/request.controller';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/requests', requestRouter);

app.use(errorMiddleware);

export default app;
