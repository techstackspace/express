import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface IBookmark {
  user: IUser;
  product: IProduct;
}

export type { IBookmark };
