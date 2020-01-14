import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import loggerMiddleware from './store/logger';
import monitorReducerEnhancer from './store/monitorReducer';

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composedEnhancers = compose(
  middlewareEnhancer,
  monitorReducerEnhancer
);
const store = createStore(rootReducer, undefined, composedEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
