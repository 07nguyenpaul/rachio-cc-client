import createReducer from './createReducer';
import {
SET_DURATION__FAILURE,
SET_DURATION__REQUEST,
SET_DURATION__SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  status: null,
  requesting: false,
  error: ''
};

export default createReducer(initialState, {
  [SET_DURATION__REQUEST](state) {
    return { ...state, status: null, requesting: true };
  },
  [SET_DURATION__SUCCESS](state, action) {
    return { ...state, status: action.response, requesting: false };
  },
  [SET_DURATION__FAILURE](state, action) {
    return { ...state, status: action.body.code, requesting: false, error: action.body.error};
  }
});
