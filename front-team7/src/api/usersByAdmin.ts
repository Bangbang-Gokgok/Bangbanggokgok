import { axios } from '@/lib';

export const updateOneUserByAdmin = async (id, updateData) => {
  return await axios.put(`/api/admins/users/${id}`, updateData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const deleteOneUserByAdmin = async (id) => {
  return await axios.delete(`/api/admins/users/${id}`);
};