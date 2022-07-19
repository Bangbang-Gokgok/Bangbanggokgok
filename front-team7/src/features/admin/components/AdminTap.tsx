import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { adminTapState } from '@/store';

const ADMIN_TAP_ITEMS = ['회원관리', '피드관리'];

export const AdminTap = () => {
  const [selectedTap, setSelectedTap] = useRecoilState(adminTapState);

  return (
    <StyledAdminTap>
      <ul>
        {ADMIN_TAP_ITEMS.map((item) => (
          <li key={item}>
            <button
              className={selectedTap === item ? 'selected' : ''}
              onClick={() => setSelectedTap(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </StyledAdminTap>
  );
};

const StyledAdminTap = styled.nav`
  background-color: #434343;
  margin: 10px 0;

  ul {
    margin: 0;

    li {
      display: flex;
      align-items: center;

      button {
        width: 100%;
        height: 100%;
        padding: 7px 20px;
        text-align: start;
        color: whitesmoke;
        font-size: 1.5rem;
        background: none;
        border: none;
        cursor: pointer;
        transition: color 0.3s ease;

        &.selected {
          background-color: #2e2930;
        }
      }
    }
  }
`;
