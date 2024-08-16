import { Document, model, Schema } from 'mongoose';
import { IProduct } from './interface';

const ProductSchema = new Schema<IProduct & Document>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    pdfs: { type: [String], default: [] },
    category: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: [String], default: [] },
    tags: { type: [String], required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Product = model<IProduct & Document>('Product', ProductSchema);
export default Product;
