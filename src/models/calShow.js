import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getCalendarInfo, getTimeInfo, checkDetailInfo } from '../services/api';
import { trans } from '../utils/i18n';

export default {
    namespace: 'CalendarInfo',

    state: {
        state: {
            getCalendarInfoMessage:{},
            getTimeInfoMessage:{},
            checkDetailInfoMessage:{}
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
                payload: response,
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
    },
};
