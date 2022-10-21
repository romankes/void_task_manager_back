import { BaseTypes } from '@/types';

export namespace User {
  export type Item = {
    _id: BaseTypes.Id;
    email: string;
    password: string;
    username: string;
  };

  export type Detail = Item;
}
