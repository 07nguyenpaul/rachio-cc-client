import zoneReducers from './zones';
import {
  SET_DURATION__FAILURE,
  SET_DURATION__REQUEST,
  SET_DURATION__SUCCESS
} from '../actions/actionTypes';

describe('Reducer: Zones', () => {
  const initialState = {
    status: null,
    requesting: false,
    error: ''
  };

  it('should return the initial state without changing', () => {
    const expected = initialState;
    expect(zoneReducers(initialState, {})).toBe(expected);
  });

  it('should set "requesting" as "true" in the state for action type "SET_DURATION__REQUEST"', () => {
    const expected = {
      status: null,
      requesting: true,
      error: ''
    };
    const action = { type: SET_DURATION__REQUEST };
    expect(zoneReducers(initialState, action)).toEqual(expected);
  });

  it('should set "status" in the state for action type "SET_DURATION__SUCCESS"', () => {
    const expected = {
      status: 204,
      requesting: false,
      error: ''
    };

    const payload = {response: 204};
    const action = { type: SET_DURATION__SUCCESS, response: 204 }

    expect(zoneReducers(initialState, action)).toEqual(expected);
  });

  it('should set "requesting" as "false" and report error message in the state for action type "FETCH_DEVICES__FAILURE"', () => {
    const expected = {
      status: 301,
      requesting: false,
      error: '"Duration range 0 - 10800 seconds"'
    };
    const action = { type: SET_DURATION__FAILURE, body: {code: 301, error: '"Duration range 0 - 10800 seconds"'} };
    
    expect(zoneReducers(initialState, action)).toEqual(expected);
  });
});
