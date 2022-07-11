import axios from 'axios';

// 추후에 try~catch 문 이용하여 예외 처리 하기

export const getAllFeeds = async () => {
  let res = await axios.get('/api/feeds/list');
  // console.log('res.data : ', res.data);
  return res.data;
};

export const getOneFeeds = async (id) => {
  let res = await axios.get(`/api/feeds/${id}`);
  // console.log('res.data : ', res.data);
  return res.data;
};

export const createOneFeeds = async (sendData) => {
  let res = await axios.post(`/api/feeds`, JSON.stringify(sendData), {
    headers: { 'Content-Type': `application/json` },
  });
  // console.log('res.data : ', res.data);
  return res.data;
};
