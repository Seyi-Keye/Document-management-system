import React from 'react';
import { Link, Route } from 'react-router-dom'
import { Navbar, NavItem, Icon } from 'react-materialize';
import Home from '../home/home';
import About from '../about/about';
import Contact from '../contact/contact';
import SignUpForm from '../signUp/signUp';
import Login from '../login/login';
import Dashboard from '../dashboard/dashboard';

class App extends React.Component {
   render() {
      return (
        <div>
          <nav>
            <div className="nav-wrapper cyan accent-4 z-depth-3">
              <ul>
                <li> <Link to="/"> Home </Link> </li>
                <li> <Link to="/about">  About </Link> </li>
                <li> <Link to="/contact">  Contact </Link> </li>
                <li> <Link to="/signup"> Sign Up </Link></li>
                <li> <Link to="/login"> Login </Link></li>
                <li> <Link to="/dashboard"> Dashboard </Link></li>
              </ul>
            </div>
          </nav>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/signup" component={SignUpForm}/>
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>

           {this.props.children}
        </div>
      )
   }
}

export default App;
