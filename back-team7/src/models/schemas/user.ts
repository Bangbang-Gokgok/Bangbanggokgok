import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: false,
    },
    address: {
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
