import { routerRedux } from 'dva/router';
import { fakeAccountLogin, logout } from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        yield put(routerRedux.push('/'));
      }
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      const response = yield call(logout, payload);
      if(response.status !== true && response.status !== false) {
        message.error(response.message || trans('global.systemError', '系统超时，稍后重试！'));
        return;
      }
      response.status && window.location.reload();
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        submitting: false,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
