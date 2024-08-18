import { Document, model, Schema } from 'mongoose';
import { IReview } from './interface';

const ReviewSchema = new Schema<IReview & Document>(
  {
    text: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    report: { type: String, default: '' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Review = model<IReview & Document>('Review', ReviewSchema);
export default Review;
