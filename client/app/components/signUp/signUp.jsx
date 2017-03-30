import React from 'react';
import { Input, Button, Row, Col, Icon } from 'react-materialize';

class SignUpForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        email: ''
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  };

   handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
   }

   handleSubmit(event) {
    event.preventDefault();
    $.post('/users', this.state)
   .done((data) => {
     console.log(data);
   });
  }

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <Row>
              <h4>SIGNUP FORM:</h4>
              <Input className="formControl" name="firstname" s={6}
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
   }
}

export default SignUpForm;
