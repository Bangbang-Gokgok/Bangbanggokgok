import { Schema } from 'mongoose';
const FeedSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    review: {
      type: Array,
      required: false,
    },
    report: {
      type: Object,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'feeds',
    timestamps: true,
  }
);
export { FeedSchema };
