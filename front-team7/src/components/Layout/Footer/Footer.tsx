import styled from 'styled-components';
import { FaHome, FaMapMarkedAlt, FaSearch, FaUserAlt } from 'react-icons/fa';

import { FooterIcon } from './FooterIcon';
import { useRecoilValue } from 'recoil';
import { userFieldQuery } from '@/store';

export const Footer = () => {
  const userId = useRecoilValue(userFieldQuery('id'));

  return (
    <StyledFooter>
      <FooterIcon icon={<FaHome />} to="/" />
      <FooterIcon icon={<FaMapMarkedAlt />} to={`/feedmap/${userId}`} />
      <FooterIcon icon={<FaSearch />} to="/search" />
      <FooterIcon icon={<FaUserAlt />} to={`/profile/${userId}`} />
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0px;
  width: 100vw;
  height: 70px;
  padding: 0 25px;
  background: #313131;
  z-index: 99;

  @media screen and (min-width: 480px) {
    padding: 0 40px;
  }

  @media screen and (min-width: 620px) {
    padding: 0 60px;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
