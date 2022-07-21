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
import { userState } from '@/store';
import { mapAtom } from '@/store/map';
import { currentFeedAtom } from '@/store/currentFeed';
import { FeedListProps, FeedProps, LocationProps } from '@/types/feed';
import { BsPlus } from 'react-icons/bs';
import styled from 'styled-components';
import { axios } from '@/lib';
import * as FeedApi from '@/api/feeds';
import io from 'socket.io-client';
import { FromInputs } from '@/types/form';

enum ModalState {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  FEED = 'FEED',
}

const socket = io.connect('http://localhost:5030/', {
  autoConnect: true,
  transports: ['websocket'],
});


const FeedMapPage = () => {
  const { userId } = useParams();
  const [feedList, setFeedList] = useState<FeedListProps>([]);
  const [stateModal, setStateModal] = useState(false);
  const [modalChildrenState, setModalChildrenState] = useState('');
  const currentUser = useRecoilValue(userState);
  const [currentFeedState, setCurrentFeedState] = useRecoilState(currentFeedAtom);
  const [_mapValue, setMapValue] = useRecoilState(mapAtom);

  const feedIdQueryString = queryString.parse(window.location.search);

  useEffect(() => {

    getFeedList();

    socket.on('likeResponse', (users: Object) => {
      setCurrentFeedState((prev) => ({
        ...prev,
        likes: users,
      }));
    });

    return (() => {
      socket.close();
    });
  }, []);

  async function getFeedList() {
    try {
      const result = await axios.get<never, FeedListProps>(`/api/feeds/list/${userId}`);
      setFeedList(result);

      if (result.length > 0) {
        initializeMapCenterLatLng(result[0]);
      }
    } catch (err) {
      window.location.reload();
      console.log(err);
    }
  }

  const initializeMapCenterLatLng = (result: FeedProps) => {
    let lat = 0;
    let lng = 0;

    if (Object.keys(feedIdQueryString).length > 0) {
      lat = Number(feedIdQueryString.lat);
      lng = Number(feedIdQueryString.lng);
    } else {
      lat = result.location.lat;
      lng = result.location.lng;
    }

    setMapValue((currMapValue) => ({
      ...currMapValue,
      centerLatLng: {
        lat,
        lng
      },
    }));
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

  const handleFeedLike = (currentFeedList: FeedProps) => {
    socket.emit('likeRequest', currentUser?.id, currentFeedList._id);
  };

  const switchModalChildrenState = (modalChildrenState: string) => {
    switch (modalChildrenState) {
      case ModalState.CREATE:
        return <Form submitForm={submitForm} isEdit={false} />;
      case ModalState.EDIT:
        return <Form submitForm={editSubmitForm} isEdit={true} />;
      case ModalState.FEED:
        return (
          <FeedDetail
            currentUserId={currentUser?.id as string}
            isModal={true}
            feedList={currentFeedState}
            handleFeedLike={() => handleFeedLike(currentFeedState)}
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

  // Feed CREATE
  const submitForm = async (data: FromInputs) => {
    if (!confirm('피드를 생성하시겠습니까?')) return;

    const { title, description, image, address, lat, lng } = data;

    const userName = currentUser?.name || 'undefined';

    const dummy = {
      userName,
      title,
      description,
      address: address,
      location: {
        lat: lat,
        lng: lng,
      },
    };

    const fd = new FormData();

    fd.append('userName', dummy.userName);
    fd.append('title', dummy.title);
    fd.append('description', dummy.description);
    fd.append('address', dummy.address);
    fd.append('location', JSON.stringify(dummy.location));

    for (let i = 0; i < image.length; i++) {
      fd.append('imageUrl', image[i]);
    }

    try {
      const result = await FeedApi.createOneFeed(fd);
      setFeedList((prev: any) => (
        [
          result,
          ...prev
        ]
      ));
      alert('피드가 생성되었습니다.');
      toggleModal();
      changeCenterLatLng(result.location);
    } catch (err) {
      alert('Error 발생. console 확인');
      console.log(err);
    }
  };

  const editSubmitForm = async (data: FromInputs) => {
    if (!confirm('피드를 수정하시겠습니까?')) return;

    const { title, description, image, address, lat, lng } = data;

    const userName = currentUser?.name || 'undefined';
    const userId = currentUser?.id || 'null';

    const dummy = {
      userName,
      userId,
      title,
      description,
      address: address,
      location: {
        lat: lat,
        lng: lng,
      },
    };

    const fd = new FormData();

    fd.append('userName', dummy.userName);
    fd.append('title', dummy.title);
    fd.append('userId', dummy.userId);
    fd.append('description', dummy.description);
    fd.append('address', dummy.address);
    fd.append('location', JSON.stringify(dummy.location));

    for (let i = 0; i < image.length; i++) {
      fd.append('imageUrl', image[i]);
    }

    try {
      const result = await FeedApi.updateOneFeed(currentFeedState._id, fd);
      setFeedList((prev: any) => {
        const newFeedList = [...prev];
        const index = newFeedList.findIndex(item => currentFeedState._id === item._id);
        newFeedList[index] = result;
        return newFeedList;
      });
      alert('피드가 수정되었습니다.');
      toggleModal();
      changeCenterLatLng(result.location);
    } catch (err) {
      alert('Error 발생. console 확인');
      console.log(err);
    }

    // revokePreviewUrl();
  };

  const onClickDeleteFeed = async (feedId: string, feedUserId: string) => {
    if (!window.confirm('피드를 정말로 삭제하시겠습니까 ?')) return;

    try {
      await axios.delete(`/api/feeds/${feedId}`, {
        data: {
          userId: feedUserId,
        },
      });
      setFeedList((prev: any) => {
        const newFeedList = [...prev];
        const index = newFeedList.findIndex(item => feedId === item._id);
        newFeedList.splice(index, 1);
        return newFeedList;
      });
      alert('피드가 삭제되었습니다.');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Main>
      <StyledWrapper>
        <Map feedList={feedList} toggleModal={onClickMapFeed}></Map>
        {currentUser?.id === userId && (
          <Button onClick={onClickModal} feedLength={feedList.length}>
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
              isUser={currentUser?.id === userId}
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

const Button = styled.button<{ feedLength: number; }>`
  position: absolute;
  z-index: 4;
  bottom: ${(props) => props.feedLength >= 3 ? '170px' : `${props.feedLength * 60 + 20}px`};
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
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
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
