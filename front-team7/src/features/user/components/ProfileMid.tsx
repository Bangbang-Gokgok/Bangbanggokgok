import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { currentUserQuery } from '@/store';

export const ProfileMid = () => {
  const currentUser = useRecoilValue(currentUserQuery);

  const newDescription = currentUser?.description || `${currentUser?.name}님의 지도입니다.`;

  return (
    <StyledProfileMid>
      <span className="introduction">나의 지도를 소개합니다 ✨</span>
      <span className="content">{newDescription}</span>
    </StyledProfileMid>
  );
};

const StyledProfileMid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px 10px;

  .introduction {
    color: whitesmoke;
    font-size: 1.5rem;
    align-self: center;
  }

  .content {
    color: #333333;
    font-size: 1.4rem;
    background-color: #f3f6fb;
    border-radius: 5px;
    padding: 12px 16px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
