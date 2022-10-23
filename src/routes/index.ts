import { Router } from 'express';

import { auth } from '@/middleware';

import { authRoutes } from './auth';
import { userRoutes } from './user';
import { projectRoutes } from './project';
import { taskRoutes } from './task';
import { assetRoutes } from './asset';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', auth, userRoutes);
routes.use('/projects', auth, projectRoutes);
routes.use('/tasks', auth, taskRoutes);
routes.use('/uploads', auth, assetRoutes);

routes.use((e) => {
  console.log(e);
});

export { routes };
