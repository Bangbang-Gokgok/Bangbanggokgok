import { Schema } from 'mongoose';
import shortid from 'shortid';
const ReviewSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    userId: {
      type: String,
      ref: 'users',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    feedId: {
      type: String,
      ref: 'feeds',
      required: true,
    },
  },
  {
    collection: 'reviews',
    timestamps: true,
  }
);
export { ReviewSchema };
