import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProfileMid = () => {
  return (
    <StyledProfileMid>
      <span className="introduction">나의 지도를 소개합니다 ✨</span>
      <span className="content">다채롭고 색다른, 우아하고 멋있는 홍길동의 지도입니다.</span>
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
