import fetch from 'isomorphic-fetch';
import {
FETCH_DEVICES__FAILURE,
FETCH_DEVICES__REQUEST,
FETCH_DEVICES__SUCCESS,
} from './actionTypes';

export function getDevices() {
  return async dispatch => {
    dispatch(fetchDevicesRequest());
    try {
      const response = await fetch(`https://api.rach.io/1/public/person/${process.env.REACT_APP_PERSON_ID}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
      let body = await response.json();
      console.log('ACTIONS', body.devices);
      dispatch(fetchDevicesSuccess(body.devices));
    } catch (error) {
      dispatch(fetchDevicesFailure());
    }
  };
}

export function fetchDevicesRequest() {
  return { type: FETCH_DEVICES__REQUEST };
};

export function fetchDevicesSuccess(devices) {
  return { type: FETCH_DEVICES__SUCCESS, devices };
};

export function fetchDevicesFailure() {
  return { type: FETCH_DEVICES__FAILURE };
};
