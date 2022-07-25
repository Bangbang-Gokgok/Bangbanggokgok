export interface ReviewProps {
  _id: string;
  userId?: string;
  userName: string;
  contents: string;
  feedId: string;
  createdAt?: string;
}

export interface LocationProps {
  lat: number;
  lng: number;
}

export interface FeedProps {
  _id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  imageUrl: Array<string>;
  likes: Object;
  review: Array<ReviewProps>;
  profileImageUrl: Array<string>;
  address: string;
  location: LocationProps;
  createdAt: string;
  updatedAt: string;
}

export type FeedListProps = Array<FeedProps>;

export type ReviewListProps = Array<ReviewProps>;
