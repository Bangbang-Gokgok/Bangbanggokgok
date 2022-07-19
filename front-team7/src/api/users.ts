import { axios } from '@/lib';
import { UserResponse } from '@/store';
export interface UserByIdDto {
  email: string;
  name: string;
  profileImage?: string[];
  description?: string;
}

export const getMyUserInfo = async () => {
  return await axios.get<never, UserResponse>('/api/users/user');
};

export const getAllUsers = async () => {
  return await axios.get('/api/users/list');
};

export const getOneUser = async (userId?: string | null) => {
  return await axios.get<never, UserByIdDto>(`/api/users/${userId}`);
};

export const updateUser = async (updateData) => {
  return await axios.put<never, UserResponse>(`/api/users/user`, updateData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const deleteUser = async () => {
  return await axios.delete(`/api/users/user`);
};

// export const getMyUserInfo = async () => {
//   try {
//     let res = await axios.get('/api/users/user');
//     // console.log('res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };

// export const getAllUsers = async () => {
//   try {
//     let res = await axios.get('/api/users/list');
//     // console.log('res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };

// export const getOneUser = async (userId?: string | null) => {
//   try {
//     let res = await axios.get(`/api/users/${id}`);
//     // console.log('res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };

// export const updateUser = async (updateData) => {
//   try {
//     let res = await axios.put(`/api/users/user`, JSON.stringify(updateData), {
//       headers: { 'Content-Type': `application/json` },
//     });
//     // console.log('updated res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }

// };

// export const deleteUser = async () => {
//   try {
//     let res = await axios.delete(`/api/users/user`);
//     // console.log('deleted res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };
