import nock from 'nock';
import { mockInitialState, mockStore } from '../store/mockInitialStore';
import { getMockDevices } from '../store/mockDevices';

import * as actions from './devices';

import {
  FETCH_DEVICES__FAILURE,
  FETCH_DEVICES__REQUEST,
  FETCH_DEVICES__SUCCESS,
  FETCH_FORECAST__FAILURE,
  FETCH_FORECAST__REQUEST,
  FETCH_FORECAST__SUCCESS,
} from './actionTypes';

describe('Actions: Devices', () => {
  let store = mockStore(mockInitialState);

  afterEach(() => {
    nock.cleanAll();
  })

  it('should create FETCH_DEVICES__REQUEST action', () => {
    const expected = {
      "type": "FETCH_DEVICES__REQUEST"
    };
    expect(actions.fetchDevicesRequest()).toEqual(expected);
  });

  it('should create FETCH_DEVICES__SUCCESS action', () => {
    const devices = getMockDevices();
    const expected = {
      "type": "FETCH_DEVICES__SUCCESS", "devices": devices
    };
    expect(actions.fetchDevicesSuccess(devices)).toEqual(expected);
  });

  it('should create FETCH_DEVICES__FAILURE actions', () => {
    const expected = {
      "type": "FETCH_DEVICES__FAILURE"
    };
    expect(actions.fetchDevicesFailure()).toEqual(expected);
  });
});
