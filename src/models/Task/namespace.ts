import { Project } from '../Project';
import { User } from '../User';

export namespace Task {
  export type Item = {
    title: string;
    description: string;
    date: Date;
    completed: boolean;
    duration: number;
    user: User.Item;
    project: Project.Item;
  };
}
