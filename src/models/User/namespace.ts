import { BaseTypes } from '@/types';
import { Asset } from '../Asset';

export namespace User {
  export type Item = {
    _id: BaseTypes.Id;
    email: string;
    password: string;
    username: string;

    avatar: Asset.Item;
  };

  export type Detail = Item;
}
