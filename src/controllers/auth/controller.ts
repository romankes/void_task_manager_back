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

  private setCookies = (token: string, res: BaseTypes.BaseResponse) => {
    if (token) {
      res?.cookie('auth', token, {
        httpOnly: true,
        signed: true,
      });
    }
  };

  signIn = async (
    req: BaseTypes.BaseRequest<Auth.SignInBody>,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      this.setCookies(await this.service.signIn(req.body), res);

      res.sendStatus(HttpStatusCode.OK);
    } catch (e) {
      logger.err(`Error sign in auth controller ${e}`);
      res.sendStatus(400);
      //TODO: throw bad status code
    }
  };

  signUp = async (
    req: BaseTypes.BaseRequest<Auth.SignUpBody>,
    res: BaseTypes.BaseResponse,
  ) => {
    try {
      this.setCookies(await this.service.signUp(req.body), res);

      res.sendStatus(HttpStatusCode.OK);
    } catch (e) {
      logger.err(`Error sign up auth controller ${e}`);

      //TODO: throw bad status code
    }
  };

  logout = async (req: BaseTypes.BaseRequest, res: BaseTypes.BaseResponse) => {
    try {
      res.clearCookie('auth');

      res.sendStatus(HttpStatusCode.NO_CONTENT);
    } catch (e) {
      logger.err(`Error logout auth controller ${e}`);
    }
  };
}
