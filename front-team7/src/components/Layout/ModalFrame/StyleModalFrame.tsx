import styled from 'styled-components';
const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: modal-show-op;
  animation-duration: 0.5s;
  @keyframes modal-show-op {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const StyledModal = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  position: relative;
  background-color: white;
  border-radius: 10px;
`;

const StyledClose = styled.div`
  position: absolute;
  z-index: 101;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7rem;
  color: gold;
  cursor: pointer;
`;

const StyledBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  /*     
    animation: modal-bg-show 1s;
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 0.6;
        }
    } */
`;

export { StyledContainer, StyledModal, StyledClose, StyledBackground };
