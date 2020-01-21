import fetch from 'isomorphic-fetch';
import {
SET_DURATION__FAILURE,
SET_DURATION__REQUEST,
SET_DURATION__SUCCESS,
} from './actionTypes';

export function setDuration(id, time) {
  return async dispatch => {
    dispatch(setDurationRequest());
    try {
      const response = await fetch('https://api.rach.io/1/public/zone/start', {
      // const response = await fetch('https://api.rach.io/1/public/zone/start_multiple', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      },
      body: JSON.stringify({
        id: id,
        duration: time
      })
    });
      if(response.status === 204) {
        dispatch(setDurationSuccess(response.status));
      } else if(response.status === 400) {
        let body = await response.json();
        dispatch(setDurationFailure(body));
      }
    } catch (error) {
      dispatch(setDurationFailure(error));
    }
  };
}

export function setDurationRequest() {
  return { type: SET_DURATION__REQUEST };
};

export function setDurationSuccess(response) {
  return { type: SET_DURATION__SUCCESS, response };
};

export function setDurationFailure(body) {
  return { type: SET_DURATION__FAILURE, body};
};
