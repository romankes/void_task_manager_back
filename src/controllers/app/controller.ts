import { logger } from '@/helpers';
import { BaseTypes } from '@/types';

export class AppController<M, T = {}> {
  protected service: BaseTypes.Service<T>;
  protected name: string;

  constructor(service: BaseTypes.Service<T>, name: string) {
    this.service = service;
    this.name = name;
  }

  async show(
    req: BaseTypes.BaseRequest<{}, {}, BaseTypes.ShowParams>,
    res: BaseTypes.BaseResponse,
  ) {
    try {
      res.json(await this.service.show(req.params));
    } catch (e) {
      logger.err(`Error show ${this.name} controller ${e}`);
      //   handleError(res, errors.paramsIsInvalid());
    }
  }

  async index(req: BaseTypes.BaseRequest<{}, {}>, res: BaseTypes.BaseResponse) {
    try {
      //   res.send(this.service.show(req.params));
    } catch (e) {
      logger.err(`Error show ${this.name} controller ${e}`);
      //   handleError(res, errors.paramsIsInvalid());
    }
  }
}
