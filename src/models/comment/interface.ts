import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface IComment {
  content: string;
  user: IUser;
  product: IProduct;
  version: string;
}

export type { IComment };
