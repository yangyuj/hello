import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent1() {
  return request('/api/current_user');
}


export async function queryCurrent(params) {
  return request('/api/current_user', {
    method: 'POST',
    body: params,
  });
}
