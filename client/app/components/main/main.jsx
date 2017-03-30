import React from 'react';
import { Link, Route } from 'react-router-dom'
import { Navbar, NavItem, Icon } from 'react-materialize';
import Home from '../home/home';
import About from '../about/about';
import Contact from '../contact/contact';
import SignUpForm from '../signUp/signUp';
import Login from '../login/login';

class App extends React.Component {
   render() {
      return (
         <div>
           <Navbar brand='KEYE-DOCS' right>
              <NavItem> <Link to="/"> Home </Link> </NavItem>
              <NavItem> <Link to="/about">  About </Link> </NavItem>
              <NavItem> <Link to="/contact">  Contact </Link> </NavItem>
              <NavItem> <Link to="/signup"> Sign Up </Link></NavItem>
              <NavItem> <Link to="/login"> Login </Link></NavItem>
            </Navbar>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/signup" component={SignUpForm}/>
          <Route path="/login" component={Login}/>

           {this.props.children}
         </div>
      )
   }
}

export default App;
