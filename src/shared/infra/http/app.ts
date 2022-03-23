import 'reflect-metadata';
import 'dotenv/config';
import upload from '@config/upload';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import AppError from '@shared/errors/AppError';

import swaggerFile from '../../../swagger.json';
import createConnection from '../typeorm';
import rateLimiter from './middlewares/RateLimiter';
import { router } from './routes';

import '@shared/container';

createConnection();

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error ${err.message}`,
    });
  }
);

export { app };
