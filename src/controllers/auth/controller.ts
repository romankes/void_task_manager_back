import { logger } from '@/helpers';
import { Auth } from '@/models';
import { AuthService } from '@/services';
import { BaseTypes } from '@/types';

import HttpStatusCode from 'http-status-codes';

export class AuthController {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  private setCookies(token: string, res: BaseTypes.BaseResponse) {
    res.cookie('auth', token, {
      httpOnly: true,
      signed: true,
    });
  }

  async signIn(
    req: BaseTypes.BaseRequest<Auth.SignInBody>,
    res: BaseTypes.BaseResponse,
  ) {
    try {
      this.setCookies(await this.service.signIn(req.body), res);

      res.sendStatus(HttpStatusCode.OK);
    } catch (e) {
      logger.err(`Error sign in auth controller ${e}`);

      //TODO: throw bad status code
    }
  }

  async signUp(
    req: BaseTypes.BaseRequest<Auth.SignUpBody>,
    res: BaseTypes.BaseResponse,
  ) {
    try {
      this.setCookies(await this.service.signUp(req.body), res);

      res.sendStatus(HttpStatusCode.OK);
    } catch (e) {
      logger.err(`Error sign up auth controller ${e}`);

      //TODO: throw bad status code
    }
  }
}
