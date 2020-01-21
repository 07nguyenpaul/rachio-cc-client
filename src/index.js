import React from 'react';
import { render } from 'react-dom'
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
WebFont.load({ google: { families: ['Material Icons'] } });


const store = configureStore();

const renderApp = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./container/App', renderApp)
};

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
