import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import { userParamsState, userByIdFieldQuery } from '@/store';

export const ProfileMid = () => {
  const userId = useRecoilValue(userParamsState);
  const username = useRecoilValue(userByIdFieldQuery('name'));
  const description = useRecoilValue(userByIdFieldQuery('description'));
  console.log(description);

  const newDescription = description || `${username}님의 지도입니다.`;

  return (
    <StyledProfileMid>
      <span className="introduction">나의 지도를 소개합니다 ✨</span>
      <span className="content">{newDescription as React.ReactNode}</span>
      <Link className="map-btn" to={`/feedmap/${userId}`}>
        지도 보러가기
      </Link>
    </StyledProfileMid>
  );
};

const StyledProfileMid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 16px 14px;

  .introduction {
    color: whitesmoke;
    font-size: 1.5rem;
    align-self: center;
  }

  .content {
    line-height: 1.5;
    letter-spacing: 0.3px;
    color: #333333;
    font-size: 1.4rem;
    min-width: 250px;
    max-width: 500px;
    background-color: #f3f6fb;
    border-radius: 5px;
    padding: 12px 16px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .map-btn {
    font-weight: bold;
    font-size: 1.6rem;
    color: #343434;
    margin-top: 10px;
    background-color: #ddcb51;
    cursor: pointer;
    border-radius: 3px;
    border: none;
    padding: 10px 16px;
  }

  @media screen and (min-width: 768px) {
    .introduction {
      font-size: 1.6rem;
    }

    .content {
      font-size: 1.5rem;
      min-width: 400px;
      max-width: 500px;
    }
  }

  @media screen and (min-width: 1024px) {
    .introduction {
      font-size: 1.65rem;
    }

    .content {
      font-size: 1.55rem;
      min-width: 500px;
      max-width: 650px;
    }
  }
`;
