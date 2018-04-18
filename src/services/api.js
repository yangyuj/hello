import { stringify } from 'qs';
import request from '../utils/request';

//get
export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}
//post
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}
//页面获取当前学期和周数
export async function getTimeInfo(params) {
  return request(`/api/getTimeInfo`);
}