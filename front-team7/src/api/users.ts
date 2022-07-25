import { axios } from '@/lib';
import { UserResponse } from '@/store';
export interface UserByIdDto {
  email: string;
  name: string;
  profileImage?: string[];
  description?: string;
  friends?: {
    [key: string]: boolean;
  };
}

export interface AllUsers {
  _id: string;
  name: string;
  authority: string;
  profileImage: string[] | [];
  friends?: string[];
}

export const getMyUserInfo = async () => {
  return await axios.get<never, UserResponse>('/api/users/user');
};

export const getAllUsers = async () => {
  return await axios.get<never, AllUsers[]>('/api/users/list');
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