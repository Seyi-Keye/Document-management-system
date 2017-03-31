import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom'
import { Navbar, NavItem, Icon } from 'react-materialize';
// import '../../../../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../../../../node_modules/material-icons/css/material-icons.css';
// import '../../../../node_modules/toastr/build/toastr.min.css';
import Home from './home/home';
import Document from './document/document';
import authAction from './../actions/authAction.js';
import SignUpForm from './signUp/signUp';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        redirectToLogin: true,
      };
      this.renderNavBar = this.renderNavBar.bind(this);
    }

    renderNavBar() {
      return (
        <nav>
          <div className="nav-wrapper cyan accent-4 z-depth-3">
            <ul>
              <li> <Link to="/"> Home </Link> </li>
              <li> <Link to="/document">  Document </Link> </li>
              <li> <Link to="/signup"> Sign Up </Link></li>
              <li> <Link to="/login"> Login </Link></li>
              <li> <Link to="/dashboard"> Dashboard </Link></li>
            </ul>
          </div>
        </nav>
      );
    }


    render() {
        const token = localStorage.getItem('token');
        const loginRoute = (
          <Route path="/login" component={Login} render={authAction}/>
        );

        if (token)
        {
          return (
            <div>
              {this.renderNavBar()}
              <Route exact path="/" component={Home}/>
              <Route path="/document" component={Document}/>
              <Route path="/signup" component={SignUpForm}/>
              <Route path="/login" component={Login} render={authAction}/>
              <Route path="/dashboard" component={Dashboard}/>

              {this.props.children}
            </div>
          )
        } else {
          return (
            <div>
              {this.renderNavBar()}
              {loginRoute}
              <Redirect to='/login' />
            </div>
          );
        }
    };
  }
export default App;