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
export async function getTimeInfo() {
  return request(`/api/getTimeInfo`);
}
//日历的类别显示
export async function getCalendarInfo() {
  return request(`/api/getAllCalendar`);
}
//日程详情的显示
export async function checkDetailInfo() {
  return request(`/api/checkDetail`);
}