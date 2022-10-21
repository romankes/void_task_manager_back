import { User } from '@/models';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export namespace BaseTypes {
  export type Id = Types.ObjectId;

  export type BaseRequest<B = {}, Q = {}, P = {}> = Request<P, {}, B, Q>;
  export type BaseResponse<
    R = {},
    L = {
      user: User.Item & {
        hasProjects: boolean;
      };
    },
  > = Response<R, L>;

  export type ShowParams = {
    id: Id;
  };
  export type ShowPayload<T = {}> = T & ShowParams;

  export type IndexParams = {
    page: number;
    perPage: number;
  };
  export type IndexPayload<T = {}> = T &
    IndexParams & {
      user: Id;
    };

  export type CreateBody<T, N extends string> = Record<N, T>;
  export type CreatePayload<T, N extends string> = CreateBody<T, N> & {
    user: Id;
  };

  export type UpdateBody<T, N extends string> = Record<N, T>;
  export type UpdateParams = { id: string };
  export type UpdatePayload<T, N extends string> = UpdateBody<T, N> &
    UpdateParams & { user: Id };

  export type RemoveParams = { id: Id };
  export type RemovePayload = RemoveParams & {
    user: Id;
  };

  export type Service<T, D, N extends string> = {
    show: (payload: ShowPayload) => Promise<D | null>;
    index: (payload: IndexPayload) => Promise<T[] | { [key: string]: T[] }>;
    create: (payload: CreatePayload<T, N>) => Promise<D | null>;
    update: (payload: UpdatePayload<T, N>) => Promise<D | null>;
    remove: (payload: RemovePayload) => Promise<T>;
  };
}
