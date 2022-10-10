import { Router } from 'express';

import { auth } from '@/middleware';

import { authRoutes } from './auth';
import { userRoutes } from './user';
import { projectRoutes } from './project';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', auth, userRoutes);
routes.use('/projects', auth, projectRoutes);

export { routes };
