import React, {PropTypes} from 'react';
import form
import connect from 'react-redux';
import * as userActions from '../actions/userActions';
import { Input, Button, Row, Col, Icon } from 'react-materialize';

const SignUp = () => (
  <form onSubmit={this.handleSubmit}>
            <Row>
              <h4>SIGNUP FORM:</h4>
              <Input className="formControl" name="firstname"
              placeholder="Placeholder" s={6}
              label="First Name" value={this.state.firstname}
              onChange={this.handleChange}/>
              <Input name="lastname" className="formControl" s={6}
              label="Last Name"
              value={this.state.lastname} onChange={this.handleChange}/>
              <Input name="username" className="formControl" s={6}
              label="Username"
              value={this.state.username} onChange={this.handleChange}/>
              <Input name="password" className="formControl" type="password"
              label="password"
              value={this.state.password} onChange={this.handleChange}  s={6}/>
              <Input name="passwordConfirmation" className="formControl" s={6}
              type="password"
              label="password confirmation"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}/>
              <Input name="email" className="formControl" type="email"
              label="Email" s={6}
              value={this.state.email} onChange={this.handleChange}/>
              <Col s={7}>
              <Button className="button" waves='light'>Sign Up</Button>
              </Col>
            </Row>
         </form>
);

const handleChange = (event) {
  console.log(this.state)
  console.log(this.props);
      this.setState({ [event.target.name]: event.target.value });
   }

   handleSubmit(event) {
    event.preventDefault();
    $.post('/users', this.state)
   .done((data) => {
     console.log(data);
   });
  }

const mapStateToProps = (state, ownProps) => ({
  users: state.users
});
const mapDispatchToProps = (dispatch) => ({
  createUser: user => dispatch(userActions.createUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps) (SignUp);
