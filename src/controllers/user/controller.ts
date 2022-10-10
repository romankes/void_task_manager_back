import { logger } from '@/helpers';
import { User } from '@/models';
import { BaseTypes } from '@/types';
import { AppController } from '../app';

export class UserController extends AppController<'user', User.Item> {
  constructor(service: BaseTypes.Service<User.Item, 'user'>, name: string) {
    super(service, name);
  }

  current(req: BaseTypes.BaseRequest, res: BaseTypes.BaseResponse) {
    try {
      res.json(res.locals.user);
    } catch (e) {
      logger.err(`Error current ${this.name} controller ${e}`);
    }
  }
}
