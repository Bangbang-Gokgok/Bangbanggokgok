import mongoose from 'mongoose';
import { UserSchema, FeedSchema } from './schemas';
import { ReviewSchema } from './schemas';
export const User = mongoose.model('User', UserSchema);
export const Feed = mongoose.model('Feed', FeedSchema);
export const Review = mongoose.model('Review', ReviewSchema);
