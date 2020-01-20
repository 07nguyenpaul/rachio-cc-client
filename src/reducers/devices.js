import createReducer from './createReducer';
import {
FETCH_DEVICES__FAILURE,
FETCH_DEVICES__REQUEST,
FETCH_DEVICES__SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  devices: [],
  requesting: false
};

export default createReducer(initialState, {
  [FETCH_DEVICES__REQUEST](state) {
    return { ...state, requesting: true };
  },
  [FETCH_DEVICES__SUCCESS](state, action) {
    return { ...state, devices: action.devices, requesting: false };
  },
  [FETCH_DEVICES__FAILURE](state) {
    return { ...state, requesting: false };
  }
});
