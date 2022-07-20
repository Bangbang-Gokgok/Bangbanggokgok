import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store';
import { currentFeedAtom } from '@/store/currentFeed';
import { useForm } from 'react-hook-form';
import { formSchema } from './schemas/Form-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { TbRoad } from 'react-icons/tb';
import { MdShareLocation } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { FcAddImage, FcSearch } from 'react-icons/fc';
import * as FeedApi from '@/api/feeds';
// import * as SC from '@/components/Form/StyleForm';
import {
  StyledInputError,
  StyledSubmitButton,
  StyledSubmitButtonWrapper,
  StyledInputAddress,
  StyledSearchInfoData,
  StyledAddressName,
  StyledFiExternalLink,
  StyledSearchInfoTitle,
  StyledSearchInfoHeader,
  StyledSearchData,
  StyledSearchContainer,
  StyledSearchResultContainer,
  StyledButtonSearchAddress,
  StyledInputSearchAddress,
  StyledSearchAddress,
  StyledPreviewDeleteButton,
  StyledPreviewImgSrc,
  StyledPreviewImg,
  StyledPreviewImgWrapper,
  StyledInputImg,
  StyledImgLabel,
  StyledInputText,
  StyledInputTitle,
  StyledField,
  StyledImgInputContainer,
  StyledInputContainer,
  StyledTitleSpan,
  StyledTitle,
  StyledFormContainer,
  StyledModalForm,
} from '@/components/Form/StyleForm';
interface PlaceProps {
  address_name: 'string';
  category_group_code: 'string';
  category_group_name: 'string';
  category_name: 'string';
  distance: 'string';
  id: 'string';
  phone: 'string';
  place_name: 'string';
  place_url: 'string';
  road_address_name: 'string';
  x: number;
  y: number;
}

interface FromInputs {
  title: string;
  description: string;
  image: FileList;
  searching: string;
  address: string;
  lat: number;
  lng: number;
}

type PlaceListProps = Array<PlaceProps>;

