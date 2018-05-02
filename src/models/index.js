import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getCalendarInfo, getTimeInfo, checkDetailInfo, checkDeleteInfo, checkConfirmInfo, checkListInfo } from '../services/api';
import { trans } from '../utils/i18n';

export default {
    namespace: 'Index',

    state: {
        state: {
            getCalendarInfoMessage: [],
            getTimeInfoMessage: {},
            checkDetailInfoMessage: {},
            checkDeleteInfoMessage: {},
            checkConfirmInfoMessage: {},
            checkListInfo: []
        },
    },

    effects: {
        *CalendarInfo({ payload }, { call, put }) {
            const response = yield call(getCalendarInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'CalendarInfoMessage',
                payload: response.content,
            });
        },
        *timeInfo({ payload }, { call, put }) {
            const response = yield call(getTimeInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'timeInfoMessage',
                payload: response.content,
            });
        },
        *detailInfo({ payload }, { call, put }) {
            const response = yield call(checkDetailInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'detailInfoMessage',
                payload: response.content,
            });
        },
        *deleteInfo({ payload }, { call, put }) {
            const response = yield call(checkDeleteInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'deleteInfoMessage',
                payload: response.content,
            });
        },
        *confirmInfo({ payload }, { call, put }) {
            const response = yield call(checkConfirmInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'confirmInfoMessage',
                payload: response,
            });
        },
        *checkWeek({ payload }, { call, put }) {
            yield put({
                type: 'updateWeek',
                payload: payload,
            });
        },
        *fetchList({ payload }, { call, put }) {
            const response = yield call(checkListInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'updateList',
                payload: response.content,
            });
        }
    },

    reducers: {
        CalendarInfoMessage(state, { payload }) {
            return {
                ...state,
                getCalendarInfoMessage: payload,
                loading: true
            };
        },
        timeInfoMessage(state, { payload }) {
            return {
                ...state,
                getTimeInfoMessage: payload,
                loading: true
            };
        },
        detailInfoMessage(state, { payload }) {
            return {
                ...state,
                checkDetailInfoMessage: payload,
                loading: true
            };
        },
        deleteInfoMessage(state, { payload }) {
            return {
                ...state,
                checkDeleteInfoMessage: payload,
                loading: true
            };
        },
        confirmInfoMessage(state, { payload }) {
            return {
                ...state,
                checkConfirmInfoMessage: payload,
                loading: true
            };
        },
        updateWeek(state, { payload }) {
            let getTimeInfoMessage = Object.assign({}, state.getTimeInfoMessage, true);
            getTimeInfoMessage.week.currentWeek = payload;
            return {
                ...state,
                getTimeInfoMessage
            }
        },
        updateList(state, { payload }) {
            return {
                ...state,
                checkListInfo: payload
            }
        }
    },
};
