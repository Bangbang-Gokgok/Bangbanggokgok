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

  if (kind === 'email' || kind === 'address') disabled = true;

  return (
    <StyledField>
      <label className="field-label" htmlFor={kind}>
        {labelName}
      </label>
      <input
        className="field-input"
        type={inputType}
        id="image"
        {...register}
        disabled={disabled}
      />
      {errorMessage && <p className="field-error">{errorMessage}</p>}
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

  .field-input {
    font-size: 1.7rem;
    height: 45px;
    border: 1.5px solid #dbe0df;
    margin-top: 5px;
    padding: 0 8px;
    text-overflow: ellipsis;
    transition: all 0.3s ease;

    :focus {
      outline: none;
      border-color: #d0e0e9;
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
`;
