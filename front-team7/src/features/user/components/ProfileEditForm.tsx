import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDaumPostcodePopup } from 'react-daum-postcode';

import { Avartar } from '@/components/Avatar';
import { axios } from '@/lib';

import { currentUserQuery } from '@/store';
import { profileEditSchema } from '../schema';

export const ProfileEditForm = () => {
  // const [name, setName] = useState(null);
  // const [description, setDescription] = useState(null);
  // const [contactNumber, setContactNumber] = useState(null);
  // const [address, setAddress] = useState(null);
  // const [image, setImage] = useState(null);
  const currentUser = useRecoilValue(currentUserQuery);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: currentUser?.email,
      name: currentUser?.name,
      description: currentUser?.description,
      contactNumber: currentUser?.contactNumber,
      address: currentUser?.address,
    },
  });

  const submitForm = (data) => {
    const dummy = {
      ...data,
      image: data.image[0],
      location: {
        lat: 33.450936,
        lng: 126.569477,
      },
    };

    const fd = new FormData();
    console.log(
      dummy.image,
      dummy.name,
      dummy.description,
      dummy.contactNumber,
      dummy.address,
      dummy.location
    );
    fd.append('profileImage', dummy.image);
    fd.append('name', dummy.name);
    fd.append('description', dummy.description);
    fd.append('contactNumber', dummy.contactNumber);
    fd.append('address', dummy.address);
    fd.append('location', dummy.location);

    axios
      .put('/api/users/user', fd)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = (e) => {
    e.preventDefault();
    open({ onComplete: handleComplete });
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitForm)}>
      <ul className="login-ul">
        <li className="avartar-li">
          <div className="avartar-container">
            <Avartar size="xl" src={currentUser?.profileImage[0] as string} />
            <span className="edit-icon">
              <MdOutlineModeEditOutline />
            </span>
          </div>
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="image">
            임시 이미지 인풋
          </label>
          <input className="login-input" type="file" id="image" {...register('image')} />
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="email">
            이메일
          </label>
          <input className="login-input" type="text" id="email" {...register('email')} />
          {errors.email && <p className="login-error">{errors.email?.message}</p>}
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="name">
            이름
          </label>
          <input className="login-input" type="text" id="name" {...register('name')} />
          {errors.password && <p className="login-error">{errors.password?.message}</p>}
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="description">
            지도 소개말
          </label>
          <input
            className="login-input"
            type="text"
            id="description"
            {...register('description')}
          />
          {errors.password && <p className="login-error">{errors.password?.message}</p>}
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="contactNumber">
            연락처
          </label>
          <input
            className="login-input"
            type="text"
            id="contactNumber"
            {...register('contactNumber')}
          />
          {errors.password && <p className="login-error">{errors.password?.message}</p>}
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="address">
            주소
          </label>
          <input className="login-input" type="text" id="address" {...register('address')} />
          <button type="button" onClick={(e) => handleClick(e)}>
            우편주소 검색
          </button>
          {errors.password && <p className="login-error">{errors.password?.message}</p>}
        </li>
      </ul>

      <div>
        <button className="login-button" type="submit">
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

  .avartar-li {
    display: flex;
    justify-content: center;
    align-items: center;

    .avartar-container {
      position: relative;

      .edit-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        color: whitesmoke;
        height: 30px;
        width: 30px;
        background-color: #8d3030;
        border-radius: 50%;
        padding: 6px;
        transition: color 0.3s ease;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
      }
    }
  }

  .login-ul {
    padding: 0;
    height: 100%;
  }

  .login-label {
    font-size: 1.4rem;
  }

  ul {
    display: grid;
    gap: 10px;
    margin: 0;
  }

  li {
    list-style-type: none;
  }

  .login-li {
    display: flex;
    flex-direction: column;

    .login-input {
      font-size: 1.7rem;
      height: 38px;
      border: 1.5px solid #6a6a6a;
      border-radius: 0.5rem;
      margin-top: 0.2rem;
      padding: 0 8px;

      :focus {
        outline: none;
        background: #e7e7fc;
      }
    }

    .login-error {
      margin: 0;
      margin-top: 3px;
      color: #e75349;
      font-size: 1.3rem;
    }
  }

  .login-button {
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
