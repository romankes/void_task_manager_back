import { BaseTypes } from '@/types';

export namespace Asset {
  export type Item = {
    _id: BaseTypes.Id;
    url: string;

    filename?: string;
  };

  export type CreatePayload = {
    folder: string;
    filename: string;
  };

  export type RemovePayload = {
    id: BaseTypes.Id;
  };

  export type ShowParams = {
    file: string;
  };
}
