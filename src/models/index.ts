import { model, Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: String,
    reviews: String,
    tags: { type: [String], required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    likes: { type: [String], required: true },
    comments: { type: [String], required: true },
  },
  { timestamps: true }
);

const Product = model('Product', ProductSchema);
export default Product;
