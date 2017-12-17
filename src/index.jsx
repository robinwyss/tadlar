/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with react-hot-loader
  even tho those 2 deps are only used in development
  eslint has no way to tell that and outputs an error
*/

// react deps
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import { configureStore } from './store';
// hot reload for development
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './style.scss';

const { store, persistor } = configureStore();

const root = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContainer>
          <Component />
        </AppContainer>
      </PersistGate>
    </Provider>,
    root,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}
