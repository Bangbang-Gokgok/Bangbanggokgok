import styled from 'styled-components';

export const Introduction = () => {
  return (
    <StyledIntroduction>
      <div className="animated-title">
        <div className="text-top">
          <div>
            <span className="top">방방곡곡</span>
            <span className="mid">여행을 떠나세요.</span>
          </div>
        </div>
        <div className="text-bottom">
          <div className="bot">더욱 즐겁게!</div>
        </div>
      </div>
    </StyledIntroduction>
  );
};

const StyledIntroduction = styled.div`
  position: relative;
  @keyframes showTopText {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    40%,
    60% {
      transform: translate3d(0, 50%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes showBottomText {
    0% {
      transform: translate3d(0, -100%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
  .animated-title {
    color: #d8d8d8;
    height: 250px;
    width: 100%;
    margin-bottom: 20px;
  }
  .animated-title > div {
    &:first-child {
      height: 75%;
    }

    &:last-child {
      height: 25%;
    }
    height: 50%;

    overflow: hidden;
    position: absolute;
    width: 100%;
  }
  .animated-title > div div {
    font-size: 4rem;
    padding: 10px 0;
    position: absolute;
  }
  .animated-title > div div span {
    display: block;
  }
  .animated-title > div.text-top {
    border-bottom: 5px solid #aa3030;
    top: 0;
  }
  .animated-title > div.text-top div {
    animation: showTopText 1s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    bottom: 0;
    transform: translate(0, 100%);
  }
  .animated-title > div.text-top div span:first-child {
    color: #e6e6e6;
  }
  .animated-title > div.text-bottom {
    bottom: 0;
  }
  .animated-title > div.text-bottom div {
    animation: showBottomText 0.5s;
    animation-delay: 1.75s;
    animation-fill-mode: forwards;
    top: 0;
    transform: translate(0, -100%);
  }
`;
