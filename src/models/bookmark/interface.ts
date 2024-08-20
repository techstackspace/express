import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface IBookmark {
  user: IUser;
  product: IProduct;
  version: number;
}

export type { IBookmark };
