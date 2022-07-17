import { axios } from '@/lib';
import { UserResponse } from '@/store';

export async function getCurrentUser() {
  const user = await axios.get<never, UserResponse>('/api/users/user');
  return user;
}
