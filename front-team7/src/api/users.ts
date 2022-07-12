import axios from 'axios';

export const getMyUserInfo = async () => {
  try {
    let res = await axios.get('/api/users');
    // console.log('res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getAllUsers = async () => {
  try {
    let res = await axios.get('/api/users/list');
    // console.log('res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getOneUser = async (id) => {
  try {
    let res = await axios.get(`/api/users/${id}`);
    // console.log('res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

// 본인의 아이디로 로그인을 해야 TEST 가능한 메소드 : updateUser, deleteUser

export const updateUser = async (updateData) => {
  try {
    let res = await axios.put(`/api/users/`, JSON.stringify(updateData), {
      headers: { 'Content-Type': `application/json` },
    });
    // console.log('updated res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteUser = async () => {
  try {
    let res = await axios.delete(`/api/users/`);
    // console.log('deleted res.data : ', res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};
