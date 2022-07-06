import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return <StyledLogo to="/">Logo</StyledLogo>;
};

const StyledLogo = styled(Link)`
  color: whitesmoke;
  font-size: 3rem;
  font-weight: bold;
  padding: 5px;
`;
