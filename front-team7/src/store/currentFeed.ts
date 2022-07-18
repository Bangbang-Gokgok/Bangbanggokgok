import { atom } from 'recoil';
import { FeedProps } from '@/types/feed';

const currentFeedDefaultState: FeedProps = {
  _id: '',
  userName: '',
  title: '',
  description: '',
  imageUrl: [],
  review: [],
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
