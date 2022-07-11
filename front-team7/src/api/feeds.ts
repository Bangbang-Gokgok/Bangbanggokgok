import axios from 'axios';

// 추후에 try~catch 문 이용하여 예외 처리 하기

export const getAllFeeds = async () => {
  let res = await axios.get('/api/feeds/list');
  // console.log('res.data : ', res.data);
  return res.data;
};

export const getOneFeed = async (id) => {
  let res = await axios.get(`/api/feeds/${id}`);
  // console.log('res.data : ', res.data);
  return res.data;
};

export const createOneFeed = async (sendData) => {
  let res = await axios.post(`/api/feeds`, JSON.stringify(sendData), {
    headers: { 'Content-Type': `application/json` },
  });
  // console.log('res.data : ', res.data);
  return res.data;
};

export const updateOneFeed = async (id, sendData) => {
  let res = await axios.put(`/api/feeds/${id}`, JSON.stringify(sendData), {
    headers: { 'Content-Type': `application/json` },
  });
  console.log('updated res.data : ', res.data);
  return res.data;
};

export const deleteOneFeed = async (id) => {
  let res = await axios.delete(`/api/feeds/${id}`);
  // console.log('deleted res.data : ', res.data);
  return res.data;
};
