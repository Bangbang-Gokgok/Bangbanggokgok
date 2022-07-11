import axios from 'axios';

export const getAllFeeds = async () => {
  let res = await axios.get('/api/feeds/list');
  // console.log(res.data);
  return res.data;
};
