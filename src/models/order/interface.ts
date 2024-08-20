import { IProduct } from '../product/interface';
import { IUser } from '../user/interface';

interface IOrderProduct {
  product: IProduct;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  user: IUser;
  products: IOrderProduct[];
  totalAmount: number;
  orderStatus: string;
  shippingAddress: string;
  paymentMethod: string;
  isPaid: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
  version: number;
}

export type { IOrderProduct, IOrder };
