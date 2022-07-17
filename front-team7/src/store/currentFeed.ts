import { atom } from 'recoil';

interface Review {
  userName: string;
  contents: string;
  timestamp: Date;
}

interface CenterLatLng {
  lat: number;
  lng: number;
}

interface CurrentFeedAtom {
  _id: string;
  userName: string;
  title: string;
  description: string;
  imageUrl: Array<string>;
  review: Array<Review>;
  address: string;
  location: CenterLatLng;
  createdAt: string;
  updatedAt: string;
}

const currentFeedDefaultState: CurrentFeedAtom = {
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
