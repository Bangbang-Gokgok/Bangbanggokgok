import { atom } from 'recoil';
import { FeedProps } from '@/types/feed';

const currentFeedDefaultState: FeedProps = {
  _id: '',
  userId: '',
  userName: '',
  title: '',
  description: '',
  imageUrl: [],
  review: [],
  likes: [],
  location: { lat: 0, lng: 0 },
  address: '',
  createdAt: '',
  updatedAt: '',
};

const currentFeedAtom = atom({
  key: 'currentFeed',
  default: currentFeedDefaultState,
});

export { currentFeedAtom };
