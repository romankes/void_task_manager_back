import { Project, ProjectModel } from '@/models';

import { BaseTypes } from '@/types';

export class ProjectService
  implements BaseTypes.Service<Project.Item, 'project'>
{
  async show({ id }: BaseTypes.ShowPayload): Promise<Project.Item | null> {
    const doc = await ProjectModel.findById(id);

    //TODO: add error with message
    if (!doc) throw new Error('Project not found');

    return doc;
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

  async update({
    id,
    project,
    user,
  }: BaseTypes.UpdatePayload<
    Project.Item,
    'project'
  >): Promise<Project.Item | null> {
    const doc = await ProjectModel.findOne({ _id: id, user }, project);

    if (!doc) throw new Error('Project did not find');

    return await ProjectModel.findOne({ _id: id, user });
  }
}
