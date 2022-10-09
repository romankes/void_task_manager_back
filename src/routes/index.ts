import { Router } from 'express';

import { auth } from '@/middleware';

import { authRoutes } from './auth';
import { userRoutes } from './user';

const routes = Router();

routes.use('/users', auth, userRoutes);
routes.use('/auth', authRoutes);

export { routes };
