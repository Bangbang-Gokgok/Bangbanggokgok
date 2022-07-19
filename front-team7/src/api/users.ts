import { axios } from '@/lib';
import { UserResponse } from '@/store';
export const getMyUserInfo = async () => {
  // try {
  //   let res = await axios.get('/api/users/user');
  //   // console.log('res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.get('/api/users/user');
};

export const getAllUsers = async () => {
  // try {
  //   let res = await axios.get('/api/users/list');
  //   // console.log('res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.get('/api/users/list');
};

export const getOneUser = async (id) => {
  // try {
  //   let res = await axios.get(`/api/users/${id}`);
  //   // console.log('res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.get(`/api/users/${id}`);
};

// 본인의 아이디로 로그인을 해야 TEST 가능한 메소드 : updateUser, deleteUser

export const updateUser = async (updateData) => {
  // try {
  //   let res = await axios.put(`/api/users/user`, JSON.stringify(updateData), {
  //     headers: { 'Content-Type': `application/json` },
  //   });
  //   // console.log('updated res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.put<never, UserResponse>(`/api/users/user`, updateData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const deleteUser = async () => {
  // try {
  //   let res = await axios.delete(`/api/users/user`);
  //   // console.log('deleted res : ', res);
  //   return res;
  // } catch (err) {
  //   return err;
  // }
  return await axios.delete(`/api/users/user`);
};
