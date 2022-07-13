import { Main } from '@/components/Layout';
import { ProfileTop, ProfileMid, ProfileBot } from '@/features/user';

// import * as reviewApi from '@/api/review';
// import { useEffect } from 'react';

const ProfilePage = () => {
  // async function createReview() {
  //   const sendData = {
  //     userName: '김지환12',
  //     contents: '신기한 Review - POST의 세계12',
  //   };
  //   const createdReview = await reviewApi.createOneReview(sendData);
  //   console.log('createdReview : ', createdReview);
  // }

  // async function getAll() {
  //   const allReviews = await reviewApi.getAllReviews();
  //   console.log('get All Reviews : ', allReviews);
  // }

  // async function getReview() {
  //   const reviewID = '62cd11c3dc1ed31bb0dbac96';
  //   const oneReview = await reviewApi.getOneReview(reviewID);
  //   console.log('get One Reviews : ', oneReview);
  // }

  // async function updateReview() {
  //   const reviewID = '62cd11c3dc1ed31bb0dbac96';
  //   const sendData = {
  //     userName: 'new 김지환12',
  //     contents: 'new 신기한 Review - POST의 세계12',
  //   };
  //   const oneReview = await reviewApi.updateOneReview(reviewID, sendData);
  //   console.log('update One Reviews : ', oneReview);
  // }

  // async function deleteReview() {
  //   const reviewID = '62cd11a3dc1ed31bb0dbac94';
  //   const oneReview = await reviewApi.deleteOneReview(reviewID);
  //   console.log('delete One Reviews : ', oneReview);
  // }

  // useEffect(() => {
  //   // createReview();
  //   // getAll();
  //   // getReview();
  //   // updateReview();
  //   // deleteReview();
  // }, []);
  return (
    <Main bg="#282b37">
      <ProfileTop />
      <ProfileMid />
      <ProfileBot />
    </Main>
  );
};

export default ProfilePage;
