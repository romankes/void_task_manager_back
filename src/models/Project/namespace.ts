import { BaseTypes } from '@/types';
import { Task } from '../Task';
import { User } from '../User';

export namespace Project {
  export type Item = {
    _id: BaseTypes.Id;
    user: User.Item;
    title: string;
    description: string;
    completed: boolean;
    maxHours: number;

    spentHors?: number;
  };

  //TODO: update base controller for detail

  export type Detail = Item & {
    spentHors?: number;

    tasks?: Task.Item[];
  };
}
