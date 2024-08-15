import { Document, model, Schema } from 'mongoose';
import { IComment } from './interface';

const CommentSchema = new Schema<IComment & Document>(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Comment = model<IComment & Document>('Comment', CommentSchema);
export default Comment;
