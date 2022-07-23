import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { getReviewsByFeedID } from '@/api/review';
import { type ReviewListProps } from '@/types/feed';

import { feedKindState, FEED_KIND_HOME, FEED_KIND_PROFILE, type FeedsResponse } from '@/store';

import { UserInfo } from '@/components/UserInfo';

const FeedHome = ({ feed }: { feed: Partial<FeedsResponse> }) => {
  const [reviewList, setReviewList] = useState<ReviewListProps>([]);

  const profileImage = feed?.profileImageUrl ? feed?.profileImageUrl[0] : undefined;

  useEffect(() => {
    async function get() {
      const reviews = await getReviewsByFeedID(feed._id);
      return reviews;
    }
    get()
      .then((reviews) => setReviewList(reviews))
      .catch((e) => console.log(e));
  }, []);

  return (
    <StyledFeedHome>
      <hr />
      <div className="sub-info-container">
        <div className="user-info-container">
          <UserInfo
            userId={feed.userId as string}
            name={feed.userName as string}
            image={profileImage}
          />
        </div>
        <div className="sub-info">
          <span>
            <AiOutlineComment size="2rem" />
          </span>
          <span className="number">{reviewList.length}</span>
          <span className="line"> </span>
          <span>
            <AiFillHeart size="1.8rem" />
          </span>
          <span className="number">{Object.keys(feed.likes).length}</span>
        </div>
      </div>
    </StyledFeedHome>
  );
};

export const FeedBottom = ({ feed }: { feed: Partial<FeedsResponse> }) => {
  const feedKind = useRecoilValue(feedKindState);
  return (
    <StyledFeedBottom>{feedKind === FEED_KIND_HOME && <FeedHome feed={feed} />}</StyledFeedBottom>
  );
};

const StyledFeedBottom = styled.div``;

const StyledFeedHome = styled.div`
  hr {
    border: 1px solid #dfdfdf;
  }

  .sub-info-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-info-container {
      max-width: 150px;
      word-break: break-all;
    }

    .sub-info {
      display: flex;
      align-items: center;
      gap: 2px;
      margin-right: 3px;

      .line {
        font-size: 1.6rem;
      }

      .number {
        align-self: flex-end;
        font-size: 1.2rem;
      }
    }
  }
`;
