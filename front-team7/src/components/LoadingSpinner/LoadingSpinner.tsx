import styled from 'styled-components';

import { ThreeDots } from 'react-loader-spinner';

export const LoadingSpinner = () => {
  return (
    <StyledLoadingSpinner>
      <ThreeDots color="gold" ariaLabel="loading-indicator" />
    </StyledLoadingSpinner>
  );
};

const StyledLoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
