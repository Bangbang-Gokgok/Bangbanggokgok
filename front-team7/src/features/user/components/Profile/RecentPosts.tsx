import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userByIdFeedsQuery } from '@/store';

import { Post } from '@/features/user/components';

export const RecentPosts = () => {
  const feeds = useRecoilValue(userByIdFeedsQuery);

  if (feeds!.length === 0) return <div>게시글이 존재하지 않습니다.</div>;

  return (
    <StyledRecentPosts>
      {feeds?.map((feed) => {
        const { _id, userId, title, description, address, location, imageUrl, createdAt } = feed;
        const date = new Date(createdAt);

        const convertedDate = `${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일`;

        const newFeeds = {
          userId,
          title,
          description,
          address,
          location,
          imageUrl,
          createdAt: convertedDate,
        };
        return <Post key={_id} feeds={newFeeds} />;
      })}
    </StyledRecentPosts>
  );
};

const StyledRecentPosts = styled.div`
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
