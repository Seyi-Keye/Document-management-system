import request from 'superagent';
import * as ActionTypes from './actionTypes'
import toastr from 'toastr';
import { errorMessage } from '../utils/utils'



export const signUpRequest = () => {
  return {type: ActionTypes.SIGN_UP_REQUEST};
}
export const signUpSuccessful = (user) => {
  return {type: ActionTypes.SIGN_UP_SUCCESSFUL, response: user};
}
export const signUpError = (error) => {
  return {type: ActionTypes.SIGN_UP_FAIL, error: error};
}

export const loginRequest = () => {
  return {type: ActionTypes.LOGIN_REQUEST};
}
export const loginSuccessful = (user) => {
  return {type: ActionTypes.LOGIN_SUCCESSFUL, response: user};
}
export const loginError = (error) => {
  return {type: ActionTypes.LOGIN_FAIL, error: error};
}

export const handleSignUp = (firstname, lastname,
    username, password, passwordConfirmation ,email) => {
  return (dispatch) => {
    dispatch(signUpRequest());
    return (
      request.post('/users')
      .send({firstname, lastname, username, password, passwordConfirmation ,email})
      .then((response) => {
        localStorage.setItem('token', response.body.token);
        toastr.success('Sign up successful')
        return dispatch(signUpSuccessful(response.body));
      }, (error) => {
        const errorMsg = errorMessage(error);
        toastr.error(errorMsg);
        return dispatch(signUpError(errorMsg));
      })
    )
  };
}

export const handleLogin = (email, password) => {
  return (dispatch) => {
      dispatch(loginRequest());
      return (
      request.post('/users/login')
      .send({email, password})
      .then((response) => {
        localStorage.setItem('token', response.body.token);
        toastr.success('Login successful')
        return dispatch(loginSuccessful(response.body));
      }, (error) => {
        const errorMsg = error.response.body.message;
        toastr.error(errorMsg);
        return dispatch(loginError(error))
      }).catch(error => {
        const errorMsg = errorMessage(error);
        toastr.error(errorMsg);
        return dispatch(loginError(error))
      })
    )
  };
}
