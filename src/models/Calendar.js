import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { addCalendar , mohuCha,getpeopleList,addYaoyue,getallRili} from '../services/api';
import { trans } from '../utils/i18n';


export default {
    namespace: 'Calendar',

    state: {
        state: {
            addCalendarapi:{},
            mohuList:{},
            peoplelist:{},
            yaoyue:{},
            allrili:{}
        },
    },

    effects: {
        *add({ payload }, { call, put }) {
            const response = yield call(addCalendar, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'CalendarInfoMessageQ',
                payload: response,
            });
        },
	      *mohuChaxun({ payload }, { call, put }) {
	        const response = yield call(mohuCha, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'CalendarInfoMessageM',
	            payload: response,
	        });
	    },
	    *people({ payload }, { call, put }) {
	        const response = yield call(getpeopleList, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'CalendarInfoMessageP',
	            payload: response,
	        });
	    },
	    *addyao({ payload }, { call, put }) {
	        const response = yield call(addYaoyue, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'CalendarInfoMessageYao',
	            payload: response,
	        });
	    },
	    *charili({ payload }, { call, put }) {
	        const response = yield call(getallRili, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'CalendarInfoMessagerili',
	            payload: response,
	        });
	    },
    },

    reducers: {
        CalendarInfoMessageQ(state, { payload }) {
			return { 
				...state,
				addCalendarapi: payload,
				loading: true
			};	
		},
		 CalendarInfoMessageM(state, { payload }) {
			return { 
				...state,
				mohuList: payload,
				loading: true
			};	
		},
		CalendarInfoMessageP(state, { payload }) {
			return { 
				...state,
				peoplelist: payload,
				loading: true
			};	
		},
		CalendarInfoMessageYao(state, { payload }) {
			return { 
				...state,
				yaoyue: payload,
				loading: true
			};	
		},
		CalendarInfoMessagerili(state, { payload }) {
			return { 
				...state,
				allrili: payload,
				loading: true
			};	
		},
    },
};
