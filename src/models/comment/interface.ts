import { ObjectId } from 'mongoose';
import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface IComment {
  content: string;
  user: IUser;
  product: IProduct;
  likes: ObjectId[];
  version: number;
}

export type { IComment };
