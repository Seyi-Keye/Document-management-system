import React from 'react';
import {connect} from 'react-redux';
import { browserHistory, Link } from 'react-router'
import ReactDOM from 'react-dom';
import jwt from 'jwt-decode';
import * as adminAction from '../../actions/adminAction.js';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.userView = this.userView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentWillMount() {
    this.props.handleFetchUsers();
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }

  handleDelete(e) {
    const id = e.target.id;
    this.props.handleDeleteUser(id);
  }

  userView(user) {
    return (
      <li key={user.id}>
        <div className="collapsible-header">
          <i className="material-icons">filter_drama</i>
          <h5>{user.firstname} {user.lastname}</h5>
          <div>
            <button><Link to={`updateUser/${user.id}`}>
              <i className="material-icons">edit</i></Link>
            </button>
            <button id={user.id} onClick={this.handleDelete}><i id={user.id} className="material-icons">delete</i>
            </button>
          </div>
        </div>
        <div className="collapsible-body"><h5>FIRSTNAME:</h5>{user.firstname} <h5>LASTNAME:</h5>{user.lastname}</div>
      </li>
    )
  }
  render() {
    let  {users} = this.props.users;
       if (users) {
          return (
          <ul className="collapsible popout" data-collapsible="accordion">
            { users.map(this.userView) }
          </ul>
        )
       }
    return (
      <div>
        No User Found
      </div>
    )
  }
}

const stateToProps = (state, ownProps) => {
  const token = localStorage.getItem('token');
  const decoded = jwt(token);
  return { user: decoded, documents: state.document, users: state.admin }
};

const dispatchToProps = (dispatch) => {
  return {
    handleFetchUsers: () => dispatch(adminAction.handleFetchUsers()),
    handleDeleteUser: id => dispatch(adminAction.handleDeleteUser(id))
  };
}

export default connect(stateToProps, dispatchToProps)(Users);
