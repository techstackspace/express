import { Document, model, Schema } from 'mongoose';
import { IProduct } from './interface';
import Review from '../review';

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
    reviews: { type: [Schema.Types.ObjectId], ref: 'Review', default: [] },
    tags: { type: [String], required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

ProductSchema.methods.calculateAverageRating = async function () {
  const reviews = await Review.find({ product: this._id });
  const totalReviews = reviews.length;
  if (totalReviews === 0) {
    this.ratingAverage = 0;
    await this.save();
    return;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / totalReviews;

  this.ratingAverage = Math.max(1, Math.min(averageRating, 5));
  await this.save();
};

ProductSchema.methods.calculateAverageRating = async function () {
  const reviews = await Review.find({ product: this._id });
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  this.rating = averageRating;
  await this.save();
};

const Product = model<IProduct & Document>('Product', ProductSchema);
export default Product;
