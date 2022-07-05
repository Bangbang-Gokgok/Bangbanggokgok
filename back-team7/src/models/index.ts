import mongoose from 'mongoose';
import { UserSchema } from './schemas';

export const User = mongoose.model('User', UserSchema);
