import { Schema } from 'mongoose';
import shortid from 'shortid';

const FeedSchema = new Schema(
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
    likes: {
      type: Object,
      required: true,
      default: {},
    },

    report: {
      type: Object,
      required: false,
    },
    imageUrl: {
      type: [String],
      required: false,
    },
    profileImageUrl: {
      type: [String],
      required: false,
    },
  },
  {
    collection: 'feeds',
    timestamps: true,
    minimize: false,
  }
);
export { FeedSchema };
