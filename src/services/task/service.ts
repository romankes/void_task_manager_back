import { Task, TaskModel } from '@/models';

import { BaseTypes } from '@/types';

export class TaskService
  implements BaseTypes.Service<Task.Item, Task.Detail, 'task'>
{
  async show({ id }: BaseTypes.ShowPayload): Promise<Task.Item | null> {
    const doc = await TaskModel.findById(id, '-user').populate('project');

    if (!doc) throw new Error('Task not found');

    return doc;
  }

  async index({
    user,
    date,
    endDate,
    startDate,
  }: BaseTypes.IndexPayload<Task.IndexParams>): Promise<{
    [key: string]: Task.Item[];
  }> {
    const tasks = await TaskModel.find(
      {
        date: { $gte: new Date(), $lt: new Date(date) },
        user: user._id,
        startDate: startDate === 'true' ? { $ne: null } : null,
        endDate: endDate === 'true' ? { $ne: null } : null,
      },
      '-user',
      { sort: { date: 1 } },
    ).populate('project');

    const groupedTasks: { [key: string]: Task.Item[] } = tasks.reduce(
      (groups, item) => ({
        ...groups,
        [item.toJSON().date.toISOString()]: [
          ...(groups[item.toJSON().date.toISOString() as keyof typeof groups] ||
            []),
          item,
        ],
      }),
      {},
    );

    return groupedTasks;
  }

  async create({
    task,
    user,
  }: BaseTypes.CreatePayload<Task.Item, 'task'>): Promise<Task.Item | null> {
    const doc = await TaskModel.create({ ...task, user: user });

    if (!doc) throw new Error('Task did not create');

    return doc;
  }

  async update({
    id,
    task,
    user,
  }: BaseTypes.UpdatePayload<Task.Item, 'task'>): Promise<Task.Item | null> {
    const doc = await TaskModel.findOneAndUpdate({ _id: id, user }, task);

    if (!doc) throw new Error('Task did not find');

    return await TaskModel.findOne({ _id: id, user });
  }

  remove = async ({
    id,
    user,
  }: BaseTypes.RemovePayload): Promise<Task.Item | null> => {
    const doc = await TaskModel.findOneAndRemove({ _id: id, user });

    if (!doc) throw new Error('Task not found');

    return null;
  };
}
