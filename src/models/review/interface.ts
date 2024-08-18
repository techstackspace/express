import { ObjectId } from 'mongoose';
import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface IReview {
  text: string;
  rating: number;
  user: IUser;
  product: IProduct;
  likes: ObjectId[];
  version: number;
  report: string;
}

export type { IReview };
