import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userFieldQuery } from '@/store';

export const ProfileBot = () => {
  const userId = useRecoilValue(userFieldQuery('id')); // 임시로 자기 지도로만 가도록 설정

  return (
    <StyledProfileBot>
      <Link to={`/feedmap/${userId}`}>
        <button className="btn">지도 보러가기</button>
      </Link>
    </StyledProfileBot>
  );
};

const StyledProfileBot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .btn {
    font-weight: bold;
    font-size: 1.6rem;
    color: #343434;
    background-color: #ddcb51;
    cursor: pointer;
    border-radius: 3px;
    border: none;
    padding: 10px 16px;
  }
`;
