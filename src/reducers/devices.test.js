import deviceReducer from './devices';
import {
  FETCH_DEVICES__FAILURE,
  FETCH_DEVICES__REQUEST,
  FETCH_DEVICES__SUCCESS
} from '../actions/actionTypes';

import { getMockDevices } from '../store/mockDevices';

describe('Reducer: Devices', () => {
  const allDevices = getMockDevices();

  const initialState = {
    devices: [],
    currentTemp: {},
    forecast: [],
    requesting: false
  };

  it('should return the initial state without changing', () => {
    const expected = initialState;
    expect(deviceReducer(initialState, {})).toBe(expected);
  });

  it('should set "requesting" as "true" in the state for action type "FETCH_DEVICES__REQUEST"', () => {
    const expected = {
      devices: [],
      currentTemp: {},
      forecast: [],
      requesting: true,
    };
    const action = { type: FETCH_DEVICES__REQUEST };
    expect(deviceReducer(initialState, action)).toEqual(expected);
  });

  it('should set "devices" in the state for action type "FETCH_DEVICES__SUCCESS"', () => {
    const expected = {
      devices: allDevices,
      currentTemp: {},
      forecast: [],
      requesting: false,
    };
    const action = { type: FETCH_DEVICES__SUCCESS, devices: allDevices };
    expect(deviceReducer(initialState, action)).toEqual(expected);
  });

  it('should set "requesting" as "false" in the state for action type "FETCH_DEVICES__FAILURE"', () => {
    const expected = {
      devices: [],
      currentTemp: {},
      forecast: [],
      requesting: false,
    };
    const action = { type: FETCH_DEVICES__FAILURE };
    expect(deviceReducer(initialState, action)).toEqual(expected);
  });
});
