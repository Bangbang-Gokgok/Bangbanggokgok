import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { UserInfo, IUserInfoProps } from '@/components/UserInfo';

export const FeedFolded = ({ name, image, title }: IUserInfoProps & { title: string }) => {
  return (
    <StyledFeedFolded>
      <span className="user-info-container">
        <UserInfo name={name} image={image} />
      </span>
      <span className="title-container">{title}</span>
      <span className="arrow-down">
        <MdOutlineKeyboardArrowDown />
      </span>
    </StyledFeedFolded>
  );
};

const StyledFeedFolded = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 50px;
  padding: 10px 10px;
  border: 1px solid rgba(0, 0, 0, 15%);
  border-radius: 5px;
  box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 25%);

  .user-info-container {
    width: 35%;
    word-break: break-all;
  }

  .title-container {
    width: 50%;
    font-size: 1.45rem;
    font-weight: bold;
    word-break: break-all;
  }

  .arrow-down {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 15%;
    font-size: 2.2rem;
  }
`;