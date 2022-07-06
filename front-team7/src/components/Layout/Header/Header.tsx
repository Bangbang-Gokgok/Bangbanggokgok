import styled from 'styled-components';

import { Logo } from './Logo';
import { DirectMessage } from './DirectMessage';

export const Header = () => {
  return (
    <StyledHeader>
      <div className="header-left">
        <Logo />
      </div>
      <div className="header-right">
        <DirectMessage />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: #5eaca0;
  padding: 0 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 35%);
`;
