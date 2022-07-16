import { type MouseEvent } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { axios } from '@/lib';
import { currentUserQuery } from '@/store';
import { useDaumAddress, getLocation } from '@/features/user/api';
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
  const refreshCurrentUser = useRecoilRefresher_UNSTABLE(currentUserQuery);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegisterProps>({
    mode: 'onChange',
    defaultValues: {
      profileImage: undefined,
      email: currentUser?.email,
      name: currentUser?.name,
      description: currentUser?.description,
      contactNumber: currentUser?.contactNumber,
      address: currentUser?.address,
    },
  });

  const address = useWatch({ control, name: 'address' });

  const openDaumAddress = useDaumAddress((addressValue: string) =>
    setValue('address', addressValue)
  );

  async function onAddressPopUpHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await openDaumAddress();
  }

  function onAdressDeleteHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setValue('address', '');
  }

  async function submitProfileEditForm(data: RegisterProps) {
    const profileImage = data.profileImage && (data.profileImage[0] as File);
    const location = await getLocation(data.address!);

    delete data.profileImage;

    console.log(data);

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) formData.append(key, value as string | Blob);
    formData.append('location', JSON.stringify(location));
    if (profileImage) formData.append('profileImage', profileImage);

    const user = await axios.put('/api/users/user', formData);
    console.log(user);

    refreshCurrentUser();

    navigate('/profile');
  }

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
              <div className="address-btn-container">
                <button
                  className="address-find-btn"
                  type="button"
                  onClick={(e) => onAddressPopUpHandler(e)}
                >
                  주소 찾기
                </button>
                {address && (
                  <button
                    className="address-delete-btn"
                    type="button"
                    onClick={(e) => onAdressDeleteHandler(e)}
                  >
                    주소 삭제
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="profile-btn-container">
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

  .address-btn-container {
    margin-top: 10px;

    button {
      margin-right: 7px;
      border: none;
      border-radius: 3px;
      padding: 6px 12px;
      color: whitesmoke;
    }

    .address-find-btn {
      background-color: #5050bd;
    }

    .address-delete-btn {
      background-color: #c54d4d;
    }
  }

  .profile-btn-container {
    display: flex;
    justify-content: center;

    .profile-edit-btn {
      font-size: 1.6rem;
      cursor: pointer;
      min-width: 132px;
      color: #343434;
      font-size: 1.6rem;
      font-weight: bold;
      border-radius: 3px;
      background-color: #ddcb51;
      padding: 10px 16px;
      transition: background-color 0.3s;
      border: none;

      :hover {
        background-color: #e9d767;
      }
    }
  }
`;
