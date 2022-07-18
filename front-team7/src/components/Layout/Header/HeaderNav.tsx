import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { RiLogoutBoxRLine, RiAdminLine, RiMenuFill } from 'react-icons/ri';
import { useNavigate, NavLink } from 'react-router-dom';

import { userState, sliderState, type UserState } from '@/store';
import { logout } from '@/features/auth/api';

import { HeaderNavSlider } from './HeaderNavSlider';

export const HeaderNav = () => {
  const [user, setUser] = useRecoilState<UserState | null>(userState);
  const setIsOpenSlider = useSetRecoilState<boolean>(sliderState);
  const navigate = useNavigate();

  async function onLogoutHandler() {
    await logout();
    setUser(null);
    navigate('/login');
  }

  return (
    <StyledHeaderNav>
      <div className="mobile">
        {user?.authority === 'admin' && (
          <NavLink className="nav-item" to="/admin">
            <RiAdminLine />
          </NavLink>
        )}
        <button className="nav-item" onClick={onLogoutHandler}>
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
