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
  background: rgba(4, 4, 4, 0.4);
  opacity: 0.9;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledModal = styled.div`
  width: 300px;
  height: 550px;
  position: relative;
  background: #ffffff;
  border-radius: 10px;
`;

const StyledClose = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const ModalFrame = ({ handleModal, state, children }: { handleModal: (e: React.MouseEvent<HTMLDivElement>) => void, state: boolean, children: React.ReactNode; }) => {
  return state ? (
    <StyledContainer>
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
