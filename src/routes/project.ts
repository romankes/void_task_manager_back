import { Router } from 'express';

// import {validate} from '@/helpers';

import { ProjectController } from '@/controllers';
import { ProjectService } from '@/services';

// import {projectSchemas} from '@/validations';

const projectRoutes = Router();

const controller = new ProjectController(new ProjectService(), 'project');

projectRoutes.get('/', controller.index);
projectRoutes.get('/:id', controller.show);
projectRoutes.post('/', controller.create);
projectRoutes.patch('/:id', controller.update);
projectRoutes.delete('/:id', controller.remove);

export { projectRoutes };
