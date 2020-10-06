import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import jwt from 'jwt-decode';
import * as adminAction from '../../actions/adminAction';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.userView = this.userView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

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
          <h5>
            Username:{user.username} {user.firstname} {user.lastname}
          </h5>
          <div>
            <button>
              <Link to={`users/${user.id}`}>
                <i className="material-icons">edit</i>
              </Link>
            </button>
            <button id={user.id} onClick={this.handleDelete}>
              <i id={user.id} className="material-icons">
                delete
              </i>
            </button>
          </div>
        </div>
        <div className="collapsible-body">
          <h5>FIRSTNAME:</h5>
          {user.firstname} <h5>LASTNAME:</h5>
          {user.lastname}
        </div>
      </li>
    );
  }
  render() {
    const { users } = this.props.users;
    if (users) {
      return (
        <ul className="collapsible popout" data-collapsible="accordion">
          {users.map(this.userView)}
        </ul>
      );
    }
    return <div>No User Found</div>;
  }
}

Users.propTypes = {
  handleFetchUsers: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
  users: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
  const token = localStorage.getItem('token');
  const decoded = jwt(token);
  return { user: decoded, documents: state.document, users: state.admin };
};

const dispatchToProps = (dispatch) => ({
  handleFetchUsers: () => dispatch(adminAction.handleFetchUsers()),
  handleDeleteUser: (id) => dispatch(adminAction.handleDeleteUser(id)),
});

export default connect(stateToProps, dispatchToProps)(Users);
