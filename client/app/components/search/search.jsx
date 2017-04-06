import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as adminAction from '../../actions/adminAction.js';
import toastr from 'toastr';
import jwt from 'jwt-decode';
import { Input, Button, Row, Col, Icon } from 'react-materialize';

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.userView = this.userView.bind(this);
  };

  componentWillMount() {
    this.props.handleSearchUsers(this.props.searchQuery);
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }


  userView(user) {
    return (
      <li key={user.id}>
        <div className="collapsible-header">
          <i className="material-icons">filter_drama</i>
          <h5>Username: {user.username}</h5>
        </div>
        <div className="collapsible-body"><h5>FIRSTNAME:</h5>{user.firstname} <h5>LASTNAME:</h5>{user.lastname}</div>
      </li>
    )
  }

  render() {
    let  users = this.props.users;
    console.log(users);
       if (users) {
          return (
          <ul className="collapsible popout" data-collapsible="accordion">
            { users.map(this.userView) }
          </ul>
        )
       }
    return (
      <div>
        <h3>Not Found </h3>
      </div>
    )
  }
}

const stateToProps = (state, ownProps) => {
  // console.log('state', state.admin.users);
  // console.log('props', this.props)
  const searchQuery = ownProps.location.query.query;
  return {
    searchQuery,
    users: state.admin.users,
  };
};

const dispatchToProps = (dispatch) => {
  return {
  handleSearchUsers: (searchQeury) => dispatch(adminAction.handleSearchUsers(searchQeury)),
  };
}

export default connect(stateToProps, dispatchToProps)(Search);