import { query as queryUsers, queryCurrent } from '../services/user';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'user',

  state: {
    list: [],
    loading: false,
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryUsers);
      // !response.ifLogin && (yield put(routerRedux.push('/user/login')));
      // !response.status && (yield put(routerRedux.push('/user/login')));
      yield put({
        type: 'save',
        payload: response.content,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      // !response.ifLogin && (yield put(routerRedux.push('/user/login')));
      // !response.status && (yield put(routerRedux.push('/user/login')));
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
