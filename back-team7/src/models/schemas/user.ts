import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    authority: {
      type: String,
      required: true,
      default: 'user',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: false,
      default: '',
    },
    profileImage: {
      type: [String],
      required: false,
    },
    contactNumber: {
      type: Number,
      required: false,
    },
    location: {
      type: Object,
      required: false,
    },
    friends: {
      type: Array,
      required: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { UserSchema };
