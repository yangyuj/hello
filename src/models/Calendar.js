import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
    addCalendar ,
    mohuCha,
    getpeopleList,
    addYaoyue,
    getallRili,
    getallplace,
    CalendarHuixian,
    YaoyueHuixian,
    xiugaiYaoyue,
    deleteRili,
    searchPeopleAsync } from '../services/api';
import { trans } from '../utils/i18n';


export default {
    namespace: 'Calendar',

    state: {
        state: {
            addCalendarapi:{},
            mohuList:{},
            peoplelist:{},
            yaoyue:{},
            allrili:{},
            allplace:{},
            riliHuilist:{},
            yaoyueHuilist:{},
            xiugaiyaoyue:{},
            delete:{},
            searchPeopleData: []
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
	    *chaPlace({ payload }, { call, put }) {
	        const response = yield call(getallplace, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'CalendarInfoMessageplace',
	            payload: response,
	        });
	    },
	    *riliHuixian({ payload }, { call, put }) {
	        const response = yield call(CalendarHuixian, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'CalendarInfoMessageHuixianRili',
	            payload: response,
	        });
	    },
	    *yaoyueHuixian({ payload }, { call, put }) {
	        const response = yield call(YaoyueHuixian, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'CalendarInfoMessageHuixianyaoyue',
	            payload: response,
	        });
	    },
	    *xiugaiyaoyue({ payload }, { call, put }) {
	        const response = yield call(xiugaiYaoyue, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'CalendarInfoMessageXiugaiyaoyue',
	            payload: response,
	        });
	    },
	    *deleteri({ payload }, { call, put }) {
	        const response = yield call(deleteRili, payload);
	        if (!response) {
	            return;
	        }
	        yield put({
	            type: 'deleteRiLi',
	            payload: response,
	        });
	    },
      *searchPeople({ payload }, { call, put }) {
        const response = yield call(searchPeopleAsync, payload);
        if (!response) {
            return;
        }
        yield put({
            type: 'searchPeopleReducers',
            payload: response.content,
        });
      }
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
    		CalendarInfoMessageplace(state, { payload }) {
    			return {
    				...state,
    				allplace: payload,
    				loading: true
    			};
    		},
    		CalendarInfoMessageHuixianRili(state, { payload }) {
    			return {
    				...state,
    				riliHuilist: payload,
    				loading: true
    			};
    		},
    		CalendarInfoMessageHuixianyaoyue(state, { payload }) {
    			return {
    				...state,
    				yaoyueHuilist: payload,
    				loading: true
    			};
    		},
    		CalendarInfoMessageXiugaiyaoyue(state, { payload }) {
    			return {
    				...state,
    				xiugaiyaoyue: payload,
    				loading: true
    			};
    		},
    		deleteRiLi(state, { payload }) {
    			return {
    				...state,
    				delete: payload,
    				loading: true
    			};
    		},
        searchPeopleReducers(state, { payload }) {
          return {
    				...state,
    				searchPeopleData: payload
    			};
        }
    },
};
