import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Button, Col, Form, Row, FormControl } from 'react-bootstrap';
import Modal from '../common/Modal';
import * as userAction from '../../actions/userAction';

const LoginComponent = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    setEmail({ [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleLogin(email, password);
    browserHistory.push('/dashboard');
  };

  const loginForm = () => {
    return (
      <Form className="col-md-8 login" onSubmit={handleSubmit}>
        <div>
          <h1>Login to your Account!</h1>
          <p>Sign in to your Account here</p>
        </div>
        <Form.Group controlId="email" className="col-md">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="password" className="col-md">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="rememberPassword" className="col-md-4">
          <Form.Control type="radio" label="Remember Password" />
        </Form.Group>
        <Button variant="primary" size="sm" type="submit">
          Login
        </Button>
      </Form>
    );
  };

  return (
    <div className="row">
      <Modal children={loginForm()} title="Login" />
    </div>
  );
};

LoginComponent.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export const stateToProps = (state) => ({
  user: state.user,
});

export const dispatchToProps = (dispatch) => ({
  handleLogin: (email, password) =>
    dispatch(userAction.handleLogin(email, password)),
});
export default connect(stateToProps, dispatchToProps)(LoginComponent);
