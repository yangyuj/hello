import { queryNotices, queryLang } from '../services/api';
import { loginRedirect } from '../utils/utils';
import { trans } from '../utils/i18n';
import { message } from 'antd';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    fetchingNotices: false,
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      yield put({
        type: 'changeNoticeLoading',
        payload: true,
      });
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
    *checkLange (_, { call, put }) {
      yield put({
        type: 'changeNoticeLoading',
        payload: true,
      });
      const response = yield call(queryLang, _.payload);
      if(response.status !== true && response.status !== false) {
        message.error(response.message || trans('global.systemError', '系统超时，稍后重试！'));
        yield put({
          type: 'changeRegularFormSubmitting',
          payload: false,
        })
        return;
      }
      !response.ifLogin && (yield loginRedirect());
      !response.status && (yield message.error(response.message || trans('global.systemError', '系统超时，稍后重试！')));
      response.status && window.location.reload();
      yield put({
        type: 'changeNoticeLoading',
        payload: false,
      });
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
        fetchingNotices: false,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    changeNoticeLoading(state, { payload }) {
      return {
        ...state,
        fetchingNotices: payload,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
