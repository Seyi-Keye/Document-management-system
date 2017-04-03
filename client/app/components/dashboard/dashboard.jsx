import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import  Documents from '../document/documents';

class Dashboard extends React.Component {
   render() {
      return (
         <div>
            <h1>All Documents...</h1>
            <Documents/>
         </div>
      )
   }
}

export default Dashboard;