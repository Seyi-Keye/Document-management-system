import React from 'react';
import Documents from '../document/Documents';

export class Dashboard extends React.Component {
  componentDidMount() {
    $('.collapsible').collapsible();
  }
  render() {
    return (
      <div>
        <h1>All Documents...</h1>
        <Documents />
      </div>
    );
  }
}

export default Dashboard;
