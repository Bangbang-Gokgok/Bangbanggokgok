import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { UserInfo, IUserInfoProps } from '@/components/UserInfo';

export const FeedFolded = ({ name, image, title }: IUserInfoProps & { title: string }) => {
  return (
    <StyledFeedFolded>
      <UserInfo name={name} image={image} />
      <span className="title">{title}</span>
      <span className="arrow-down">
        <MdOutlineKeyboardArrowDown />
      </span>
    </StyledFeedFolded>
  );
};

const StyledFeedFolded = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  padding: 10px 10px;
  border: 1px solid rgba(0, 0, 0, 15%);
  border-radius: 5px;
  box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 25%);

  .title {
    width: 33%;
    font-size: 1.4rem;
    font-weight: bold;
  }

  .arrow-down {
    font-size: 2.2rem;
  }
`;
