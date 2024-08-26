import { Document, model, Schema } from 'mongoose';
import { IProduct } from './interface';
import Review from '../review';
import slugify from 'slugify';

const ProductSchema = new Schema<IProduct & Document>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
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
    isPublished: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
    slug: { type: String, unique: true },
    status: {
      type: String,
      enum: ['draft', 'review', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

ProductSchema.pre('save', function (next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = `${slugify(this.name, { lower: true })}-${this._id}`;
  }
  next();
});

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

const Product = model<IProduct & Document>('Product', ProductSchema);
export default Product;
