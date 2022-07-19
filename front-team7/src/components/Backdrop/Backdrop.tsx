import styled from 'styled-components';

interface BackdropProps {
  isOpen: boolean;
  close: () => void;
}

export const Backdrop = ({ isOpen, close }: BackdropProps) => {
  return <StyledBackdrop isOpen={isOpen} onClick={close} onKeyDown={close}></StyledBackdrop>;
};

const StyledBackdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 888;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  background: ${({ isOpen }) => (isOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0, 0, 0, 0%)')};
  transition: all 0.8s ease;
`;
