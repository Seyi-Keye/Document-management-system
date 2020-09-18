import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  browserHistory,
  Switch,
  Link,
  Redirect,
  Route,
  IndexRedirect,
} from 'react-router-dom';
import '../assets/sass/styles.scss';
import Document from './components/document/AddDocument';
import configureStore from '../store/configureStore';
import App from './components/App';
import SignUpForm from './components/signUp/SignUp';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import UpdateDocument from './components/document/UpdateDocument';
import UpdateUser from './components/user/UpdateUser';
import Users from './components/user/Users';
import Roles from './components/role/RoleDashboard';
import Search from './components/search/Search';
import LandingPage from './components/landingPage/landingPage';
import '../assets/sass/App.scss';

const store = configureStore;
const onEnter = (next, replace, cb) => {
  const token = localStorage.getItem('token');
  if (!token && next.location.pathname.indexOf('dashboard') > -1) {
    replace('/login');
  }
  if (
    token &&
    (next.location.pathname.indexOf('login') > -1 ||
      next.location.pathname.indexOf('signup') > -1)
  ) {
    replace('/dashboard');
  }
  cb();
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route path="/" component={App} />
        <IndexRedirect to="/login" />
        <Route
          path="dashboard/document"
          component={Document}
          onEnter={onEnter}
        />
        <Route path="signup" component={SignUpForm} onEnter={onEnter} />
        <Route path="login" component={Login} onEnter={onEnter} />
        <Route path="dashboard" component={Dashboard} onEnter={onEnter} />
        <Route path="documents" component={UpdateDocument} onEnter={onEnter} />
        <Route path="users/:id" component={UpdateUser} onEnter={onEnter} />
        <Route path="users" component={Users} onEnter={onEnter} />
        <Route path="roles" component={Roles} onEnter={onEnter} />
        <Route path="search" component={Search} onEnter={onEnter} />
        <Route path="home" component={LandingPage} onEnter={onEnter} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
