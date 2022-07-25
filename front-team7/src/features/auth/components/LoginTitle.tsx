import styled from 'styled-components';

export const LoginTitle = () => {
  return (
    <StyledLoginTitleWrapper>
      <h2>여러 발자취들의 만남,</h2>
      <h2>
        <span>방방곡곡</span> 과 함께하세요. 🎉
      </h2>
    </StyledLoginTitleWrapper>
  );
};

const StyledLoginTitleWrapper = styled.div`
  h2 {
    color: whitesmoke;
    font-size: 1.4rem;
    font-weight: normal;
    margin: 2px 0;

    span {
      font-size: 1.6rem;
      color: #dfe918;
    }
  }
`;
