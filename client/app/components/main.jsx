import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import  {handleSearchUsers} from '../actions/adminAction.js';
import { Form, Input, Button, Row,Col, Icon } from 'react-materialize';

import toastr from 'toastr';

class App extends React.Component {
  constructor(props){
    super(props);
     this.state = {
      searchInput: ''
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.props.handleSearchUsers(this.state.searchInput);
    browserHistory.push(`/search/users/?query=${this.state.searchInput}`);
  }

  handleSearchChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleLogout(event) {
    localStorage.removeItem('token');
    toastr.success('You have been Logged Out');
    browserHistory.push('/login');
  }

  renderNavBar() {
    const token = localStorage.getItem('token');
      return (
        <nav>
          <div className="nav-wrapper cyan accent-4 z-depth-3">
             <ul>
              { token &&  <li> <Link to="/dashboard/document">Create Document </Link> </li> }
              { !token && <li> <Link to="/signup"> Sign Up </Link></li> }
              { !token && <li> <Link to="/login"> Login </Link></li> }
              { token &&  <li> <Link to="/dashboard"> Dashboard</Link></li>}
              { token &&  <li> <Link to="/users"> Users</Link></li>}
              { token && <li> <Link to="/roles"> Manage Role</Link></li>}
              { token &&  <li>
                 <form onSubmit={this.handleSearchSubmit}>
                    <div className="input-field">
                      <Input
                       placeholder="Search Here"
                       id="search"
                       onChange={this.handleSearchChange}
                       type="text"
                       required
                       name="searchInput"
                       value={this.state.searchInput}
                       label={<i className="material-icons">search</i>} />
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </li>}
              { token &&  <button id={this.handleLogout} onClick={this.handleLogout}>Logout</button>}

              </ul>
          </div>
        </nav>
      );
    }

    render() {
      return (
        <div>
        {this.renderNavBar()}
        {this.props.children}
        </div>
      )
  }
}

export default connect(null, {
  handleSearchUsers
})(App);
