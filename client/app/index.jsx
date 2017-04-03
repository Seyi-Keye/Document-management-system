import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Router, Route, indexRoute, browserHistory } from 'react-router';
import App from './components/main';
import initialState from '../store/initialState.js';
import '../styles/styles.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';
import '../../node_modules/material-icons/css/material-icons.css';
import '../../node_modules/toastr/build/toastr.min.css';
import Document from './components/document/document';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.js';
import Main from './components/main';
// import About from './components/';
// import Contact from './components/contact/contact';
import SignUpForm from './components/signUp/signUp';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';

let store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
          <Route path="/" component={Main}/>
          {/*<Route path="/signup" component={SignUpForm}/>
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>*/}
    </Router>
  </Provider>
,
 document.getElementById('app'));