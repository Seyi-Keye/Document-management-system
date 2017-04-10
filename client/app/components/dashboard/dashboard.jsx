import React from 'react';
import { connect } from 'react-redux';
import DocumentsComponent from '../document/Documents';

class Dashboard extends React.Component {
  componentDidMount() {
    $('.collapsible').collapsible();
  }
  render() {
    return (
      <div>
        <h1>All Documents...</h1>
        <DocumentsComponent />
      </div>
    );
  }
}

export default Dashboard;
