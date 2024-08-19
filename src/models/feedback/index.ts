import { Document, Schema, model } from 'mongoose';
import { IFeedback } from './interface';

const FeedbackSchema = new Schema<IFeedback & Document>({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  orderId: { type: String, required: false },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedbackType: {
    type: String,
    required: true,
    enum: ['product', 'service', 'delivery'],
  },
  title: { type: String, required: false },
  comments: { type: String, required: false },
  suggestions: { type: String, required: false },
  dateSubmitted: { type: Date, default: Date.now },
  images: [{ url: String, description: String }],
  contactPermission: { type: Boolean, default: false },
  platform: { type: String, required: true },
  appVersion: { type: String, default: '1.3.0' },
  browserInfo: { type: String, required: true },
  version: { type: Number, default: 1 },
});

const Feedback = model<IFeedback & Document>('Feedback', FeedbackSchema);
export default Feedback;
