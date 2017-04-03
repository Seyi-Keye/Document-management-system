import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { browserHistory,  Route, Redirect  } from 'react-router';
import { handleLogin } from '../../actions/userAction.js';
import { Button, Col, Input, Row } from 'react-materialize';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class Login extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        email: '',
        password: ''
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // redirect() {
  //   const context = () => [];
  //   toastr.success('Login Successful');
  //   this.context.push('/dashboard');
  // }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleLogin(this.state.email, this.state.password)
    .then(() => {
      history.push('/dashboard');
      // toastr.success('Login Successful');
     // <Redirect to='/dashboard'/>
      // window.location = '/dashboard';
    }
    );
  }

  render() {
    return(
    <form onSubmit={this.handleSubmit}>
      <Row>
      <Input name="email" className="formControl" type="email"
      label="Email" s={7} value={this.state.email}
      onChange={this.handleChange}/>
      <Input name="password" className="formControl" type="password"
      label="password" value={this.state.password} onChange={this.handleChange}
      s={7}/>
      <Col s={7}>
        <Button className="button" waves='light'>Login</Button>
      </Col>
      </Row>
    </form>
  );
  }
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
};

const dispatchToProps = (dispatch) => {
  return {
    handleLogin: (email, password) => dispatch(handleLogin(email, password))
  };
}

export default connect(stateToProps, dispatchToProps) (Login);