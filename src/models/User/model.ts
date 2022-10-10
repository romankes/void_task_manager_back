import { model, Schema } from 'mongoose';
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

export const UserModel = model<User.Item>('User', UserSchema);
