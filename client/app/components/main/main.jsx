import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import { Navbar, NavItem, Icon } from 'react-materialize';

class App extends React.Component {
   render() {
      return (
         <div>
           <Navbar brand='KEYE-DOCS' waves='light' right>
              <NavItem> Home</NavItem>
              <NavItem> About</NavItem>
              <NavItem> Contact </NavItem>
              <NavItem> Sign Up </NavItem>
            </Navbar>

           {this.props.children}
         </div>
      )
   }
}

export default App;
