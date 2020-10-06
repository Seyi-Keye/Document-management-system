import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Modal from '../common/Modal';
import * as userAction from '../../actions/userAction';

function LoginComponent(props) {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const { isModal, history } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Se mo de bi?');
    dispatch(userAction.handleLogin(email, password));
    // <Redirect to="/dashboard" />;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const LoginForm = () => {
    return (
      <Form className="col-md-12 login">
        {/* onSubmit={handleSubmit} */}
        <div className="login--header">
          <h1>Login!</h1>
          <p>Sign into your Account here.</p>
        </div>
        <Form.Group controlId="email" className="col-md">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password" className="col-md">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          size="sm"
          type="submit"
          block
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form>
    );
  };

  return isModal ? (
    <div className="row">
      <Modal children={LoginForm()} history={history} />
    </div>
  ) : (
    <div className="no-modal-wrapper">
      <LoginForm />
    </div>
  );
}
export default LoginComponent;
