import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="nav-wrapper cyan accent-4 z-depth-3">
      <ul>
        {
          <li>
            <Link to="/">Landing Page </Link>
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
            <Link
              to={{
                pathname: '/login',
                state: { modal: true },
              }}
            >
              {' '}
              Login{' '}
            </Link>
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
    </div>
  );
};

export default Header;
