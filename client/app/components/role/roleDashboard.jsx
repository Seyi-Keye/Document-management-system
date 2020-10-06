import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Role from '../role/Role';
import * as adminAction from '../../actions/adminAction';

class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: [],
    };
    this.handleAllRoles = this.handleAllRoles.bind(this);
  }

  componentWillMount() {
    this.props.handleFetchRoles();
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }

  handleAllRoles() {
    this.roleView(this.props.role);
  }

  roleView(role) {
    // eslint-disable-line
    return (
      <li key={role.id}>
        <div className="collapsible-header">
          <i className="material-icons">filter_drama</i>
          <h5>{role.title}</h5>
          <div>
            <button>
              <Link to={`roles/${role.id}`}>
                <i className="material-icons">edit</i>
              </Link>
            </button>
            <button id={role.id}>
              <i id={role.id} className="material-icons">
                delete
              </i>
            </button>
          </div>
        </div>
        <div className="collapsible-body">
          <h5>TITLE:</h5>
          {role.title} <h5>CREATED AT::</h5>
          {role.createdAt}
        </div>
      </li>
    );
  }

  render() {
    const { role } = this.props;

    return (
      <div>
        <h3>Everything about Roles</h3>
        <Role />
        {role ? (
          <ul className="collapsible popout" data-collapsible="accordion">
            {role.map(this.roleView)}
          </ul>
        ) : (
          <div>No Roles</div>
        )}
      </div>
    );
  }
}

Roles.propTypes = {
  handleFetchRoles: PropTypes.func.isRequired,
  role: PropTypes.func.isRequired,
};

const stateToProps = (state) => ({
  role: state.admin.role,
});

const dispatchToProps = (dispatch) => ({
  handleFetchRoles: () => dispatch(adminAction.handleFetchRoles()),
});

export default connect(stateToProps, dispatchToProps)(Roles);
