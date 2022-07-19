import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

export const Logo = () => {
  return (
    <StyledLogo to="/">
      <div className="logo-container">
        <img src={logo as string} alt="logo" />
      </div>

      <div>
        <span>방방</span>
        <span>곡곡</span>
      </div>
    </StyledLogo>
  );
};

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 7px;
  color: whitesmoke;

  font-weight: bold;
  padding: 5px;

  .logo-container {
    width: 30px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  span {
    &:nth-child(1) {
      font-size: 2.2rem;
    }

    &:nth-child(2) {
      font-size: 1.8rem;
    }
  }

  @media screen and (min-width: 768px) {
    gap: 10px;

    .logo-container {
      width: 40px;
      height: 40px;
    }

    span {
      &:nth-child(1) {
        font-size: 2.4rem;
      }

      &:nth-child(2) {
        font-size: 2rem;
      }
    }
  }
`;
