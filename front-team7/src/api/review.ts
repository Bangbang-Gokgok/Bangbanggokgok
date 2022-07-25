import { axios } from '@/lib';

export const createOneReview = async (sendData) => {
  return await axios.post(`/api/reviews`, JSON.stringify(sendData), {
    headers: { 'Content-Type': `application/json` },
  });
};

export const getAllReviews = async () => {
  return await axios.get('/api/reviews/list');
};

export const getOneReviewByReviewID = async (reviewId) => {
  return await axios.get(`/api/reviews/${reviewId}`);
};
export const getReviewsByFeedID = async (feedId) => {
  return await axios.get(`/api/reviews/list/feed/${feedId}`);
};

export const getReviewsByUserID = async (userId) => {
  return await axios.get(`/api/reviews/list/user/${userId}`);
};

export const updateOneReview = async (id, updatedContent, user_id) => {
  return await axios.put(`/api/reviews/${id}`, {
    headers: { 'Content-Type': `application/json` },
    data: {
      userId: user_id,
      contents: updatedContent,
    },
  });
};

export const deleteOneReview = async (id, user_id) => {
  return await axios.delete(`/api/reviews/${id}`, { data: { userId: user_id } });
};