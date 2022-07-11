import axios from 'axios';

export const getAllFeeds = async () => {
  let res = await axios.get('/api/feeds/list');
  // console.log(res.data);
  return res.data;
};

export const getOneFeeds = async (id) => {
  let res = await axios.get(`/api/feeds/${id}`);
  // console.log(res.data);
  return res.data;
};
