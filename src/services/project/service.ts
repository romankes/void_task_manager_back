import { Project, ProjectModel } from '@/models';

import { BaseTypes } from '@/types';

export class ProjectService
  implements BaseTypes.Service<Project.Item, 'project'>
{
  async show({ id }: BaseTypes.ShowPayload): Promise<Project.Item | null> {
    // const doc = await UserModel.findById(id);

    // //TODO: add error with message
    // if (!doc) throw new Error();

    // return doc;

    return null;
  }

  async index({ user }: BaseTypes.IndexPayload): Promise<Project.Item[]> {
    const projects = await ProjectModel.find({ user }, '-user');

    return projects;
  }

  async create({
    project,
    user,
  }: BaseTypes.CreatePayload<
    Project.Item,
    'project'
  >): Promise<Project.Item | null> {
    const doc = await ProjectModel.create({ ...project, user: user });

    if (!doc) throw new Error('Project did not create');

    return doc;
  }
}
