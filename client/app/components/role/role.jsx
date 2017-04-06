import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as adminAction from '../../actions/adminAction.js';
import toastr from 'toastr';
import { Input, Button, Row, Col, Icon } from 'react-materialize';

class Role extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        title: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAllRoles = this.handleAllRoles.bind(this);
  };

   handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
   }

   handleAllRoles(e) {
     this.props.handleFetchRoles();

   }

   handleSubmit(event) {
    event.preventDefault();
    this.props.handleCreateRole(this.state);
    browserHistory.push('/roles');
   }

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
          {this.props.hasError && toastr.error(this.props.error)}
            <Row>
              <h4>CREATE ROLE FORM:</h4>
              <Input className="formControl" name="title" s={6}
              label="Title" value={this.state.title}
              onChange={this.handleChange}/>
              <Button className="button" waves='light'>Create Role</Button>
              <Button onClick={this.handleAllRoles} className="button" waves='light'>See all   Roles</Button>
            </Row>
         </form>
      );
   }
}

const stateToProps = (state) => {
  console.log(state, "the roles");
  return {
    role: state.role
  }
};

const dispatchToProps = (dispatch) => {
  return {
    handleCreateRole: title => dispatch(adminAction.handleCreateRole(title)),
    handleFetchRoles: () => dispatch(adminAction.handleFetchRoles())
  };
}

export default connect(stateToProps, dispatchToProps) (Role);
