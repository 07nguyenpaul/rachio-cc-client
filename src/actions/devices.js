import fetch from 'isomorphic-fetch';
import {
FETCH_DEVICES__FAILURE,
FETCH_DEVICES__REQUEST,
FETCH_DEVICES__SUCCESS,
FETCH_FORECAST__FAILURE,
FETCH_FORECAST__REQUEST,
FETCH_FORECAST__SUCCESS,
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

export function getForcast(deviceId) {
  return async dispatch => {
    dispatch(fetchForecastRequest());
    try {
      const response = await fetch(`https://api.rach.io/1/public/device/${deviceId}/forecast?units=US`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
      let body = await response.json();
      dispatch(fetchForecastSuccess(body.current, body.forecast));
    } catch (error) {
      dispatch(fetchForecastFailure());
    }
  };
}

export function fetchForecastRequest() {
  return { type: FETCH_FORECAST__REQUEST };
};

export function fetchForecastSuccess(currentTemp, forecast) {
  return { type: FETCH_FORECAST__SUCCESS, currentTemp, forecast };
};

export function fetchForecastFailure() {
  return { type: FETCH_FORECAST__FAILURE };
};
