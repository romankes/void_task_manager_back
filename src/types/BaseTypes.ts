import { User } from '@/models';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export namespace BaseTypes {
  export type Id = Types.ObjectId;

  export type BaseRequest<B = {}, Q = {}, P = {}> = Request<P, {}, B, Q>;
  export type BaseResponse<
    R = {},
    L = {
      user: User.Item;
    },
  > = Response<R, L>;

  export type ShowParams = {
    id: Id;
  };
  export type ShowPayload<T = {}> = T & ShowParams;

  export type Service<T> = {
    show: ({ id }: ShowPayload) => Promise<T | null>;
  };
}
