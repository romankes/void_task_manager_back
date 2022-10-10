import { jwt } from '@/helpers';
import { Auth, UserModel } from '@/models';

import { compare } from 'bcrypt';

export class AuthService {
  async signIn({ user }: Auth.SignInBody) {
    const doc = await UserModel.findOne({ email: user.email });

    //TODO: add custom message
    if (!doc) throw new Error('User is null');

    const compared = await compare(doc.password, user.password);

    //TODO: add custom message
    if (!compared) throw new Error('Password don`t match');

    return await jwt.sign({
      _id: doc._id,
      email: doc.email,
      password: doc.password,
    });
  }

  async signUp({ user }: Auth.SignUpBody) {
    const isExist = await UserModel.exists({ email: user.email });

    //TODO: add custom message
    if (isExist) throw new Error();

    const doc = await UserModel.create(user);

    if (!doc) throw new Error();

    return await jwt.sign({
      _id: doc._id,
      email: doc.email,
      password: doc.password,
    });
  }
}
