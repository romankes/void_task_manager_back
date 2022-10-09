import { logger } from '@/helpers';
import { User, UserModel } from '@/models';
import { BaseTypes } from '@/types';

export class UserServices implements BaseTypes.Service<User.Item> {
  async show({ id }: BaseTypes.ShowParams): Promise<User.Item | null> {
    const doc = await UserModel.findById(id);

    //TODO: add error with message
    if (!doc) throw new Error();

    return doc;
  }
}
