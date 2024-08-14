import { model, Schema } from 'mongoose';
import { IProduct } from './interface';

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], default: [] },
    video: { type: [String], default: [] },
    pdf: { type: [String], default: [] },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: String, default: '' },
    tags: { type: [String], required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Product = model<IProduct>('Product', ProductSchema);
export default Product;
