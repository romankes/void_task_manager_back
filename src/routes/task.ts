import { Router } from 'express';

import { TaskController } from '@/controllers';
import { TaskService } from '@/services';

const controller = new TaskController(new TaskService(), 'task');

const taskRoutes = Router();

taskRoutes.get('/', controller.index);
taskRoutes.get('/:id', controller.show);
taskRoutes.post('/', controller.create);
taskRoutes.patch('/:id', controller.update);
taskRoutes.delete('/:id', controller.remove);

export { taskRoutes };
