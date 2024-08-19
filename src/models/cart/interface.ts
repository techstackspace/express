import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface ICart {
  user: IUser;
  product: IProduct;
  quantity: number;
}

export type { ICart };
