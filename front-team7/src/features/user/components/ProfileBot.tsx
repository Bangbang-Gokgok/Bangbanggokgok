import styled from 'styled-components';

export const ProfileBot = () => {
  return (
    <StyledProfileBot>
      <button className="btn">지도 보러가기</button>
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
