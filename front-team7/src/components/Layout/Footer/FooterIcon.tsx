import { type ReactNode } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface FooterIconProps {
  icon: ReactNode;
  to: string;
}

export const FooterIcon = ({ icon, to }: FooterIconProps) => {
  return <StyledFooterIcon to={to}>{icon}</StyledFooterIcon>;
};

const StyledFooterIcon = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: whitesmoke;
  height: 45px;
  width: 45px;
  background-color: #494949;
  border-radius: 50%;
  padding: 6px;
  transition: color 0.3s ease;

  &:hover {
    color: gold;
  }

  &.active {
    color: gold;
  }
`;
