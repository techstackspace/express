import { Document, model, Schema } from 'mongoose';
import { ICart } from './interface';

const CartSchema = new Schema<ICart & Document>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const Cart = model<ICart & Document>('Cart', CartSchema);

export default Cart;
