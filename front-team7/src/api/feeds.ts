import { axios } from '@/lib';

export const getAllFeeds = async () => {
  // try {
  //   let res = await axios.get('/api/feeds/list');
  //   // console.log('res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.get('/api/feeds/list');
};

export const getOneFeed = async (id) => {
  // try {
  //   let res = await axios.get(`/api/feeds/${id}`);
  //   // console.log('res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.get(`/api/feeds/${id}`);
};

export const getFeedListUsingPagination = async (page, perPage) => {
  return await axios.get('/api/feeds/page/list', {
    params: {
      page: page,
      perPage: perPage,
    },
  });
};

export const createOneFeed = async (sendData) => {
  // try {
  //   let res = await axios.post(`/api/feeds`, JSON.stringify(sendData), {
  //     headers: { 'Content-Type': `application/json` },
  //   });
  //   // console.log('res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.post(`/api/feeds`, sendData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const updateOneFeed = async (id, sendData) => {
  // try {
  //   let res = await axios.put(`/api/feeds/${id}`, JSON.stringify(sendData), {
  //     headers: { 'Content-Type': `application/json` },
  //   });
  //   // console.log('updated res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.put(`/api/feeds/${id}`, sendData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const deleteOneFeed = async (id) => {
  // try {
  //   let res = await axios.delete(`/api/feeds/${id}`);
  //   // console.log('deleted res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.delete(`/api/feeds/${id}`);
};

export const getUserFeedList = async (userId) => {
  // try {
  //   let res = await axios.get(`/api/feeds/list/${userId}`);
  //   // console.log('get res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.get(`/api/feeds/list/${userId}`);
};
