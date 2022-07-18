import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RiLogoutBoxRLine, RiAdminLine, RiMenuFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

import { userFieldQuery, sliderState } from '@/store';
import { useLogout } from '@/features/auth/api';

import { HeaderNavSlider } from './HeaderNavSlider';

export const HeaderNav = () => {
  const authority = useRecoilValue(userFieldQuery('authority'));
  const setIsOpenSlider = useSetRecoilState<boolean>(sliderState);
  const logout = useLogout();

  return (
    <StyledHeaderNav>
      <div className="mobile">
        {authority === 'admin' && (
          <NavLink className="nav-item" to="/admin">
            <RiAdminLine />
          </NavLink>
        )}
        <button className="nav-item" onClick={logout}>
          <RiLogoutBoxRLine />
        </button>
      </div>

      <div className="desktop">
        <button className="nav-item" onClick={() => setIsOpenSlider(true)}>
          <RiMenuFill />
        </button>
        <HeaderNavSlider />
      </div>
    </StyledHeaderNav>
  );
};

const StyledHeaderNav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: whitesmoke;

  .mobile {
    display: flex;
    align-items: center;
  }

  .desktop {
    display: none;
  }

  .nav-item {
    display: flex;
    align-items: center;
    padding: 6px;
    color: whitesmoke;
    background: none;
    border: none;
    font-size: 2.5rem;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: gold;
    }

    &.active {
      color: gold;
    }
  }

  @media screen and (min-width: 768px) {
    .mobile {
      display: none;
    }

    .desktop {
      display: flex;
      align-items: center;
    }
  }
`;
