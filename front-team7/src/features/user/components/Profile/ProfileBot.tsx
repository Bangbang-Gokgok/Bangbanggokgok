import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userByIdFieldQuery } from '@/store';

import { RecentPosts } from './RecentPosts';
import { ReactNode } from 'react';

export const ProfileBot = () => {
  const username = useRecoilValue(userByIdFieldQuery('name'));
  return (
    <StyledProfileBot>
      <div className="recent-post-container">
        <span>{username as ReactNode}</span>
        <span>님의 최신글 목록</span>
      </div>
      <RecentPosts />
    </StyledProfileBot>
  );
};

const StyledProfileBot = styled.div`
  padding: 30px;

  .recent-post-container {
    padding-bottom: 5px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ccc;

    span:nth-child(1) {
      color: gold;
      font-size: 1.7rem;
    }
    span:nth-child(2) {
      color: whitesmoke;
      font-size: 1.3rem;
    }
  }
`;
