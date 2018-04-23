import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getCalendarInfo, getTimeInfo, checkDetailInfo, checkDeleteInfo, checkConfirmInfo } from '../services/api';
import { trans } from '../utils/i18n';

export default {
    namespace: 'CalendarInfo',

    state: {
        state: {
            getCalendarInfoMessage:[],
            getTimeInfoMessage:{},
            checkDetailInfoMessage:{},
            checkDeleteInfoMessage:{},
            checkConfirmInfoMessage:{}
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
                payload: response,
            });
        },
        *detailInfo({ payload }, { call, put }) {
            const response = yield call(checkDetailInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'detailInfoMessage',
                payload: response,
            });
        },
        *deleteInfo({ payload }, { call, put }) {
            const response = yield call(checkDeleteInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'deleteInfoMessage',
                payload: response,
            });
        },
        *confirmInfo({ payload }, { call, put }) {
            const response = yield call(checkConfirmInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'confirmInfoMessage',
                payload: response.status,
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
    },
};
