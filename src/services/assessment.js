import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCardList(params) {
  return request(`/api/card_list?${stringify(params)}`);
}

export async function queryStudentList(params) {
  return request(`/api/student_list?${stringify(params)}`);
}


//发送请求norm_genlist
export async function normListgen(params) {
  return request(`api/core_attainment?${stringify(params)}`);
}
//发送请求norm_sublist
export async function normListsub(params) {
  return request(`api/core_attainment?${stringify(params)}`);
}
//发送请求norm_droplist
export async function normListdrop(params) {
  return request(`api/get_allSubject?${stringify(params)}`);
}
//获取列表的请求
export async function subjectChange(params) {
  return request(`api/subjectChangeSend?${stringify(params)}`);
}
//获取分页器的信息
export async function getCourse(params) {
  return request(`/api/getAllCourses?${stringify(params)}`);
}
//传值给后端,'post'方法和'get'方法的区别
export async function saveValue(params) {
  return request('/api/updateCoursesById', {
    method: 'POST',
    body: params,
  });
}

export async function queryAssessmentInfo(params) {
  return request(`/api/assessment_detail?${stringify(params)}`);
}

export async function queryAssessmentGrade(params) {
  return request(`/api/get_grade?${stringify(params)}`);
}

export async function queryAssessmentCurriculum(params) {
  return request(`/api/get_curriculum?${stringify(params)}`);
}

export async function queryCurriculumList() {
  return request(`/api/curriculum_list`);
}

export async function creatAssessment(params) {
  return request('/api/creat_assessment', {
    method: 'POST',
    body: params,
  });
}

export async function assessmentSubmit(params) {
  return request('/api/assessment_submit', {
    method: 'POST',
    body: params,
  });
}

export async function selfRating(params) {
  return request('/api/self_rating', {
    method: 'POST',
    body: params,
  });
}

export async function  tutorRating(params) {
  return request('/api/tutor_save', {
    method: 'POST',
    body: params,
  });
}

export async function querySelfAssessment(params) {
  return request(`/api/get_stu_self_rating?${stringify(params)}`);
}


export async function teacherRating(params) {
  return request('/api/courses_save', {
    method: 'POST',
    body: params,
  });
}

export async function queryTeacherRating(params) {
  return request(`/api/courses_get?${stringify(params)}`);
}

export async function queryTutorAssessment(params) {
  return request(`/api/tutor_get?${stringify(params)}`);
}


export async function  publishPlan(params) {
  return request('/api/publish_plan', {
    method: 'POST',
    body: params,
  });
}

export async function  studentApply(params) {
  return request('/api/tuborConfirmRecord', {
    method: 'POST',
    body: params,
  });
}
