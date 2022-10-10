import { Router } from 'express';

// import {validate} from '@/helpers';

import { ProjectController } from '@/controllers';
import { ProjectService } from '@/services';

// import {projectSchemas} from '@/validations';

const projectRoutes = Router();

const controller = new ProjectController(new ProjectService(), 'project');

projectRoutes.get('/', controller.index);
projectRoutes.post('/', controller.create);

export { projectRoutes };
