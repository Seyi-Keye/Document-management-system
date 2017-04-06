import React from 'react';
import { browserHistory, Link } from 'react-router'
import { Navbar, NavItem, Icon } from 'react-materialize';
import toastr from 'toastr';

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
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
export default App;
