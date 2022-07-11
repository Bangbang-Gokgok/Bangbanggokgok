import { Schema } from 'mongoose';
const ReviewSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'reviews',
    timestamps: true,
  }
);
export { ReviewSchema };
