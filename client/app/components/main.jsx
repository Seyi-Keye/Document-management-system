import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { InputGroup, Nav } from 'react-bootstrap';
// import toastr from 'toastr';
import { handleSearchUsers } from '../actions/adminAction';
import { handleSearchDocuments } from '../actions/documentAction';

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
    browserHistory.push(`/search/?query=${this.state.searchInput}`);
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

  renderNavBar() {
    const token = localStorage.getItem('token');
    return (
      <Nav activeKey="/home" role="navigation">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        {token && (
          <Nav.Item>
            <Nav.Link href="/dashboard/document">Create Document</Nav.Link>
          </Nav.Item>
        )}{' '}
        {!token && (
          <Nav.Item>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav.Item>
        )}{' '}
        {!token && (
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
        )}
        {token && (
          <Nav.Item>
            <Nav.Link href="/dashboard"> Dashboard</Nav.Link>
          </Nav.Item>
        )}
        {token && (
          <Nav.Item>
            <Nav.Link href="/users"> Users</Nav.Link>
          </Nav.Item>
        )}
        {token && (
          <Nav.Item>
            <Nav.Link href="/roles"> Manage Role</Nav.Link>
          </Nav.Item>
        )}
        {/* <div className="nav-wrapper cyan accent-4 z-depth-3">
          <ul>
            {
              <li>
                <Link to="/home">Landing Page </Link>
              </li>
            }
            {token && (
              <li>
                {' '}
                <Link to="/dashboard/document">Create Document </Link>{' '}
              </li>
            )}
            {!token && (
              <li>
                {' '}
                <Link to="/signup"> Sign Up </Link>
              </li>
            )}
            {!token && (
              <li>
                {' '}
                <Link to="/login"> Login </Link>
              </li>
            )}
            {token && (
              <li>
                {' '}
                <Link to="/dashboard"> Dashboard</Link>
              </li>
            )}
            {token && (
              <li>
                {' '}
                <Link to="/users"> Users</Link>
              </li>
            )}
            {token && (
              <li>
                {' '}
                <Link to="/roles"> Manage Role</Link>
              </li>
            )}
            {token && (
              <li>
                <form onSubmit={this.handleSearchSubmit}>
                  <div className="input-field">
                    <InputGroup
                      placeholder="Search Here"
                      id="search"
                      onChange={this.handleSearchChange}
                      type="text"
                      required
                      name="searchInput"
                      value={this.state.searchInput}
                      label={<i className="material-icons">search</i>}
                    />
                    <i className="material-icons">close</i>
                  </div>
                </form>
              </li>
            )}
            {token && (
              <button id={this.handleLogout} onClick={this.handleLogout}>
                Logout
              </button>
            )}
          </ul>
        </div> */}
      </Nav>
    );
  }

  render() {
    return (
      <div>
        <hr />
        <header>
          <a href="/home">
            <p className="app-name">DOCkie</p>
          </a>
          {this.renderNavBar()}
        </header>
        <hr />
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
