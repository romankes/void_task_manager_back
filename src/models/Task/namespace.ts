import { Project } from '../Project';
import { User } from '../User';

export namespace Task {
  export type Item = {
    title: string;
    description: string;
    date: Date;
    startDate: Date;
    endDate: Date;
    user: User.Item;
    project: Project.Item;
  };

  export type IndexParams = {
    date: string;
  };
}
