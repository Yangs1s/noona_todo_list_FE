export interface Task {
  _id: string;
  task: string;
  isCompleted: boolean;
  author: {
    _id: string;
    name: string;
    email: string;
  };
}
