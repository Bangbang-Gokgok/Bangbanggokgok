import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import loginSchema from '../schema';

export const ProfileEditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitForm = () => {
    console.log('hi');
  };

  return (
    <FormWrapper onSubmit={handleSubmit(submitForm)}>
      <ul className="login-ul">
        <li className="login-li">
          <label className="login-label" htmlFor="email">
            사용자 이메일
          </label>
          <input className="login-input" type="text" id="email" {...register('email')} />
          <p className="login-error">{errors.email?.message}</p>
        </li>
        <li className="login-li">
          <label className="login-label" htmlFor="password">
            비밀번호
          </label>
          <input className="login-input" type="password" id="password" {...register('password')} />
          <p className="login-error">{errors.password?.message}</p>
        </li>
      </ul>
      <button className="login-button" type="submit">
        로그인
      </button>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;

  .login-ul {
    display: grid;
    row-gap: 1.5rem;
    margin: 0 0 4rem 0;
  }

  .login-li {
    display: flex;
    flex-direction: column;

    .login-input {
      font-size: 1.7rem;
      height: 4.5rem;
      border-width: 0.1rem;
      border-style: solid;
      border-radius: 0.5rem;
      margin-top: 0.2rem;
      padding: 0 0.8rem;

      :focus {
        outline: none;
        background: #e7e7fc;
      }
    }

    .login-error {
      margin-top: 0.32rem;
      color: #e75349;
    }
  }

  .login-button {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    color: white;
    font-size: 1.75rem;
    font-weight: bold;
    background-color: #49c5b6;
    padding: 1.5rem 1.25rem;
    transition: background-color 0.3s;

    :hover {
      background-color: #5eaca0;
    }
  }
`;
