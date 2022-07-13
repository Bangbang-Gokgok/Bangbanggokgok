import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MdOutlineModeEditOutline } from 'react-icons/md';

import { Avartar } from '@/components/Avatar';

import { currentUserQuery } from '@/store';
import { profileEditSchema } from '../schema';

export const ProfileEditForm = () => {
  const currentUser = useRecoilValue(currentUserQuery);
  const { profileImage, email, name, description, contactNumber, address } = currentUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileEditSchema),
  });

  const submitForm = () => {
    console.log('hi');
  };

  return (
    <StyledForm onSubmit={handleSubmit(submitForm)}>
      <ul className="login-ul">
        <li className="avartar-li">
          <div className="avartar-container">
            <Avartar size="xl" />
            <span className="edit-icon">
              <MdOutlineModeEditOutline />
            </span>
          </div>
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="email">
            이메일
          </label>
          <input
            className="login-input"
            type="text"
            id="email"
            value={email}
            {...register('email')}
          />
          {errors.email && <p className="login-error">{errors.email?.message}</p>}
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="username">
            이름
          </label>
          <input
            className="login-input"
            type="text"
            id="username"
            value={name}
            {...register('username')}
          />
          {errors.password && <p className="login-error">{errors.password?.message}</p>}
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="map-description">
            지도 소개말
          </label>
          <input
            className="login-input"
            type="text"
            id="map-description"
            {...register('map-description')}
          />
          {errors.password && <p className="login-error">{errors.password?.message}</p>}
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="contact-number">
            연락처
          </label>
          <input
            className="login-input"
            type="text"
            id="contact-number"
            {...register('contact-number')}
          />
          {errors.password && <p className="login-error">{errors.password?.message}</p>}
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="address">
            주소
          </label>
          <input className="login-input" type="text" id="address" {...register('address')} />
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
