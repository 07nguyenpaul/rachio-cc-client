import nock from 'nock';
import { mockInitialState, mockStore } from '../store/mockInitialStore';

import * as actions from './zones';

import {
  SET_DURATION__FAILURE,
  SET_DURATION__REQUEST,
  SET_DURATION__SUCCESS
} from './actionTypes';

describe('Actions: Zones', () => {
  let store = mockStore(mockInitialState);

  afterEach(() => {
    nock.cleanAll();
  })

  it('should create SET_DURATION__REQUEST action', () => {
    const expected = {
      "type": "SET_DURATION__REQUEST"
    };
    expect(actions.setDurationRequest()).toEqual(expected);
  });

  it('should create SET_DURATION__SUCCESS action', () => {
    const expected = {
      "type": "SET_DURATION__SUCCESS", "response": 204
    };
    expect(actions.setDurationSuccess(204)).toEqual(expected);
  });

  it('should create SET_DURATION__FAILURE actions', () => {
    const expected = {
      "type": "SET_DURATION__FAILURE", "body": 301
    };
    expect(actions.setDurationFailure(301)).toEqual(expected);
  });
});
