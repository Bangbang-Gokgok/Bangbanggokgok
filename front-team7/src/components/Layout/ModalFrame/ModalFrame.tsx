import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

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
`;
const StyledModal = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  animation: modal-show 0.5s;
  @keyframes modal-show {
      from {
        transform: translate3d(0, 100%, 0);
      }
      to {
        transform: translateZ(0);
      }
  }
`;

const StyledClose = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

const StyledBackground = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.6);
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

const ModalFrame = ({ handleModal, state, children }: { handleModal: (e: React.MouseEvent<HTMLDivElement>) => void, state: boolean, children: React.ReactNode; }) => {
  return state ? (
    <StyledContainer>
      <StyledBackground onClick={e => handleModal(e)} />
      <StyledModal>
        <StyledClose onClick={e => handleModal(e)}>
          <GrClose></GrClose>
        </StyledClose>
        {children}
      </StyledModal>
    </StyledContainer>
  ) : (<></>);
};

export default ModalFrame;
