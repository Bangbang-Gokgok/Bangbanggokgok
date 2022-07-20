import { FaMapMarkedAlt } from 'react-icons/fa';
import { UserInfo, UserInfoProps } from '@/components/UserInfo';
import { LocationProps } from '@/types/feed';
import {
  StyleNav,
  StyleEditIcon,
  StyleDeleteIcon,
  StyledFeedHeader,
} from '@/components/FeedHeader/StyleFeedHeader';

export const FeedHeader = ({
  onClickFeedModal,
  onClickEditFeedModal,
  onClickDeleteFeed,
  isFolded,
  isUser,
  name,
  image,
  title,
  feedUser,
  feedLocation,
}: UserInfoProps & { title: string } & { feedLocation?: LocationProps } & {
  feedUser?: string;
} & { isFolded: boolean } & { isUser: boolean } & { onClickFeedModal?: () => void } & {
  onClickEditFeedModal?: () => void;
} & { onClickDeleteFeed?: () => void }) => {
  return (
    <StyledFeedHeader isModal={isFolded}>
      <span className="user-info-container">
        <UserInfo name={name} image={image} />
      </span>
      <span className="title-container" onClick={onClickFeedModal}>
        {title}
      </span>
      {!isFolded ? (
        <StyleNav to={`/feedmap/${feedUser}?lat=${feedLocation?.lat}&lng=${feedLocation?.lng}`}>
          <FaMapMarkedAlt />
        </StyleNav>
      ) : (
        isUser && (
          <>
            <StyleEditIcon onClick={onClickEditFeedModal} />
            <StyleDeleteIcon onClick={onClickDeleteFeed} />
          </>
        )
      )}
    </StyledFeedHeader>
  );
};
