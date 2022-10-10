import { Project } from '@/models';
import { BaseTypes } from '@/types';
import { AppController } from '../app';

export class ProjectController extends AppController<'project', Project.Item> {
  constructor(
    service: BaseTypes.Service<Project.Item, 'project'>,
    name: string,
  ) {
    super(service, name);
  }
}
