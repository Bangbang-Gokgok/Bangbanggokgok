import { axios } from '@/lib';
import { FeedListProps } from '@/types/feed';

import { type FeedsResponse } from '@/store';

export const getAllFeeds = async () => {
  return await axios.get<never, FeedsResponse[]>('/api/feeds/list');
};

export const getOneFeed = async (id) => {
  return await axios.get(`/api/feeds/${id}`);
};

export const getFeedListUsingPagination = async (page, perPage) => {
  return await axios.get<FeedListProps, number>('/api/feeds/page/list', {
    params: {
      page: page,
      perPage: perPage,
    },
  });
};

export const createOneFeed = async (sendData) => {
  return await axios.post(`/api/feeds`, sendData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const updateOneFeed = async (id, sendData) => {
  return await axios.put(`/api/feeds/${id}`, sendData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const deleteOneFeed = async (id) => {
  return await axios.delete(`/api/feeds/${id}`);
};

export const getUserFeedList = async (userId) => {
  return await axios.get(`/api/feeds/list/${userId}`);
};

export const deleteOneFeedByAdmin = async (id?: string) => {
  return await axios.delete(`/api/admins/feeds/${id}`);
};

// export const getAllFeeds = async () => {
//   try {
//     let res = await axios.get('/api/feeds/list');
//     // console.log('res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };

// export const getOneFeed = async (id) => {
//   try {
//     let res = await axios.get(`/api/feeds/${id}`);
//     // console.log('res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };

// export const getFeedListUsingPagination = async (page, perPage) => {
//   return await axios.get('/api/feeds/page/list', {
//     params: {
//       page: page,
//       perPage: perPage,
//     },
//   });
// };

// export const createOneFeed = async (sendData) => {
//   try {
//     let res = await axios.post(`/api/feeds`, JSON.stringify(sendData), {
//       headers: { 'Content-Type': `application/json` },
//     });
//     // console.log('res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }

// };

// export const updateOneFeed = async (id, sendData) => {
//   try {
//     let res = await axios.put(`/api/feeds/${id}`, JSON.stringify(sendData), {
//       headers: { 'Content-Type': `application/json` },
//     });
//     // console.log('updated res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }

// };

// export const deleteOneFeed = async (id) => {
//   try {
//     let res = await axios.delete(`/api/feeds/${id}`);
//     // console.log('deleted res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };

// export const getUserFeedList = async (userId) => {
//   try {
//     let res = await axios.get(`/api/feeds/list/${userId}`);
//     // console.log('get res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };
