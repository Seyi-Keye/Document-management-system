import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from './components/main';
import initialState from '../store/initialState.js';
import '../styles/styles.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';
import '../../node_modules/material-icons/css/material-icons.css';
import '../../node_modules/toastr/build/toastr.min.css';
import Document from './components/document/document';
import configureStore from '../store/configureStore.js';
import Main from './components/main';
import SignUpForm from './components/signUp/signUp';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import UpdateDocument from './components/document/updateDocument';

const store = configureStore;
const onEnter = (next, replace, cb) => {
   const token = localStorage.getItem('token');
  if(!token && next.location.pathname.indexOf('dashboard') > -1) {
    replace('/login');
  }
  if(token && (next.location.pathname.indexOf('login') > -1 || next.location.pathname.indexOf('signup') > -1)) {
    replace('/dashboard');
  }
  cb();
}
render(
<Provider store={store}>
<Router history={browserHistory}>
  <Route path="/" component={Main}>
    <IndexRedirect to="/login" />
    <Route path="dashboard/document" component={Document} onEnter={onEnter}/>
    <Route path="signup" component={SignUpForm} onEnter={onEnter} />
    <Route path="login" component={Login} onEnter={onEnter} />
    <Route path="dashboard" component={Dashboard} onEnter={onEnter}/>
    <Route path="updateDoc/:id" component={UpdateDocument} onEnter={onEnter}/>
  </Route>
</Router>
</Provider>,
 document.getElementById('app'));
