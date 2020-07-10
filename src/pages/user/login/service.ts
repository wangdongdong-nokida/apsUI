import request from 'umi-request';


export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  const url="/test/user/login";
  return request(url, {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  const url=`/api/login/captcha?mobile=${mobile}`;
  return request(url);
}
