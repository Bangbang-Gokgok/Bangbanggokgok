import styled from 'styled-components';

import { type FeedsResponse } from '@/store';

import { FeedCard } from '@/features/feed/components';

interface FeedGridProps {
  feeds: FeedsResponse[];
}

export const FeedGrid = ({ feeds }: FeedGridProps) => {
  console.log(feeds);
  return (
    <StyledFeedGrid>
      {feeds?.map((feed) => {
        const {
          _id,
          userId,
          userName,
          title,
          likes,
          description,
          address,
          location,
          profileImageUrl,
          imageUrl,
          createdAt,
        } = feed;
        const date = new Date(createdAt);

        const convertedDate = `${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일`;

        const newFeeds = {
          _id,
          userId,
          userName,
          title,
          description,
          profileImageUrl,
          address,
          likes,
          location,
          imageUrl,
          createdAt: convertedDate,
        };
        return <FeedCard key={_id} feed={newFeeds} />;
      })}
    </StyledFeedGrid>
  );
};

const StyledFeedGrid = styled.div`
  display: grid;
  gap: 30px;
  margin: 0 auto;
  grid-template-columns: repeat(1, 1fr);
  max-width: 350px;

  @media screen and (min-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 400px;
  }

  @media screen and (min-width: 580px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 520px;
  }

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 600px;
  }

  @media screen and (min-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
  }

  @media screen and (min-width: 870px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 850px;
  }
`;
