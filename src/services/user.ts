import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  console.info("queryCurrent");
  return request(`/server/user/userInfo`, {
    method: 'GET',
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
