import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { getTimeInfo, checkListInfo } from '../services/api';
import { trans } from '../utils/i18n';
import { loginRedirect } from '../utils/utils';

export default {
    namespace: 'timeInfo',

    state: {
        state: {
            getTimeInfoMessage:{},
            getListInfoMessage:{} 
        },
    },

    effects: {
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
        *listInfo({ payload }, { call, put }) {
            const response = yield call(checkListInfo, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'listInfoMessage',
                payload: response,
            });
        }
    },

    reducers: {
        timeInfoMessage(state, { payload }) {
			return { 
				...state,
				getTimeInfoMessage: payload,
				loading: true
			};	
        },
        listInfoMessage(state, { payload }) {
			return { 
				...state,
				getListInfoMessage: payload,
				loading: true
			};	
		},
    },
};
