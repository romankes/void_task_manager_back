import 'module-alias/register';

import mongoose from 'mongoose';
import express, { Request } from 'express';

import morgan from 'morgan';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import { CONFIG } from '@/configs';
import { logger } from '@/helpers';

import { routes } from '@/routes';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('void_task_manager'));

morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :body - :response-time ms '));
mongoose.connect('mongodb://localhost:27017/void_task_manager');

app.use(routes);

app.listen(CONFIG.PORT, () => {
  logger.log(`Example app listening at http://localhost:${CONFIG.PORT}`);
});
