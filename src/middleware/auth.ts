// import { errors, handleError, jwt } from '@/helpers';
import { jwt } from '@/helpers';

import { User, UserModel } from '@/models';
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
      //TODO: custom error
      //   return handleError(res, errors.unauthorized());
    }
    const data = (await jwt.decode(token)) as { _id: string };
    if (data) {
      const user: User.Item = await UserModel.findById(data._id).populate(
        'lead avatar',
      );

      res.locals.user = user;
      next();
    } else {
      //TODO: custom error
      //   return handleError(res, errors.unauthorized());
    }
  } catch (err) {
    //TODO: custom error
    // return handleError(res, errors.unauthorized());
  }
};
