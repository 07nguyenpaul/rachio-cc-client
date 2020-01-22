import createReducer from './createReducer';
import {
FETCH_DEVICES__FAILURE,
FETCH_DEVICES__REQUEST,
FETCH_DEVICES__SUCCESS,
FETCH_FORECAST__FAILURE,
FETCH_FORECAST__REQUEST,
FETCH_FORECAST__SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  devices: [],
  currentTemp: {},
  forecast: [],
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
  },
  [FETCH_FORECAST__REQUEST](state) {
    return { ...state, requesting: true };
  },
  [FETCH_FORECAST__SUCCESS](state, action) {
    console.log(action);
    return { ...state, currentTemp: action.current, forecast: action.forecast, requesting: false };
  },
  [FETCH_FORECAST__FAILURE](state) {
    return { ...state, requesting: false };
  }
});
