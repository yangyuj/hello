import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getCalendarInfo } from '../services/api';
import { trans } from '../utils/i18n';

export default {
    namespace: 'CalendarInfo',

    state: {
        state: {
            getCalendarInfoMessage:{}
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
    },
};
