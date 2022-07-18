import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { FaHome, FaMapMarkedAlt, FaSearch, FaUserAlt, FaTimes } from 'react-icons/fa';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { MdAdminPanelSettings } from 'react-icons/md';

import { useLogout } from '@/features/auth/api';
import { sliderState, userFieldQuery } from '@/store';

import { Backdrop } from '@/components/Backdrop';

export const HeaderNavSlider = () => {
  const [isOpenSlider, setIsOpenSlider] = useRecoilState(sliderState);
  const userId = useRecoilValue(userFieldQuery('id'));
  const authority = useRecoilValue(userFieldQuery('authority'));
  const logout = useLogout();

  return (
    <>
      <Backdrop isOpen={isOpenSlider} close={() => setIsOpenSlider(false)} />
      <StyledHeaderNavSlider isOpen={isOpenSlider}>
        <button className="close-button" onClick={() => setIsOpenSlider(false)}>
          <FaTimes />
        </button>
        <div className="sidebar-links">
          <ul>
            <li>
              <Link to="/" onClick={() => setIsOpenSlider(false)}>
                <FaHome />
                <span className="link-text">홈으로</span>
              </Link>
            </li>
            <li>
              <Link to={`/feedmap/${userId}`} onClick={() => setIsOpenSlider(false)}>
                <FaMapMarkedAlt />
                <span className="link-text">나의 지도</span>
              </Link>
            </li>
            <li>
              <Link to="/search" onClick={() => setIsOpenSlider(false)}>
                <FaSearch />
                <span className="link-text">검색</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setIsOpenSlider(false)}>
                <FaUserAlt />
                <span className="link-text">내 프로필</span>
              </Link>
            </li>
          </ul>
          <ul>
            {authority === 'admin' && (
              <li>
                <Link to="/admin" onClick={() => setIsOpenSlider(false)}>
                  <MdAdminPanelSettings />
                  <span className="link-text">관리자 페이지</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="#"
                onClick={async () => {
                  setIsOpenSlider(false);
                  await logout();
                }}
              >
                <RiLogoutBoxRFill />
                <span className="link-text">로그아웃</span>
              </Link>
            </li>
          </ul>
        </div>
      </StyledHeaderNavSlider>
    </>
  );
};

const StyledHeaderNavSlider = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 27rem;
  background-color: #f8f8f8;
  z-index: 999;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: all 0.8s ease;
  box-shadow: -0.3rem 0 0.4rem rgba(0, 0, 0, 25%);

  .close-button {
    position: absolute;
    top: 12px;
    right: 15px;
    border: none;
    padding: 6px;
    font-size: 3rem;
    color: #4c4c4c;
    background: transparent;
    cursor: pointer;
  }

  .sidebar-links {
    position: relative;
    top: 70px;
    border-top: 1.5px solid rgba(0, 0, 0, 15%);
  }

  .sidebar-links ul {
    margin: 0;
    padding-top: 13px;
    padding-bottom: 13px;
    padding-left: 16px;
  }

  .sidebar-links li {
    margin-bottom: 1rem;
    font-size: 1.7rem;
  }

  .sidebar-links li a {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem;
    color: #4c4c4c;
  }

  .link-text {
    padding-left: 0.75rem;
    font-size: 1.7rem;
  }
`;
