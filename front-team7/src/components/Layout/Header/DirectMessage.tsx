import styled from 'styled-components';
import { BiMessageAltDetail } from 'react-icons/bi';

export const DirectMessage = () => {
  return (
    <StyledDM>
      <BiMessageAltDetail />
    </StyledDM>
  );
};

const StyledDM = styled.button`
  font-size: 3rem;
  font-weight: bold;
  color: whitesmoke;
  background-color: #246e72;
  padding: 3px 6px;
  border: none;
  border-radius: 3px;
`;
