import { Router } from 'express';

// import {validate} from '@/helpers';

import { AuthController } from '@/controllers';
import { AuthService } from '@/services';

// import {authSchemas} from '@/validations';
const controller = new AuthController(new AuthService());

const authRoutes = Router();

authRoutes.post('/signIn', controller.signIn);
authRoutes.post('/signUp', controller.signUp);
authRoutes.delete('/logout', controller.logout);

export { authRoutes };
