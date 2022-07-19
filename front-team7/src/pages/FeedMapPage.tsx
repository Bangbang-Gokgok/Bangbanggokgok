import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import { FeedHeader } from '@/components/FeedHeader';
import { Main } from '@/components/Layout';
import Map from '@/components/Map/Map';
import ModalFrame from '@/components/Layout/ModalFrame/ModalFrame';
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import Form from '@/components/Form/Form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userFieldQuery } from '@/store';
import { mapAtom } from '@/store/map';
import { currentFeedAtom } from '@/store/currentFeed';
import { FeedListProps, FeedProps, LocationProps } from '@/types/feed';
import { BsPlus } from 'react-icons/bs';
import styled from 'styled-components';
import { axios } from '@/lib';

enum ModalState {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  FEED = 'FEED',
}

const FeedMapPage = () => {
  const { userId } = useParams();
  const [feedList, setFeedList] = useState<FeedListProps>([]);
  const [stateModal, setStateModal] = useState(false);
  const [modalChildrenState, setModalChildrenState] = useState('');
  const userIdAtom = useRecoilValue(userFieldQuery('id'));
  const [currentFeedState, setCurrentFeedState] = useRecoilState(currentFeedAtom);
  const [_mapValue, setMapValue] = useRecoilState(mapAtom);

  const feedIdQueryString = queryString.parse(window.location.search);

  useEffect(() => {
    async function getFeedList() {
      try {
        const result = await axios.get<never, FeedListProps>(`/api/feeds/list/${userId}`);
        setFeedList(result);
        if (result.length > 0) {
          initializeMapCenterLatLng(result[0]);
        }
      } catch (err) {
        // alert(err);
        // window.location.reload();
        console.log(err);
      }
    }
    getFeedList();
  }, []);

  const initializeMapCenterLatLng = (result: FeedProps) => {
    if (Object.keys(feedIdQueryString).length > 0) {
      setMapValue((currMapValue) => ({
        ...currMapValue,
        centerLatLng: {
          lat: Number(feedIdQueryString.lat),
          lng: Number(feedIdQueryString.lng),
        },
      }));
    } else {
      setMapValue((currMapValue) => ({
        ...currMapValue,
        centerLatLng: {
          lat: result.location.lat,
          lng: result.location.lng,
        },
      }));
    }
  };

  const onClickModal = () => {
    setModalChildrenState(ModalState.CREATE);
    toggleModal();
  };

  const onClickMapFeed = (item: FeedProps) => {
    changeCenterLatLng(item.location);
    setCurrentFeedState((prev) => ({
      ...prev,
      ...item,
    }));
    setModalChildrenState(ModalState.FEED);
    toggleModal();
  };

  const changeCenterLatLng = (newCenterLatLng: LocationProps) => {
    setMapValue((currMapValue) => ({
      ...currMapValue,
      centerLatLng: {
        lat: newCenterLatLng.lat,
        lng: newCenterLatLng.lng,
      },
      mapLevel: 1,
    }));
  };

  const toggleModal = () => {
    setStateModal((prev) => !prev);
  };

  const switchModalChildrenState = (modalChildrenState: string) => {
    switch (modalChildrenState) {
      case ModalState.CREATE:
        return <Form isEdit={false} />;
      case ModalState.EDIT:
        return <Form isEdit={true} />;
      case ModalState.FEED:
        return (
          <FeedDetail
            currentUserId={userIdAtom as string}
            isModal={true}
            feedList={currentFeedState}
          />
        );
    }
  };

  const onClickEditFeedModal = (item: FeedProps) => {
    setCurrentFeedState((prev) => ({
      ...prev,
      ...item,
    }));
    setModalChildrenState(ModalState.EDIT);
    toggleModal();
  };

  const onClickDeleteFeed = async (feedId: string, feedUserId: string) => {
    if (!window.confirm('피드를 정말로 삭제하시겠습니까 ?')) return;

    try {
      await axios.delete(`/api/feeds/${feedId}`, {
        data: {
          userId: feedUserId,
        },
      });
      alert('피드가 삭제되었습니다.');
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Main>
      <StyledWrapper>
        <Map feedList={feedList} toggleModal={onClickMapFeed}></Map>
        {userIdAtom === userId && (
          <Button onClick={onClickModal}>
            <BsPlus />
          </Button>
        )}
        <StyledFeeds>
          {feedList?.map((item, idx) => (
            <FeedHeader
              onClickFeedModal={() => onClickMapFeed(item)}
              onClickEditFeedModal={() => onClickEditFeedModal(item)}
              onClickDeleteFeed={() => onClickDeleteFeed(item._id, item.userId)}
              isFolded={true}
              isUser={userIdAtom === userId}
              key={idx}
              name={item.userName}
              title={item.title}
            />
          ))}
        </StyledFeeds>
      </StyledWrapper>
      <ModalFrame handleModal={toggleModal} state={stateModal}>
        {switchModalChildrenState(modalChildrenState)}
      </ModalFrame>
    </Main>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: absolute;
  z-index: 4;
  bottom: 160px;
  right: 5%;
  font-size: 4.5rem;
  width: 56px;
  height: 56px;
  border: none;
  background-color: #00cec9;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    bottom: 5%;
    width: 70px;
    height: 70px;
    font-size: 7rem;
  }

  @media only screen and (min-width: 1024px) {
    bottom: 5%;
    width: 80px;
    height: 80px;
    font-size: 8rem;
  }
`;

const StyledFeeds = styled.div`
  position: absolute;
  max-height: 160px;
  width: 90%;
  z-index: 3;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 5px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media only screen and (min-width: 768px) {
    width: 350px;
    height: 100%;
    max-height: 68%;
    right: 2%;
    top: 2%;
  }

  @media only screen and (min-width: 1024px) {
    width: 400px;
  }
`;

export default FeedMapPage;
