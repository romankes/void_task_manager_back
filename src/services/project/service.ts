import { Project, ProjectModel, TaskModel } from '@/models';

import { BaseTypes } from '@/types';

const COEFFICIENT_FOR_CONVERT_TO_HORS = 3600000;

export class ProjectService
  implements BaseTypes.Service<Project.Item, Project.Detail, 'project'>
{
  async show({ id }: BaseTypes.ShowPayload): Promise<Project.Detail | null> {
    const doc = await ProjectModel.findById(id);

    if (!doc) throw new Error('Project not found');

    const tasks = await TaskModel.find({ project: doc._id }, '-user -project');

    const duration = tasks
      .map(({ endDate, startDate }) =>
        !endDate || !startDate
          ? 0
          : new Date(endDate).getTime() - new Date(startDate).getTime(),
      )
      .reduce((prev, curr) => curr + prev, 0);

    return {
      ...(doc.toJSON() as Project.Item),
      spentHors: Math.ceil(duration / COEFFICIENT_FOR_CONVERT_TO_HORS),
      tasks,
    };
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
  >): Promise<Project.Detail | null> {
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

  remove = async ({
    id,
    user,
  }: BaseTypes.RemovePayload): Promise<Project.Item | null> => {
    const doc = await ProjectModel.findOneAndRemove({ _id: id, user });

    if (!doc) throw new Error('project not found');

    return doc;
  };
}
