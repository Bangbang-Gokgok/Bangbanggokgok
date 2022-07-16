import axios from 'axios';

export const createOneReview = async (sendData) => {
  try {
    let res = await axios.post(`/api/reviews`, JSON.stringify(sendData), {
      headers: { 'Content-Type': `application/json` },
    });
    // console.log('res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getAllReviews = async () => {
  try {
    let res = await axios.get('/api/reviews/list');
    // console.log('res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getOneReviewByReviewID = async (reviewId) => {
  try {
    let res = await axios.get(`/api/reviews/${reviewId}`);
    // console.log('res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};
export const getReviewsByFeedID = async (feedId) => {
  try {
    let res = await axios.get(`/api/reviews/list/feed/${feedId}`);
    // console.log('res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getReviewsByUserID = async (userId) => {
  try {
    let res = await axios.get(`/api/reviews/list/user/${userId}`);
    // console.log('res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const updateOneReview = async (id, sendData) => {
  console.log('JSON.stringify(sendData) : ', JSON.stringify(sendData));
  try {
    let res = await axios.put(`/api/reviews/${id}`, JSON.stringify(sendData), {
      headers: { 'Content-Type': `application/json` },
    });
    // console.log('updated res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteOneReview = async (id) => {
  try {
    let res = await axios.delete(`/api/reviews/${id}`);
    // console.log('deleted res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};
