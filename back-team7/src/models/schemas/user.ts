import { Schema } from 'mongoose';
import shortid from 'shortid';

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
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
    profileImage: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    contactNumber: {
      type: String,
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
      default: '',
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { UserSchema };
