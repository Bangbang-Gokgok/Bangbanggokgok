import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { FaMapMarkedAlt } from 'react-icons/fa';
import { UserInfo, UserInfoProps } from '@/components/UserInfo';

export const FeedHeader = ({
  onClickHandler,
  isFolded,
  name,
  image,
  title,
}: UserInfoProps & { title: string; } & { isFolded: boolean; } & { onClickHandler?: (event: any) => void; }) => {
  return (
    <StyledFeedHeader onClick={onClickHandler} isModal={isFolded}>
      <span className="user-info-container">
        <UserInfo name={name} image={image} />
      </span>
      <span className="title-container">{title}</span>
      {!isFolded && (
        <span
          className="arrow-down"
          onClick={() => {
            console.log('지도 icon 클릭됨!');
          }}
        >
          <FaMapMarkedAlt />
        </span>
      )}
    </StyledFeedHeader>
  );
};

const StyledFeedHeader = styled.div<{ isModal: boolean; }>`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 60px;
  padding: 20px 10px;
  border : 1px solid rgba(0, 0, 0, 15%);
  
  ${(props) => props.isModal ? 'border-radius: 10px;' : 'border-radius: 10px 10px 0 0;'}
  box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 25%);
  background-color: white;
  ${(props) => props.isModal && 'cursor: pointer;'}
  .user-info-container {
    width: 35%;
    word-break: break-all;
  }

  .title-container {
    width: 60%;
    font-size: 1.45rem;
    font-weight: 500;
    word-break: break-all;
  }

  .arrow-down {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 10%;
    font-size: 2.2rem;
  }

  /* @media only screen and (min-width: 768px) {
    min-height: 70px;
  }

  @media only screen and (min-width: 1024px) {
    min-height: 80px;
  } */
  
`;
