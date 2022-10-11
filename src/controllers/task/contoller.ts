import { Task } from '@/models';
import { BaseTypes } from '@/types';
import { AppController } from '../app';

export class TaskController extends AppController<'task', Task.Item> {
  constructor(service: BaseTypes.Service<Task.Item, 'task'>, name: string) {
    super(service, name);
  }
}
