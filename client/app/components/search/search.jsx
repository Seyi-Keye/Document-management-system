import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as adminAction from '../../actions/adminAction.js';
import * as documentAction from '../../actions/documentAction.js';
import toastr from 'toastr';
import jwt from 'jwt-decode';
import { Input, Button, Row, Col, Icon } from 'react-materialize';

class Search extends React.Component {

  constructor(props) {
    super(props);

    // this.view = this.view.bind(this);
  };

  componentWillMount() {
    this.props.handleSearchUsers(this.props.searchQuery);
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }


  userView(id, username, firstname, lastname) {
    return (
      <li key={id}>
        <div className="collapsible-header">
          <i className="material-icons">filter_drama</i>
          <h5>Username: {username}</h5>
        </div>
        <div className="collapsible-body"><h5>FIRSTNAME:</h5>{firstname} <h5>LASTNAME:</h5>{lastname}</div>
      </li>
    )
  }
  documentView(id, title, content) {
    return (
      <li key={id}>
        <div className="collapsible-header">
          <i className="material-icons">filter_drama</i>
          <h5>Title: {title}</h5>
        </div>
        <div className="collapsible-body"><h5>Content:</h5>{content}</div>
      </li>
    )
  }
  renderDocument() {
    let  documents = this.props.documents;
       if (documents.length > 0) {
          return (
          <ul className="collapsible popout" data-collapsible="accordion">
            { documents.map((document) => this.documentView(document.id, document.title, document.content)) }
          </ul>
        )
       }
    return (
      <div>
        <h3>No Document Found </h3>
      </div>
    )
  }

  renderUser() {
    let  users = this.props.users;
       if (users.length > 0) {
          return (
          <ul className="collapsible popout" data-collapsible="accordion">
            { users.map((user) => this.userView(user.id, user.username, user.firstname, user.lastname)) }
          </ul>
        )
       }
    return (
      <div>
        <h3>No User Found </h3>
      </div>
    )
  }
  render() {
    return (
     <div>
       <h3> Documents </h3>
       { this.renderDocument() }
       <h3> Users </h3>
        { this.renderUser() }
     </div>
    )
  }
}

const stateToProps = (state, ownProps) => {
  const searchQuery = ownProps.location.query.query;
  return {
    searchQuery,
    users: state.admin.users,
    documents: state.document.documents
  };
};

const dispatchToProps = (dispatch) => {
  return {
  handleSearchUsers: (searchQeury) => dispatch(adminAction.handleSearchUsers(searchQeury)),
  handleSearchDocuments: (searchQeury) => dispatch(documentAction.handleSearchDocuments(searchQeury))
  };
}

export default connect(stateToProps, dispatchToProps)(Search);