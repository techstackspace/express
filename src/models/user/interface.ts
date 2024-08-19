import { Types } from 'mongoose';

interface IUser {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  version: number;
}

export type { IUser };
