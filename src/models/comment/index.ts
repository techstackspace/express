import { model, Schema } from 'mongoose';
import { IComment } from './interface';

const CommentSchema = new Schema<IComment & Document>(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    version: { type: String, default: '1.0.0' },
  },
  { timestamps: true, versionKey: 'version' }
);

const Comment = model<IComment & Document>('Comment', CommentSchema);
export default Comment;
