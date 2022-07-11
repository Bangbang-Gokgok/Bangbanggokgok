import styled from 'styled-components';
import { Main } from '@/components/Layout';
import { UserInfo } from '@/components/UserInfo';
import Input from '@/components/Input/Input';
import unknownUser from '@/assets/images/unknown-user.png';

const StyledSearchContainer = styled.div`
  width: 330px;
  // background: lightgray;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-itmes: center;
  padding: 40px 10px;
  gap: 35px;
`;

const SearchPage = () => {
  let name = '김지환';
  return (
    <Main
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <StyledSearchContainer>
        <Input></Input>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
      </StyledSearchContainer>
    </Main>
  );
};

export default SearchPage;
