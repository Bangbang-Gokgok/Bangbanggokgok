import styled from 'styled-components';

import { type FeedsResponse } from '@/store';

import { FeedCard } from '@/features/feed/components';

interface FeedGridProps {
  feeds: FeedsResponse[];
}

export const FeedGrid = ({ feeds }: FeedGridProps) => {
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
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 860px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
