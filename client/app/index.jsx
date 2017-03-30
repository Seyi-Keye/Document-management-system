import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import App from './components/main/main';
import initialState from './store/initialState.js';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

let store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
,
 document.getElementById('app'));