import { handleError, logger } from '@/helpers';
import { BaseTypes } from '@/types';

export class AppController<N extends string, D = {}, T = {}> {
  protected service: BaseTypes.Service<T, D, N>;
  protected name: string;

  constructor(service: BaseTypes.Service<T, D, N>, name: string) {
    this.name = name;
    this.service = service;
  }

  show = async (
    req: BaseTypes.BaseRequest<{}, {}, BaseTypes.ShowParams>,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      res.json(await this.service.show(req.params));
    } catch (e) {
      logger.err(`Error show ${this.name} controller ${e}`);
      handleError(res, 'bad_params');
    }
  };

  index = async (
    req: BaseTypes.BaseRequest<{}, BaseTypes.IndexParams>,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      res.json(
        await this.service.index({ ...req.query, user: res.locals.user._id }),
      );
    } catch (e) {
      logger.err(`Error index ${this.name} controller ${e}`);
      handleError(res, 'bad_params');
    }
  };

  create = async (
    req: BaseTypes.BaseRequest<BaseTypes.CreateBody<T, N>>,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      res.json(
        await this.service.create({ ...req.body, user: res.locals.user._id }),
      );
    } catch (e) {
      logger.err(`Error create ${this.name} controller ${e}`);
      handleError(res, 'bad_params');
    }
  };

  update = async (
    req: BaseTypes.BaseRequest<
      BaseTypes.UpdateBody<T, N>,
      {},
      BaseTypes.UpdateParams
    >,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      res.json(
        await this.service.update({
          ...req.body,
          ...req.params,
          user: res.locals.user._id,
        }),
      );
    } catch (e) {
      logger.err(`Error update ${this.name} controller ${e}`);
      handleError(res, 'bad_params');
    }
  };

  remove = async (
    req: BaseTypes.BaseRequest<{}, {}, BaseTypes.RemoveParams>,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      res.json(
        await this.service.remove({ ...req.params, user: res.locals.user._id }),
      );
    } catch (e) {
      logger.err(`Error remove ${this.name} controller ${e}`);
      handleError(res, 'bad_params');
    }
  };
}
