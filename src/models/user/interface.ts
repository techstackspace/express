interface IUser {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  includes(userId: any): unknown;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  pull(userId: any): unknown;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  push(userId: any): unknown;
  name: string;
  username: string;
  email: string;
  password: string;
  version: number;
}

export type { IUser };
