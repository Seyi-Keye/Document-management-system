import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  browserHistory,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import { InputGroup, Nav } from 'react-bootstrap';
// import toastr from 'toastr';
import { handleSearchUsers } from '../actions/adminAction';
import { handleSearchDocuments } from '../actions/documentAction';
import Header from './Header';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.props.handleSearchUsers(this.state.searchInput);
    this.props.handleSearchDocuments(this.state.searchInput);
    <Redirect
      to={{
        pathname: `/search/?query=${this.state.searchInput}`,
        // search: '?utm=your+face',
        // state: { referrer: currentLocation },
      }}
    />;
    // browserHistory.push(`/search/?query=${this.state.searchInput}`);
  }

  handleSearchChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleLogout() {
    // eslint-disable-line
    localStorage.removeItem('token');
    // toastr.success('You have been Logged Out');
    browserHistory.push('/login');
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  handleSearchUsers: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  handleSearchDocuments: PropTypes.func.isRequired,
};

export default connect(null, {
  handleSearchUsers,
  handleSearchDocuments,
})(App);
