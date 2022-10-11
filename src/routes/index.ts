import { Router } from 'express';

import { auth } from '@/middleware';

import { authRoutes } from './auth';
import { userRoutes } from './user';
import { projectRoutes } from './project';
import { taskRoutes } from './task';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', auth, userRoutes);
routes.use('/projects', auth, projectRoutes);
routes.use('/tasks', auth, taskRoutes);

export { routes };
