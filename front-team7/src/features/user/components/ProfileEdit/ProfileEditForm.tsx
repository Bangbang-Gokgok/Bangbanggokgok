import { useEffect } from 'react';
import { type MouseEvent } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { axios } from '@/lib';
import { currentUserQuery } from '@/store';
import { useDaumAddress, useKakaoGeocoder } from '@/features/user/api';
import { profileEditSchema } from '@/features/user/schemas';

import { AvartarEdit, Field, type kindType, type RegisterProps } from '@/features/user/components';

const FIELD_DATA: { kind: kindType; labelName: string; inputType: string }[] = [
  { kind: 'email', labelName: '이메일', inputType: 'text' },
  { kind: 'name', labelName: '이름', inputType: 'text' },
  { kind: 'description', labelName: '지도 소개말', inputType: 'text' },
  { kind: 'contactNumber', labelName: '연락처', inputType: 'text' },
  { kind: 'address', labelName: '주소', inputType: 'text' },
];

export const ProfileEditForm = () => {
  const currentUser = useRecoilValue(currentUserQuery);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profileImage: undefined,
      email: currentUser?.email,
      name: currentUser?.name,
      description: currentUser?.description,
      contactNumber: currentUser?.contactNumber,
      address: currentUser?.address,
    },
  });

  const openDaumAddress = useDaumAddress((addressValue: string) =>
    setValue('address', addressValue)
  );

  const getLocation = useKakaoGeocoder();

  const onAddressPopUpHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await openDaumAddress();
  };

  const submitProfileEditForm: SubmitHandler<RegisterProps> = async (data) => {
    const newProfileImage = data.profileImage ? data.profileImage[0] : undefined;
    const newData = { ...data, profileImage: newProfileImage };

    if (!newData.profileImage) delete newData.profileImage;

    console.log(newData);

    const location = await getLocation(newData.address);

    const formData = new FormData();

    for (const [key, value] of Object.entries(newData)) formData.append(key, value);
    formData.append('location', JSON.stringify(location));

    const user = await axios.put('/api/users/user', formData);
    console.log(user);

    // navigate('/profile');
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitProfileEditForm)}>
      <ul className="profile-edit-ul">
        <li className="avartar-li">
          <AvartarEdit control={control} register={register('profileImage')} />
        </li>
        {FIELD_DATA.map((field) => (
          <li key={field.kind} className="login-li">
            <Field
              kind={field.kind}
              labelName={field.labelName}
              inputType={field.inputType}
              register={register(field.kind)}
              errorMessage={errors[field.kind]?.message}
            />
            {field.kind === 'address' && (
              <button
                className="address-button"
                type="button"
                onClick={(e) => onAddressPopUpHandler(e)}
              >
                주소 찾기
              </button>
            )}
          </li>
        ))}
      </ul>

      <div>
        <button className="profile-edit-btn" type="submit">
          수정하기
        </button>
      </div>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
  min-height: 100%;
  padding: 20px 30px;
  overflow-y: auto;
  background-color: whitesmoke;

  li {
    list-style-type: none;
  }

  .avartar-li {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-edit-ul {
    display: grid;
    gap: 10px;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .address-button {
  }

  .profile-edit-btn {
    width: 100%;
    cursor: pointer;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    color: #343434;
    background-color: #ddcb51;
    padding: 8px 15px;
    transition: background-color 0.3s;
    border: none;

    :hover {
      background-color: #e9d767;
    }
  }
`;
