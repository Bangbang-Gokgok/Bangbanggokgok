import styled from 'styled-components';
import { FaHome, FaMapMarkedAlt, FaSearch, FaUserAlt } from 'react-icons/fa';

import { FooterIcon } from './FooterIcon';

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterIcon icon={<FaHome />} to="/" />
      <FooterIcon icon={<FaMapMarkedAlt />} to="/map" />
      <FooterIcon icon={<FaSearch />} to="/search" />
      <FooterIcon icon={<FaUserAlt />} to="/profile" />
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 70px;
  padding: 0 25px;
  background: #313131;
  z-index: 99;
`;
