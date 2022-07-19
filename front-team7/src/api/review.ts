import { axios } from '@/lib';

export const createOneReview = async (sendData) => {
  try {
    let res = await axios.post(`/api/reviews`, JSON.stringify(sendData), {
      headers: { 'Content-Type': `application/json` },
    });
    // console.log('res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const getAllReviews = async () => {
  try {
    let res = await axios.get('/api/reviews/list');
    // console.log('res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const getOneReviewByReviewID = async (reviewId) => {
  try {
    let res = await axios.get(`/api/reviews/${reviewId}`);
    // console.log('res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};
export const getReviewsByFeedID = async (feedId) => {
  try {
    let res = await axios.get(`/api/reviews/list/feed/${feedId}`);
    // console.log('res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const getReviewsByUserID = async (userId) => {
  try {
    let res = await axios.get(`/api/reviews/list/user/${userId}`);
    // console.log('res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateOneReview = async (id, updatedContent, user_id) => {
  try {
    let res = await axios.put(`/api/reviews/${id}`, {
      headers: { 'Content-Type': `application/json` },
      data: {
        userId: user_id,
        contents: updatedContent,
      },
    });
    // console.log('updated res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteOneReview = async (id, user_id) => {
  try {
    const res = await axios.delete(`/api/reviews/${id}`, { data: { userId: user_id } });
    // console.log('deleted res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};
