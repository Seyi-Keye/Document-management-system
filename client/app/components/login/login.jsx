import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Col, Form, Row, FormControl } from 'react-bootstrap';
import Modal from '../common/Modal';
import * as userAction from '../../actions/userAction';

export const LoginForm = () => {
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

const LoginComponent = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleChange = (event) => {
  //   setEmail({ [event.target.name]: event.target.value });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userAction.handleLogin(email, password));
    <Redirect to="/dashboard" />;
  };

  return (
    <div className="row">
      <Modal children={LoginForm()} title="Login" />
    </div>
  );
};
export default LoginComponent;
