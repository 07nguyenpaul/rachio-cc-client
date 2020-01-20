import { combineReducers } from 'redux';
import devices from './devices';
import zones from './zones';

const rootReducer = combineReducers({
  devices,
  zones
});

export default rootReducer;
