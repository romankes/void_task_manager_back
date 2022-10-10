import { logger } from '@/helpers';
import { BaseTypes } from '@/types';

export class AppController<N extends string, T = {}> {
  protected service: BaseTypes.Service<T, N>;
  protected name: string;

  constructor(service: BaseTypes.Service<T, N>, name: string) {
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
      //   handleError(res, errors.paramsIsInvalid());
    }
  };

  index = async (
    req: BaseTypes.BaseRequest<{}, BaseTypes.IndexParams>,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      res.send(
        await this.service.index({ ...req.query, user: res.locals.user._id }),
      );
    } catch (e) {
      logger.err(`Error index ${this.name} controller ${e}`);
      //   handleError(res, errors.paramsIsInvalid());
    }
  };

  create = async (
    req: BaseTypes.BaseRequest<BaseTypes.CreateBody<T, N>>,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      res.send(
        await this.service.create({ ...req.body, user: res.locals.user._id }),
      );
    } catch (e) {
      logger.err(`Error create ${this.name} controller ${e}`);
      //   handleError(res, errors.paramsIsInvalid());
    }
  };
}
