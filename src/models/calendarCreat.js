import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { creatAssessment } from '../services/assessment';
import { trans } from '../utils/i18n';
import { loginRedirect } from '../utils/utils';

export default {
  namespace: 'assessmentCreat',

  state: {
    step: {
    },
    regularFormSubmitting: false,
    stepFormSubmitting: false,
    advancedFormSubmitting: false,
  },

  effects: {
    *submitRegularForm({ payload }, { call, put }) {
      yield put({
        type: 'changeRegularFormSubmitting',
        payload: true,
      });
      const response = yield call(creatAssessment, payload);
      if(response.status !== true && response.status !== false) {
        message.error(response.message || trans('global.systemError', '系统超时，稍后重试！'));
        yield put({
          type: 'changeRegularFormSubmitting',
          payload: false,
        })
        return;
      }

      !response.ifLogin && (yield loginRedirect());
      response.status
        ?(message.success(trans('global.submitSuccess', '提交成功')),yield put(routerRedux.push('/assessment/index')))
        :(
          message.error(response.message || trans('global.systemError', '系统超时，稍后重试！')),
          yield put({
            type: 'changeRegularFormSubmitting',
            payload: false,
          })
         );
    },
    *submitStepForm({ payload }, { call, put }) {
      yield put({
        type: 'changeStepFormSubmitting',
        payload: true,
      });
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'changeStepFormSubmitting',
        payload: false,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call, put }) {
      yield put({
        type: 'changeAdvancedFormSubmitting',
        payload: true,
      });
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'changeAdvancedFormSubmitting',
        payload: false,
      });
      message.success(trans('global.submitSuccess', '提交成功'));
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    changeRegularFormSubmitting(state, { payload }) {
      return {
        ...state,
        regularFormSubmitting: payload,
      };
    },
    changeStepFormSubmitting(state, { payload }) {
      return {
        ...state,
        stepFormSubmitting: payload,
      };
    },
    changeAdvancedFormSubmitting(state, { payload }) {
      return {
        ...state,
        advancedFormSubmitting: payload,
      };
    },
  },
};
