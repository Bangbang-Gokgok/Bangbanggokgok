import { atom } from 'recoil';

interface Review {
  userName: string;
  contents: string;
  timestamp: Date;
}

interface FeedModalAtom {
  userName: string;
  title: string;
  description: string;
  review: Array<Review>;
  address: string;
  createdAt: string,
  updatedAt: string;
}

const feedModalDefaultState: FeedModalAtom = {
  userName: '',
  title: '',
  description: '',
  review: [],
  address: '',
  createdAt: '',
  updatedAt: '',
};

const feedModalAtom = atom({
  key: 'feedModal',
  default: feedModalDefaultState,
});

export { feedModalAtom };
