import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import App from './components/main';
import initialState from '../store/initialState.js';
import '../styles/styles.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';
import Document from './components/document/document';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.js';

let store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
,
 document.getElementById('app'));