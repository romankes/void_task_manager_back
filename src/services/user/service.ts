import { logger } from '@/helpers';
import { User, UserModel } from '@/models';
import { BaseTypes } from '@/types';

export class UserServices implements BaseTypes.Service<User.Item, 'user'> {
  async show({ id }: BaseTypes.ShowPayload): Promise<User.Item | null> {
    const doc = await UserModel.findById(id);

    //TODO: add error with message
    if (!doc) throw new Error();

    return doc;
  }

  async index({}: BaseTypes.IndexPayload): Promise<User.Item[]> {
    return [];
  }

  async create({}: BaseTypes.CreatePayload<
    User.Item,
    'user'
  >): Promise<User.Item | null> {
    return null;
  }

  update(
    payload: BaseTypes.UpdatePayload<User.Item, 'user'>,
  ): Promise<User.Item | null> {
    return null;
  }
}
