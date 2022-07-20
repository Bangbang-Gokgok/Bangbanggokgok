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

export async function getCurrentUser() {
  const user = await axios.get<never, UserResponse>('/api/users/user');
  return user;
}

export async function getUserById(userId?: string | null) {
  const user = await axios.get<never, UserByIdDto>(`/api/users/${userId}`);
  return user;
}
