import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: rgba(4, 4, 4, 0.4);
  opacity: 0.9;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  width: 300px;
  height: 550px;
  position: relative;
  background: #ffffff;
  border-radius: 10px;
`;

const Close = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const ModalFrame = () => {
  return (
    <Container>
      <Modal>
        <Close>
          <GrClose></GrClose>
        </Close>
      </Modal>
    </Container>
  );
};

export default ModalFrame;
