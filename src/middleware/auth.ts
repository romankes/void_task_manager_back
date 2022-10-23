// import { errors, handleError, jwt } from '@/helpers';
import { jwt } from '@/helpers';

import { ProjectModel, User, UserModel } from '@/models';
import { BaseTypes } from '@/types';
import { NextFunction, Request, Response } from 'express';

export const auth = async (
  req: BaseTypes.BaseRequest,
  res: BaseTypes.BaseResponse,
  next: NextFunction,
) => {
  try {
    const token = req.signedCookies['auth'];

    if (!token) {
      throw new Error('Unauthorized');
    }
    const data = (await jwt.decode(token)) as { _id: string };

    if (data) {
      const user = await UserModel.findById(data._id).populate('avatar');

      console.log(user);

      if (!user) {
        throw new Error('User not found');
      }

      const projects = await ProjectModel.find({ user: user._id });

      res.locals.user = { ...user.toJSON(), hasProjects: !!projects.length };
      next();
    } else {
      throw new Error('Decode error');
    }
  } catch (err) {
    res.sendStatus(401);
  }
};
