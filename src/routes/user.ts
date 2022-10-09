import { Router } from 'express';

// import {validate} from '@/helpers';

import { UserController } from '@/controllers';
import { UserServices } from '@/services';

const controller = new UserController(new UserServices(), 'user');

const userRoutes = Router();

userRoutes.get('/current', controller.current);

export { userRoutes };
