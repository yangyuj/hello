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






//新建日历
export async function addCalendar(params) {
	console.log(params)
  return request('/api/addCalendar', {
    method: 'POST',
    body: params,
  });
}
//创建邀约
export async function addYaoyue(params) {
	console.log(params)
  return request('/api/createScheduleTemplate', {
    method: 'POST',
    body: params,
  });
}
//查询所有人员
export async function getpeopleList() {
  return request(`/api/getDepartmentList`);
}
//查询所有日历
export async function getallRili() {
  return request(`/api/getAllCalendar`);
}
//模糊查询(用不用？)
export async function mohuCha(params) {
	console.log(params.name)
  return request(`/api/selectPersonName?name=${params.name}`);
}
//日程详情的显示
export async function checkDetailInfo() {
  return request(`/api/checkDetail`);
}
//删除日程
export async function checkDeleteInfo() {
  return request(`/api/deleteScheduleTemplate`);
}
//确认日程
export async function checkConfirmInfo() {
  return request(`/api/confirmCalendar`);

}