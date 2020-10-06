import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import Modal from '../common/Modal';
// import toastr from 'toastr';
import * as userAction from '../../actions/userAction';

function SignUpComponent(props) {
  const { isModal, history } = props;
  const dispatch = useDispatch();

  //www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  const [state, setState] = React.useState({
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      userAction.handleSignUp(
        state.firstname,
        state.lastname,
        state.username,
        state.password,
        state.passwordConfirmation,
        state.email
      )
    );
    // <Redirect to="/dashboard" />;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const SignUpForm = () => {
    return (
      <Form className="col-md-12 signup">
        {/* onSubmit={handleSubmit} */}
        {/* {this.props.hasError && // toastr.error(this.props.error)} */}
        <div className="signup--header">
          <h1>Join Dockie</h1>
          <p>Sign up to manage your documents.</p>
        </div>

        <Form.Group controlId="firstname" className="col-md">
          <Form.Label>First Name </Form.Label>
          <Form.Control
            type="firstname"
            placeholder="First Name"
            value={state.firstname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="lastname" className="col-md">
          <Form.Label>Last Name </Form.Label>
          <Form.Control
            type="lastname"
            placeholder="Last Name"
            value={state.lastname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="username" className="col-md">
          <Form.Label>Username </Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            value={state.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password" className="col-md">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="passwordConfirmation" className="col-md">
          <Form.Label>Password Confirmation </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password confirmation"
            value={state.passwordConfirmation}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email" className="col-md">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={state.email}
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
          Signup
        </Button>
      </Form>
    );
  };

  return isModal ? (
    <div className="row">
      <Modal children={SignUpForm()} history={history} />
    </div>
  ) : (
    <div className="no-modal-wrapper">
      <SignUpForm />
    </div>
  );
}

// SignUpFormComponent.propTypes = {
//   handleSignUp: PropTypes.func.isRequired,
//   hasError: PropTypes.func.isRequired,
//   error: PropTypes.func.isRequired,
// };

// export const stateToProps = (state) => ({
//   user: state.user.currentUser,
//   error: state.user.error,
//   hasError: state.user.hasError,
// });

// export default connect(stateToProps, dispatchToProps)(SignUpComponent);

export default SignUpComponent;
