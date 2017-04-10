import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import '../styles/styles.scss';
import '../../node_modules/toastr/build/toastr.min.css';
import Document from './components/document/AddDocument';
import configureStore from '../store/configureStore';
import Main from './components/Main';
import SignUpForm from './components/signUp/SignUp';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import UpdateDocument from './components/document/UpdateDocument';
import UpdateUser from './components/user/UpdateUser';
import Users from './components/user/Users';
import Roles from './components/role/RoleDashboard';
import Search from './components/search/Search';


const store = configureStore;
const onEnter = (next, replace, cb) => {
  const token = localStorage.getItem('token');
  if (!token && next.location.pathname.indexOf('dashboard') > -1) {
    replace('/login');
  }
  if (token && (next.location.pathname.indexOf('login') > -1 ||
  next.location.pathname.indexOf('signup') > -1)) {
    replace('/dashboard');
  }
  cb();
};
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRedirect to="/login" />
        <Route path="dashboard/document" component={Document} onEnter={onEnter} />
        <Route path="signup" component={SignUpForm} onEnter={onEnter} />
        <Route path="login" component={Login} onEnter={onEnter} />
        <Route path="dashboard" component={Dashboard} onEnter={onEnter} />
        <Route path="updateDoc" component={UpdateDocument} onEnter={onEnter} />
        <Route path="updateUser/:id" component={UpdateUser} onEnter={onEnter} />
        <Route path="users" component={Users} onEnter={onEnter} />
        <Route path="roles" component={Roles} onEnter={onEnter} />
        <Route path="search" component={Search} onEnter={onEnter} />
      </Route>
    </Router>
  </Provider>,
 document.getElementById('app'));
