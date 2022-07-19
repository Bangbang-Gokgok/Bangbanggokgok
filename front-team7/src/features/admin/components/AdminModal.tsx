import styled from 'styled-components';

import { type AllUsers } from '@/api/users';

interface AdminModalProps {
  isOpen: boolean;
  userInfo: Partial<AllUsers>;
}

export const AdminModal = ({ isOpen, userInfo }: AdminModalProps) => {
  const { authority } = userInfo;
  console.log(userInfo);

  return (
    <StyledAdminModal isOpen={isOpen}>
      <select name="authority" id="authority">
        <option value="">{authority}</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
    </StyledAdminModal>
  );
};

const StyledAdminModal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  min-width: 200px;
  min-height: 200px;
  padding: 10px;
  background-color: white;
`;
