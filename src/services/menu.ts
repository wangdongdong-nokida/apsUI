import request from '@/utils/request';

export async function queryMenu() {
  return request(`/server/user/menu`, {
    method: 'GET',
  });
}
