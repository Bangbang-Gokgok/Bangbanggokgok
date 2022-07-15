import styled from 'styled-components';
import { type UseFormRegister } from 'react-hook-form';

import { RegisterProps } from '@/features/user/components';

interface AvartarEditDropdownProps {
  register: ReturnType<UseFormRegister<RegisterProps>>;
}

export const AvartarEditDropdown = ({ register }: AvartarEditDropdownProps) => {
  return (
    <StyledAvartarEditDropdown role="menu">
      <ul className="dropdown-ul">
        <li className="dropdown-li">
          <label className="img-upload-label" htmlFor="profileImage">
            이미지 업로드
          </label>
          <input className="img-upload-input" type="file" id="profileImage" {...register} />
        </li>

        <li className="dropdown-li">
          <label className="img-upload-label" htmlFor="profileImage">
            이미지 삭제
          </label>
        </li>
      </ul>
    </StyledAvartarEditDropdown>
  );
};

const StyledAvartarEditDropdown = styled.div`
  position: absolute;
  top: 80%;
  right: -130%;
  z-index: 100;
  width: 120px;
  margin-top: 2px;
  list-style: none;
  background-color: white;
  background-clip: padding-box;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2);

  .dropdown-ul {
    padding: 0;

    .dropdown-li {
      .img-upload-label {
        display: block;
        font-size: 1.5rem;
        padding: 6px 14px;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
        z-index: 101;
      }

      .img-upload-input {
        display: none;
      }
    }
  }
`;
