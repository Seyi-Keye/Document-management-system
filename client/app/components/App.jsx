import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  // browserHistory,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { InputGroup, Nav } from 'react-bootstrap';
// import toastr from 'toastr';
import { handleSearchUsers } from '../actions/adminAction';
import { handleSearchDocuments } from '../actions/documentAction';
import Header from './Header';
import SignUpForm from './signUp/signUp';
import Login, { LoginForm } from './login/Login';
import Dashboard from './dashboard/Dashboard';
import UpdateDocument from './document/UpdateDocument';
import UpdateUser from './user/UpdateUser';
import Users from './user/Users';
import Roles from './role/RoleDashboard';
import Search from './search/Search';
import LandingPage from './landingPage/landingPage';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
    this.previousLocation = this.props.location;
    // this.handleLogout = this.handleLogout.bind(this);
    // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    // this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  // handleSearchSubmit(event) {
  //   event.preventDefault();
  //   this.props.handleSearchUsers(this.state.searchInput);
  //   this.props.handleSearchDocuments(this.state.searchInput);
  //   <Redirect
  //     to={{
  //       pathname: `/search/?query=${this.state.searchInput}`,
  //       // search: '?utm=your+face',
  //       // state: { referrer: currentLocation },
  //     }}
  //   />;
  //   // browserHistory.push(`/search/?query=${this.state.searchInput}`);
  // }

  // handleSearchChange(event) {
  //   this.setState({ searchInput: event.target.value });
  // }

  // handleLogout() {
  //   // eslint-disable-line
  //   localStorage.removeItem('token');
  //   // toastr.success('You have been Logged Out');
  //   <Redirect
  //     to={{
  //       pathname: `/login`,
  //       // search: '?utm=your+face',
  //       // state: { referrer: currentLocation },
  //     }}
  //   />;
  //   // browserHistory.push('/login');
  // }

  componentWillUpdate() {
    const { location } = this.props;
    if (!(location.state && location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal =
      location.state &&
      location.state.modal &&
      this.previousLocation !== location;
    console.log(
      this.previousLocation,
      '<= this.previousLocation..',
      location,
      '<====location'
    );
    return (
      <div className="app">
        <Header />
        {isModal ? <Route exact path="/login" component={Login} /> : null}
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route>{<p>404</p>}</Route>
          {/* 
          <Route exact path="/dashboard/document" component={Document} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/documents" component={UpdateDocument} />
          <Route exact path="/users/:id" component={UpdateUser} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/roles" component={Roles} />
          <Route exact path="/search" component={Search} />
           */}
        </Switch>
      </div>
    );
  }
}

// App.propTypes = {
//   handleSearchUsers: PropTypes.func.isRequired,
//   children: PropTypes.func.isRequired,
//   handleSearchDocuments: PropTypes.func.isRequired,
// };

export default withRouter(App);
// export default connect(null, {
//   handleSearchUsers,
//   handleSearchDocuments,
// })(App);