const Form = ({ isEdit }: { isEdit: boolean }) => {
  const currentUser = useRecoilValue(userState);
  const currentFeedState = useRecoilValue(currentFeedAtom);
  const [searchState, setSearchState] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [placeInfoList, setPlaceInfoList] = useState<PlaceListProps>([]);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FromInputs>({
    resolver: yupResolver(formSchema),
  });
  const imageData = watch('image');

  useEffect(() => {
    if (isEdit) {
      setValue('address', currentFeedState.address);
      setValue('lat', currentFeedState.location.lat);
      setValue('lng', currentFeedState.location.lng);
      if (currentFeedState.imageUrl.length > 0) {
        setPreviewImages(currentFeedState.imageUrl);
      }
    }
  }, []);

  const searchPlace = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const searching = watch().searching.trim();
    if (searching.length <= 0) return;
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searching}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_SEARCH_REST_API_KEY}`,
      },
    });

    const places: PlaceListProps = res.data.documents;

    setPlaceInfoList(places);
    setSearchState(true);
  };

  const revokePreviewUrl = () => {
    previewImages.forEach((url) => {
      URL.revokeObjectURL(url);
    });
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
      await FeedApi.createOneFeed(fd);
      alert('성공적으로 추가되었습니다.');
      window.location.reload();
    } catch (err) {
      alert('Error 발생. console 확인');
      console.log(err);
    }
    reset();
    revokePreviewUrl();
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
      await FeedApi.updateOneFeed(currentFeedState._id, fd);
      alert('피드가 수정되었습니다.');
      window.location.reload();
    } catch (err) {
      alert('Error 발생. console 확인');
      console.log(err);
    }

    reset();
    revokePreviewUrl();
  };

  const handleAddressState = (address: string, lat: number, lng: number) => {
    setValue('address', address);
    setValue('lat', lat);
    setValue('lng', lng);
    setSearchState(false);
  };

  const handleAddPreviewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const imageList: FileList = e.target.files;
    let previewUrlList: string[] = [...previewImages];

    for (let idx = 0; idx < imageList.length; idx++) {
      const currentImageUrl = URL.createObjectURL(imageList[idx]);
      previewUrlList.push(currentImageUrl);
    }

    if (previewUrlList.length > 5) {
      previewUrlList = previewUrlList.slice(0, 5);
    }

    setPreviewImages(previewUrlList);
  };

  const handleDeletePreviewImage = (e: any, id: number) => {
    e.preventDefault();

    const dataTranster = new DataTransfer();

    Array.from(imageData)
      .filter((_, index) => index !== id)
      .forEach((item: File) => {
        dataTranster.items.add(item);
      });

    setValue('image', dataTranster.files);

    setPreviewImages(previewImages.filter((_, index) => index !== id));
  };

  return (
    <StyledModalForm>
      <form onSubmit={isEdit ? handleSubmit(editSubmitForm) : handleSubmit(submitForm)}>
        <StyledFormContainer>
          <StyledTitle>
            <StyledTitleSpan>{isEdit ? '내 피드 수정하기' : '새로운 피드 만들기'}</StyledTitleSpan>
          </StyledTitle>

          <StyledInputContainer>
            <StyledField>제목</StyledField>
            <StyledInputTitle
              defaultValue={isEdit ? currentFeedState.title : ''}
              {...register('title')}
            />
            <StyledInputError>{errors.title?.message}</StyledInputError>
          </StyledInputContainer>

          <StyledInputContainer>
            <StyledField>설명</StyledField>
            <StyledInputText
              defaultValue={isEdit ? currentFeedState.description : ''}
              {...register('description')}
            />
            <StyledInputError>{errors.description?.message}</StyledInputError>
          </StyledInputContainer>
          <StyledImgInputContainer>
            <StyledField>사진</StyledField>
            <StyledImgLabel>
              <FcAddImage />
            </StyledImgLabel>
            <StyledInputImg
              {...register('image', {
                onChange: (e) => handleAddPreviewImages(e),
              })}
            />
          </StyledImgInputContainer>
          {previewImages.length > 0 && (
            <StyledPreviewImgWrapper>
              {previewImages.map((image, id) => (
                <StyledPreviewImg key={id}>
                  <StyledPreviewImgSrc src={image} alt={`${image}-${id}`} />
                  <StyledPreviewDeleteButton
                    type="button"
                    value="x"
                    onClick={(e) => handleDeletePreviewImage(e, id)}
                  />
                </StyledPreviewImg>
              ))}
            </StyledPreviewImgWrapper>
          )}
          <StyledInputContainer>
            <StyledField>장소</StyledField>
            <StyledSearchAddress>
              <StyledInputSearchAddress {...register('searching')} />
              <StyledButtonSearchAddress
                onClick={(e) => {
                  searchPlace(e);
                }}
              >
                <FcSearch />
              </StyledButtonSearchAddress>
            </StyledSearchAddress>
            <StyledInputError>{errors.address?.message}</StyledInputError>
          </StyledInputContainer>
          <StyledSearchResultContainer>
            {searchState && (
              <StyledSearchContainer>
                {placeInfoList?.map((place, index) => (
                  <StyledSearchData
                    key={`${index}-${place.x}-${place.y}`}
                    onClick={() =>
                      handleAddressState(place.address_name, Number(place.y), Number(place.x))
                    }
                  >
                    <StyledFiExternalLink href={place.place_url}>
                      <FiExternalLink />
                    </StyledFiExternalLink>
                    <StyledSearchInfoHeader>
                      <StyledSearchInfoTitle>{place.place_name}</StyledSearchInfoTitle>
                    </StyledSearchInfoHeader>
                    {place.road_address_name && (
                      <StyledSearchInfoData>
                        <TbRoad />
                        <StyledAddressName>{place.road_address_name}</StyledAddressName>
                      </StyledSearchInfoData>
                    )}
                    <StyledSearchInfoData>
                      <MdShareLocation />
                      <StyledAddressName>{place.address_name}</StyledAddressName>
                    </StyledSearchInfoData>
                  </StyledSearchData>
                ))}
              </StyledSearchContainer>
            )}
          </StyledSearchResultContainer>
          <StyledInputContainer>
            <StyledField>주소</StyledField>
            <StyledInputAddress {...register('address')} disabled />
            <StyledInputError>{errors.address?.message}</StyledInputError>
          </StyledInputContainer>
          <input type="hidden" {...register('lat')} />
          <input type="hidden" {...register('lng')} />
          <StyledSubmitButtonWrapper>
            {isEdit ? (
              <StyledSubmitButton name="edit" type="submit">
                수정
              </StyledSubmitButton>
            ) : (
              <StyledSubmitButton name="add" type="submit">
                추가
              </StyledSubmitButton>
            )}
          </StyledSubmitButtonWrapper>
        </StyledFormContainer>
      </form>
    </StyledModalForm>
  );
};

export default Form;

{
  /* <SC.StyledModalForm>
<form onSubmit={isEdit ? handleSubmit(editSubmitForm) : handleSubmit(submitForm)}>
  <SC.StyledFormContainer>
    <SC.StyledTitle>
      <SC.StyledTitleSpan>
        {isEdit ? '내 피드 수정하기' : '새로운 피드 만들기'}
      </SC.StyledTitleSpan>
    </SC.StyledTitle>

    <SC.StyledInputContainer>
      <SC.StyledField>제목</SC.StyledField>
      <SC.StyledInputTitle
        defaultValue={isEdit ? currentFeedState.title : ''}
        {...register('title')}
      />
      <SC.StyledInputError>{errors.title?.message}</SC.StyledInputError>
    </SC.StyledInputContainer>

    <SC.StyledInputContainer>
      <SC.StyledField>설명</SC.StyledField>
      <SC.StyledInputText
        defaultValue={isEdit ? currentFeedState.description : ''}
        {...register('description')}
      />
      <SC.StyledInputError>{errors.description?.message}</SC.StyledInputError>
    </SC.StyledInputContainer>
    <SC.StyledImgInputContainer>
      <SC.StyledField>사진</SC.StyledField>
      <SC.StyledImgLabel>
        <FcAddImage />
      </SC.StyledImgLabel>
      <SC.StyledInputImg
        {...register('image', {
          onChange: (e) => handleAddPreviewImages(e),
        })}
      />
    </SC.StyledImgInputContainer>
    {previewImages.length > 0 && (
      <SC.StyledPreviewImgWrapper>
        {previewImages.map((image, id) => (
          <SC.StyledPreviewImg key={id}>
            <SC.StyledPreviewImgSrc src={image} alt={`${image}-${id}`} />
            <SC.StyledPreviewDeleteButton
              type="button"
              value="x"
              onClick={(e) => handleDeletePreviewImage(e, id)}
            />
          </SC.StyledPreviewImg>
        ))}
      </SC.StyledPreviewImgWrapper>
    )}
    <SC.StyledInputContainer>
      <SC.StyledField>장소</SC.StyledField>
      <SC.StyledSearchAddress>
        <SC.StyledInputSearchAddress {...register('searching')} />
        <SC.StyledButtonSearchAddress
          onClick={(e) => {
            searchPlace(e);
          }}
        >
          <FcSearch />
        </SC.StyledButtonSearchAddress>
      </SC.StyledSearchAddress>
      <SC.StyledInputError>{errors.address?.message}</SC.StyledInputError>
    </SC.StyledInputContainer>
    <SC.StyledSearchResultContainer>
      {searchState && (
        <SC.StyledSearchContainer>
          {placeInfoList?.map((place, index) => (
            <SC.StyledSearchData
              key={`${index}-${place.x}-${place.y}`}
              onClick={() =>
                handleAddressState(place.address_name, Number(place.y), Number(place.x))
              }
            >
              <SC.StyledFiExternalLink href={place.place_url}>
                <FiExternalLink />
              </SC.StyledFiExternalLink>
              <SC.StyledSearchInfoHeader>
                <SC.StyledSearchInfoTitle>{place.place_name}</SC.StyledSearchInfoTitle>
              </SC.StyledSearchInfoHeader>
              {place.road_address_name && (
                <SC.StyledSearchInfoData>
                  <TbRoad />
                  <SC.StyledAddressName>{place.road_address_name}</SC.StyledAddressName>
                </SC.StyledSearchInfoData>
              )}
              <SC.StyledSearchInfoData>
                <MdShareLocation />
                <SC.StyledAddressName>{place.address_name}</SC.StyledAddressName>
              </SC.StyledSearchInfoData>
            </SC.StyledSearchData>
          ))}
        </SC.StyledSearchContainer>
      )}
    </SC.StyledSearchResultContainer>
    <SC.StyledInputContainer>
      <SC.StyledField>주소</SC.StyledField>
      <SC.StyledInputAddress {...register('address')} disabled />
      <SC.StyledInputError>{errors.address?.message}</SC.StyledInputError>
    </SC.StyledInputContainer>
    <input type="hidden" {...register('lat')} />
    <input type="hidden" {...register('lng')} />
    <SC.StyledSubmitButtonWrapper>
      {isEdit ? (
        <SC.StyledSubmitButton name="edit" type="submit">
          수정
        </SC.StyledSubmitButton>
      ) : (
        <SC.StyledSubmitButton name="add" type="submit">
          추가
        </SC.StyledSubmitButton>
      )}
    </SC.StyledSubmitButtonWrapper>
  </SC.StyledFormContainer>
</form>
</SC.StyledModalForm> */
}
