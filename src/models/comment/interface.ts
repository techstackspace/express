import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface IComment {
  content: string;
  user: IUser;
  product: IProduct;
  likes: IUser;
  version: number;
}

export type { IComment };
