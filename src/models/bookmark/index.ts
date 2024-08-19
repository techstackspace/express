import { model, Schema } from 'mongoose';

const BookmarkSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  },
  { timestamps: true }
);

const Bookmark = model('Bookmark', BookmarkSchema);

export default Bookmark;
