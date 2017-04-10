import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import { Input, Button, Row } from 'react-materialize';
import * as adminAction from '../../actions/adminAction';

class Role extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleCreateRole(this.state);
    browserHistory.push('/roles');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.props.hasError && toastr.error(this.props.error)}
          <Row>
            <h4>CREATE ROLE FORM:</h4>
            <Input
              className="formControl" name="title" s={6}
              label="Title" value={this.state.title}
              onChange={this.handleChange}
            />
            <Button className="button" waves="light">Create Role</Button>
          </Row>
        </form>
      </div>
    );
  }
}

Role.propTypes = {
  handleCreateRole: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  error: PropTypes.func.isRequired,
};

const stateToProps = state => ({
  role: state.admin.role,
});

const dispatchToProps = dispatch => ({
  handleCreateRole: title => dispatch(adminAction.handleCreateRole(title)),
});

export default connect(stateToProps, dispatchToProps)(Role);
