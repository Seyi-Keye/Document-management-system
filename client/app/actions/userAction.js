import request from 'superagent';
// import toastr from 'toastr';
import * as ActionTypes from './actionTypes';
import { errorMessage } from '../utils/utils';

export const signUpRequest = () => ({
  type: ActionTypes.SIGN_UP_REQUEST,
});
export const signUpSuccessful = (user) => ({
  type: ActionTypes.SIGN_UP_SUCCESSFUL,
  response: user,
});
export const signUpError = (error) => ({
  type: ActionTypes.SIGN_UP_FAIL,
  error,
});

export const loginRequest = () => ({
  type: ActionTypes.LOGIN_REQUEST,
});
export const loginSuccessful = (user) => ({
  type: ActionTypes.LOGIN_SUCCESSFUL,
  response: user,
});
export const loginError = (error) => ({
  type: ActionTypes.LOGIN_FAIL,
  error,
});

export const handleSignUp = (
  firstname,
  lastname,
  username,
  password,
  passwordConfirmation,
  email
) => (dispatch) => {
  dispatch(signUpRequest());
  return request
    .post('/api/v1/users')
    .send({
      firstname,
      lastname,
      username,
      password,
      passwordConfirmation,
      email,
    })
    .then(
      (response) => {
        localStorage.setItem('token', response.body.token);
        // toastrsuccess('Sign up successful');
        return dispatch(signUpSuccessful(response.body));
      },
      (error) => {
        const errorMsg = errorMessage(error);
        // toastrerror(errorMsg);
        return dispatch(signUpError(errorMsg));
      }
    );
};

export const handleLogin = (email, password) => (dispatch) => {
  dispatch(loginRequest());
  return request
    .post('/api/v1/users/login')
    .send({ email, password })
    .then(
      (response) => {
        localStorage.setItem('token', response.body.token);
        // toastr.success('Login successful');
        return dispatch(loginSuccessful(response.body));
      },
      (error) => dispatch(loginError(error))
      // const errorMsg = error.response.body.message;
      // toastr.error(errorMsg);
    );
};
