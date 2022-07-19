import { axios } from '@/lib';

export const updateOneUserByAdmin = async (id, updateData) => {
  return await axios.put(`/api/admins/users/${id}`, updateData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const deleteOneUserByAdmin = async (id) => {
  return await axios.delete(`/api/admins/users/${id}`);
};

// export const updateOneUserByAdmin = async (id, updateData) => {
//   try {
//     let res = await axios.put(`/api/users/admin/${id}`, JSON.stringify(updateData), {
//       headers: { 'Content-Type': `application/json` },
//     });
//     // console.log('updated res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };

// export const deleteOneUserByAdmin = async (id) => {
//   try {
//     let res = await axios.delete(`/api/users/admin/${id}`);
//     // console.log('deleted res : ', res);
//     return res;
//   } catch (err) {
//     return err;
//   }
// };
