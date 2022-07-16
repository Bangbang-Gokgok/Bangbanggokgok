import { useState, useEffect, type MouseEvent } from 'react';

import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useWatch, type Control, type UseFormRegister } from 'react-hook-form';

import { userProfileImageQuery } from '@/store';

import { Avartar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import { AvartarEditDropdown, RegisterProps } from '@/features/user/components';

interface AvartarEditProps {
  control: Control<RegisterProps>;
  register: ReturnType<UseFormRegister<RegisterProps>>;
}

export const AvartarEdit = ({ control, register }: AvartarEditProps) => {
  const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const userProfileImage = useRecoilValue(userProfileImageQuery);
  const profileImage = useWatch({ control, name: 'profileImage' });

  useEffect(() => {
    if (!profileImage) return;

    const imageUrl = URL.createObjectURL(profileImage[0] as Blob);

    setImagePreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [profileImage]);

  function toggleDropdownMenu(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsOpenDropdownMenu(!isOpenDropdownMenu);
  }

  return (
    <StyledAvartarEdit>
      <button onClick={(e) => toggleDropdownMenu(e)}>
        <Avartar kind="circle" size="xl" src={imagePreview || userProfileImage} />
        <span className="icon-container">
          <Icon kind="circle" size="sm" element={<MdOutlineModeEditOutline />} />
        </span>
      </button>
      {isOpenDropdownMenu && (
        <AvartarEditDropdown register={register} toggleDropdownMenu={toggleDropdownMenu} />
      )}
    </StyledAvartarEdit>
  );
};

const StyledAvartarEdit = styled.div`
  position: relative;

  button {
    cursor: pointer;
    background: none;
    padding: 0;
    border: none;
  }

  .icon-container {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
