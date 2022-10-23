import { logger } from '@/helpers';
import { User, UserModel } from '@/models';
import { BaseTypes } from '@/types';
import { assetService } from '../asset';

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

  async update({
    user,
    userId,
  }: BaseTypes.UpdatePayload<User.Detail, 'user'>): Promise<User.Item | null> {
    if (user.avatar?.filename) {
      const asset = await assetService.create({
        filename: user.avatar.filename,
        folder: 'users',
      });

      const doc = await UserModel.findByIdAndUpdate(userId, {
        ...user,
        avatar: asset._id,
      }).populate('avatar');

      if (!doc) throw new Error('User did not update');

      if (doc.avatar?._id) {
        await assetService.remove({ id: doc.avatar._id });
      }
    } else {
      const doc = await UserModel.findByIdAndUpdate(userId, user);

      if (!doc) throw new Error('User did not update');
    }

    return await UserModel.findById(userId).populate('avatar');
  }

  async remove({ userId }: BaseTypes.RemovePayload): Promise<User.Item | null> {
    const doc = await UserModel.findOneAndRemove({ _id: userId });

    if (!doc) throw new Error('User not found');

    return doc;
  }
}
