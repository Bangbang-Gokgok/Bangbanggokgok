import {
  StyledContainer,
  StyledModal,
  StyledClose,
  StyledBackground,
} from '@/components/Layout/ModalFrame/StyleModalFrame';
import { AiOutlineCloseCircle } from 'react-icons/ai';
const ModalFrame = ({
  handleModal,
  state,
  children,
}: {
  handleModal: (e: React.MouseEvent<HTMLDivElement>) => void;
  state: boolean;
  children: React.ReactNode;
}) => {
  return state ? (
    <StyledContainer>
      <StyledBackground onClick={(e) => handleModal(e)} />
      <StyledModal>{children}</StyledModal>
      <StyledClose onClick={(e) => handleModal(e)}>
        <AiOutlineCloseCircle />
      </StyledClose>
    </StyledContainer>
  ) : (
    <></>
  );
};

export default ModalFrame;
