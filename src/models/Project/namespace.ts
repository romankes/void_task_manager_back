import { BaseTypes } from '@/types';
import { User } from '../User';

export namespace Project {
  export type Item = {
    _id: BaseTypes.Id;
    user: User.Item;
    title: string;
    description: string;
    completed: boolean;
    maxHours: number;
  };
}
