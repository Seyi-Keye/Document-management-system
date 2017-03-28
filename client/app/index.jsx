import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link, Route, indexRoute, hashHistory } from 'react-router-dom';
import SignupForm from './components/signup/signup';
// import LoginForm from './components/login/login';
import Home from './components/home/home';
import About from './components/about/about';
import Contact from './components/contact/contact';
import Main from './components/main/main';

render(
 <Router history={hashHistory}>
   <Route path="/" component={Main}>
     <indexRoute component={Home} />
     <Route path="home" component={Home} />
     <Route path="signup" component={SignupForm} />
     {/*<Route path="login" component={LoginForm} />*/}
     <Route path="about" component={About} />
     <Route path="contact" component={Contact} />
   </Route>
 </Router>,
 document.getElementById('app'));