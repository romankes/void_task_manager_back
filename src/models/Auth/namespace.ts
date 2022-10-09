export namespace Auth {
  type BasePayload = {
    email: string;
    password: string;
  };

  export type SignInBody = {
    user: BasePayload;
  };

  type SignUpPayload = BasePayload & {
    username: string;
  };

  export type SignUpBody = {
    user: SignUpPayload;
  };
}
