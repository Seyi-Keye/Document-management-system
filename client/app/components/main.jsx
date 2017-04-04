import React from 'react';
import { Link } from 'react-router'
import { Navbar, NavItem, Icon } from 'react-materialize';

class App extends React.Component {

  renderNavBar() {
    const token = localStorage.getItem('token');
      return (
        <nav>
          <div className="nav-wrapper cyan accent-4 z-depth-3">
             <ul>
              { token &&  <li> <Link to="/dashboard/document">Document </Link> </li> }
              { !token &&  <li> <Link to="/signup"> Sign Up </Link></li> }
              { !token &&   <li> <Link to="/login"> Login </Link></li> }
              { token &&  <li> <Link to="/dashboard"> Dashboard</Link></li>}
              {/*{ token &&  <li> <Link to="/updateDoc"> Edit Document</Link></li>}              */}
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
