import styled, { keyframes } from 'styled-components';

const displayAnimation = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity : 1;
  background-color: #a2c4f3;
}
`;

const StyledCommentGroup = styled.div`
  animation: ${displayAnimation} 2s alternate;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  background-color: #a2c4f3;
  height: 100%;
  // padding: 5px;
  .commentHeader {
    margin: 0;
    .comment {
      font-size: 1.6rem;
      display: flex;
      gap: 10px;
      background-color: red;
      position: relative;
      padding: 10px;
      white-space: nowrap;
      overflow: hidden;

      .content {
        display: flex;
        flex-direction: column;
        // background-color: yellow;
        gap: 5px;

        .content-info {
          display: flex;
          background-color: lightgray;
          height: 1.6em;
          line-height: 1.6rem;

          .author {
            width: 70px;
            font-size: 1.6rem;
            font-weight: 600;
            margin-right: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .metaData {
            width: 120px;
            color: rgba(0, 0, 0, 0.4);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .text {
          width: 200px;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 1.6rem;
        }
      }
    }
  }
`;
const StyledCommentBody = styled.div`
  width: 100%;
  height: 150px;

  // border: 10px solid black;
  border-radius: 10px;
  background-color: #cfe7d8;
  overflow-y: scroll;
`;

const StyledCommentInput = styled.div`
  width: 100%;
  height: 40px;
  // position: relative;
  gap: 20px;
  display: flex;
`;

export { StyledCommentBody, StyledCommentInput, StyledCommentGroup };
