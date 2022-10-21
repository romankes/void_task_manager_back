import { logger } from '@/helpers';
import { User, UserModel } from '@/models';
import { BaseTypes } from '@/types';

export class UserServices
  implements BaseTypes.Service<User.Item, User.Detail, 'user'>
{
  async show({ id }: BaseTypes.ShowPayload): Promise<User.Detail | null> {
    const doc = await UserModel.findById(id);

    if (!doc) throw new Error();

    return doc;
  }

  async index({}: BaseTypes.IndexPayload): Promise<User.Item[]> {
    return [];
  }

  async create({}: BaseTypes.CreatePayload<
    User.Detail,
    'user'
  >): Promise<User.Item | null> {
    return null;
  }

  update(
    payload: BaseTypes.UpdatePayload<User.Detail, 'user'>,
  ): Promise<User.Item | null> {
    return null;
  }

  remove({}: BaseTypes.RemovePayload): Promise<User.Item | null> {
    return null;
  }
}
