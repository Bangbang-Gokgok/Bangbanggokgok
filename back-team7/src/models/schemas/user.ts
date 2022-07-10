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
    profileImage: {
      type: String,
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
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { UserSchema };
