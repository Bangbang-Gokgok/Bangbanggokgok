import { axios } from '@/lib';

export async function logout() {
  await axios.get('/api/logout');
}
