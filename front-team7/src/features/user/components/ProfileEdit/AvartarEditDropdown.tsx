import { useRef, type MouseEvent } from 'react';
import styled from 'styled-components';
import { type UseFormRegister } from 'react-hook-form';

import { RegisterProps } from '@/features/user/components';

interface AvartarEditDropdownProps {
  register: ReturnType<UseFormRegister<RegisterProps>>;
  toggleDropdownMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const AvartarEditDropdown = ({ register, toggleDropdownMenu }: AvartarEditDropdownProps) => {
  const { ref, ...rest } = register;
  const inputRef = useRef<HTMLInputElement | null>(null);

  function onImageUploadHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    toggleDropdownMenu(e);
    inputRef.current?.click();
  }

  return (
    <StyledAvartarEditDropdown role="menu">
      <ul className="dropdown-ul">
        <li className="dropdown-li">
          <button type="button" onClick={(e) => onImageUploadHandler(e)}>
            이미지 업로드
          </button>
          <input
            className="img-upload-input"
            type="file"
            id="profileImage"
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            {...rest}
          />
        </li>

        <li className="dropdown-li">
          <button type="button">이미지 삭제</button>
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
      button {
        display: block;
        width: 100%;
        font-size: 1.4rem;
        padding: 6px 14px;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
        z-index: 101;
        text-align: start;
      }

      .img-upload-input {
        display: none;
      }
    }
  }
`;
