import { Task, TaskModel } from '@/models';

import { BaseTypes } from '@/types';

export class TaskService implements BaseTypes.Service<Task.Item, 'task'> {
  async show({ id }: BaseTypes.ShowPayload): Promise<Task.Item | null> {
    const doc = await TaskModel.findById(id);

    //TODO: add error with message
    if (!doc) throw new Error('Task not found');

    return doc;
  }

  async index({ user }: BaseTypes.IndexPayload): Promise<Task.Item[]> {
    const projects = await TaskModel.find({ user }, '-user');

    return projects;
  }

  async create({
    task,
    user,
  }: BaseTypes.CreatePayload<Task.Item, 'task'>): Promise<Task.Item | null> {
    const doc = await TaskModel.create({ ...task, user: user });

    if (!doc) throw new Error('Task did not create');

    return doc;
  }
}
