import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { Link } from 'react-router-dom';
import { FaTimes, FaHouseDamage, FaCommentDots } from 'react-icons/fa';

import { sliderState } from '@/store';

export const HeaderNavSlider = () => {
  const [isOpenSlider, setIsOpenSlider] = useRecoilState(sliderState);

  return (
    <StyledHeaderNavSlider isOpen={isOpenSlider}>
      <button className="close-button" onClick={() => setIsOpenSlider(false)}>
        <FaTimes />
      </button>
      <div className="sidebar-links">
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpenSlider(false)}>
              <FaHouseDamage />
              <span className="link-text">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpenSlider(false)}>
              <FaCommentDots />
              <span className="link-text">About</span>
            </Link>
          </li>
        </ul>
      </div>
    </StyledHeaderNavSlider>
  );
};

const StyledHeaderNavSlider = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 27rem;
  background-color: whitesmoke;
  z-index: 999;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: all 0.8s ease;
  box-shadow: -0.3rem 0 0.4rem rgba(0, 0, 0, 25%);

  .close-button {
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    border: 0rem;
    padding: 0.6rem;
    font-size: 3.2rem;
    color: #e25050;
    background: transparent;
    cursor: pointer;
  }

  .sidebar-links {
    position: relative;
    top: 7rem;
    border-top: 0.15rem solid rgba(0, 0, 0, 15%);
  }

  .sidebar-links ul {
    margin: 0;
    padding-top: 1.3rem;
    padding-left: 1.6rem;
  }

  .sidebar-links li {
    margin-bottom: 1rem;
    font-size: 2.4rem;
  }

  .sidebar-links li a {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem;
  }

  .link-text {
    padding-left: 0.75rem;
    font-size: 3rem;
    font-family: imprima, arial, sans-serif;
  }
`;
