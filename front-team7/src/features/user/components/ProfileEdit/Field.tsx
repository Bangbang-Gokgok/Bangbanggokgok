import styled from 'styled-components';
import { type UseFormRegister } from 'react-hook-form';

export interface RegisterProps {
  profileImage?: FileList;
  email?: string;
  name?: string;
  description?: string;
  contactNumber?: string;
  address?: string;
}

export type kindType = keyof RegisterProps;

export interface FieldProps {
  kind: kindType;
  labelName: string;
  inputType: string;
  register: ReturnType<UseFormRegister<RegisterProps>>;
  errorMessage?: string;
}

export const Field = ({ kind, labelName, inputType, register, errorMessage }: FieldProps) => {
  let disabled = false;
  let isOptionField = false;

  if (kind === 'email' || kind === 'address') disabled = true;
  if (kind === 'description' || kind === 'contactNumber' || kind === 'address')
    isOptionField = true;

  return (
    <StyledField>
      <label className="field-label" htmlFor={kind}>
        {labelName}
        <span className="option">
          {' '}
          {isOptionField && '(추가 정보)'}
          {kind === 'contactNumber' && ` [ "-"는 제외하고 입력해주세요. ]`}
        </span>
      </label>
      {kind !== 'description' && (
        <input
          className="field-input"
          type={inputType}
          id={kind}
          {...register}
          disabled={disabled}
        />
      )}
      {kind === 'description' && (
        <textarea className="field-textarea" id={kind} {...register}></textarea>
      )}
      {errorMessage && <p className="field-error">* {errorMessage}</p>}
    </StyledField>
  );
};

const StyledField = styled.div`
  display: flex;
  flex-direction: column;

  .field-label {
    color: #484848;
    font-size: 1.5rem;
  }

  .field-textarea {
    font-size: 1.5rem;
    font-family: 'Roboto', 'Noto Sans KR', arial, sans-serif;
    height: 80px;
    border: 1.5px solid #dbe0df;
    margin-top: 5px;
    padding: 6px 8px;
    text-overflow: ellipsis;
    transition: all 0.3s ease;

    :focus {
      outline: none;
      background-color: #f2f2fc;
    }
  }

  .field-input {
    font-size: 1.6rem;
    height: 45px;
    border: 1.5px solid #dbe0df;
    margin-top: 5px;
    padding: 0 8px;
    text-overflow: ellipsis;
    transition: all 0.3s ease;

    :focus {
      outline: none;
      background-color: #f2f2fc;
    }

    :disabled {
      background-color: #e8e8e8;
    }
  }

  .field-error {
    margin: 0;
    margin-top: 3px;
    color: #e75349;
    font-size: 1.3rem;
  }

  .option {
    color: #b5b5b5;
    font-size: 1.2rem;
  }
`;
