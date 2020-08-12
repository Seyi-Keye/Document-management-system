import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Input, Button, Row } from 'react-materialize';
import { browserHistory } from 'react-router';
import * as adminAction from '../../actions/adminAction';

class UpdateUserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.sampleSetState();
  }

  sampleSetState() {
    this.setState({
      id: this.props.params.id,
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleUpdateUser({ ...this.state });
    browserHistory.push('/users');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <h4>UPDATE USER FORM:</h4>
          <Input
            className="formControl"
            name="firstname"
            s={6}
            label="First Name"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
          <Input
            name="lastname"
            className="formControl"
            s={6}
            label="Last Name"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
          <Button className="button" waves="light" onClick={this.handleSubmit}>
            Update User
          </Button>
        </Row>
      </form>
    );
  }
}

UpdateUserComponent.propTypes = {
  params: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
};

const stateToProps = (state, ownProps) => {
  const UserId = ownProps.params.id;
  const foundUser = _.findWhere(state.admin.users, {
    id: parseInt(UserId, 10),
  });

  return {
    user: foundUser,
  };
};

const dispatchToProps = (dispatch) => ({
  handleUpdateUser: (id, firstname, lastname) =>
    dispatch(adminAction.handleUpdateUser(id, firstname, lastname)),
});

export default connect(stateToProps, dispatchToProps)(UpdateUserComponent);
