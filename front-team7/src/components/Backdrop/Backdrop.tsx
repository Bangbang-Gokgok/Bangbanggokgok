import styled from 'styled-components';

interface BackdropProps {
  isOpen: boolean;
  close: () => void;
  transitionSeconds?: number;
}

export const Backdrop = ({ isOpen, close, transitionSeconds }: BackdropProps) => {
  return (
    <StyledBackdrop
      isOpen={isOpen}
      onClick={close}
      transitionSeconds={transitionSeconds}
      onKeyDown={close}
    ></StyledBackdrop>
  );
};

const StyledBackdrop = styled.div<{ isOpen: boolean; transitionSeconds?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 888;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  background: ${({ isOpen }) => (isOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0, 0, 0, 0%)')};
  transition: ${({ transitionSeconds }) =>
    transitionSeconds ? `all ${transitionSeconds}s ease` : `all 0.3 ease`};
`;
