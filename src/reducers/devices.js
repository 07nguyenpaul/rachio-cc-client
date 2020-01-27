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

export default function devices(state=initialState, action) {
  switch(action.type) {
    case FETCH_DEVICES__REQUEST:
      return { ...state, requesting: true };
    case FETCH_DEVICES__SUCCESS:
      return { ...state, devices: action.devices, requesting: false };
    case FETCH_DEVICES__FAILURE:
      return { ...state, requesting: false };
    case FETCH_FORECAST__REQUEST:
      return { ...state, requesting: true };
    case FETCH_FORECAST__SUCCESS:
      return { ...state, currentTemp: action.current, forecast: action.forecast, requesting: false };
    case FETCH_FORECAST__FAILURE:
      return { ...state, requesting: false };
    default:
      return state;
  }
};
