import { model, Schema } from 'mongoose';
import { ProjectModel } from '../Project';
import { TaskModel } from '../Task';
import { User } from './namespace';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: 'Username is required',
    },
    email: {
      type: String,
      unique: 'Email must be unique',
      required: 'Email is required',
    },
    password: {
      type: String,
      required: 'Password is required',
    },
  },
  { timestamps: true },
);

UserSchema.post('findOneAndRemove', async (doc) => {
  await Promise.all([
    ProjectModel.deleteMany({ user: doc._id }),
    TaskModel.deleteMany({ user: doc._id }),
  ]);
});

export const UserModel = model<User.Item>('User', UserSchema);
