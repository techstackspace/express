import { Document, model, Schema } from 'mongoose';
import { IOrderProduct, IOrder } from './interface';

const OrderSchema = new Schema<IOrderProduct & IOrder & Document>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: 'Pending' },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Order = model<IOrderProduct & IOrder & Document>('Order', OrderSchema);

export default Order;
