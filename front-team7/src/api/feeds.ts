import { axios } from '@/lib';

export const getAllFeeds = async () => {
  try {
    let res = await axios.get('/api/feeds/list');
    // console.log('res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const getOneFeed = async (id) => {
  try {
    let res = await axios.get(`/api/feeds/${id}`);
    // console.log('res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const createOneFeed = async (sendData) => {
  try {
    let res = await axios.post(`/api/feeds`, JSON.stringify(sendData), {
      headers: { 'Content-Type': `application/json` },
    });
    // console.log('res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateOneFeed = async (id, sendData) => {
  try {
    let res = await axios.put(`/api/feeds/${id}`, JSON.stringify(sendData), {
      headers: { 'Content-Type': `application/json` },
    });
    // console.log('updated res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteOneFeed = async (id) => {
  try {
    let res = await axios.delete(`/api/feeds/${id}`);
    // console.log('deleted res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};

export const getUserFeedList = async (userId) => {
  try {
    let res = await axios.get(`/api/feeds/list/${userId}`);
    // console.log('get res : ', res);
    return res;
  } catch (err) {
    return err;
  }
};
