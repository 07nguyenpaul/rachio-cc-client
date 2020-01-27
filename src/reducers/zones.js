import {
  SET_DURATION__FAILURE,
  SET_DURATION__REQUEST,
  SET_DURATION__SUCCESS
} from '../actions/actionTypes';

const initialState = {
  status: null,
  requesting: false,
  error: ''
};

export default function zones(state=initialState, action) {
  switch(action.type) {
    case SET_DURATION__REQUEST:
      return { ...state, status: null, requesting: true };
    case SET_DURATION__SUCCESS:
      const code = action.response;
      return { ...state, status: code, requesting: false };
    case SET_DURATION__FAILURE:
      return { ...state, status: action.body.code, requesting: false, error: action.body.error};
    default:
      return state;
  }
};
