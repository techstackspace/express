import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface ICart {
  user: IUser;
  product: IProduct;
  quantity: number;
  version: number;
}

export type { ICart };
