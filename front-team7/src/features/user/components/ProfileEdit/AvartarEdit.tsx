import { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useWatch, type Control, type UseFormRegister } from 'react-hook-form';

import { userFieldQuery } from '@/store';

import { Avartar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import { RegisterProps } from '@/features/user/components';

interface AvartarEditProps {
  control: Control<RegisterProps>;
  register: ReturnType<UseFormRegister<RegisterProps>>;
}

export const AvartarEdit = ({ control, register }: AvartarEditProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const userProfileImage = useRecoilValue(userFieldQuery('profileImage'));
  const profileImage = useWatch({ control, name: 'profileImage' });
  console.log(profileImage);

  useEffect(() => {
    if (!profileImage || profileImage?.length === 0) return;

    const imageUrl = URL.createObjectURL(profileImage[0] as Blob);

    setImagePreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [profileImage]);

  return (
    <StyledAvartarEdit>
      <label className="img-upload-label" htmlFor="profile-image">
        <Avartar
          kind="circle"
          size="xl"
          src={imagePreview || (userProfileImage ? (userProfileImage[0] as string) : undefined)}
        />
        <span className="icon-container">
          <Icon kind="circle" size="sm" element={<MdOutlineModeEditOutline />} />
        </span>
      </label>
      <input className="img-upload-input" type="file" id="profile-image" {...register} />
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

  .img-upload-label {
    cursor: pointer;
  }

  .img-upload-input {
    display: none;
  }
`;
