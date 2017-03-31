import request from 'superagent';
import * as types from './actionTypes';

const signUpAction = (user) => {
  return {type: 'SIGNUP_SUCCESSFUL', user};
}

const loginAction = (user) => {
  return {type: 'LOGIN_SUCCESSFUL', user};
}


const handleSignUp = (firstname, lastname,
    username, password, passwordConfirmation ,email) => {
  return (dispatch) => {
    dispatch(signUpAction());
    return (
      request.post('/users')
      .send({firstname, lastname,
    username, password, passwordConfirmation ,email})
      .then((response) => {
        if(response.status === 200) {
        dispatch(signUpAction(response.body));
        console.log(response.body);
        window.location = '/login';
      } else {
        console.log(response);
      }
      }).catch(err => {
      })
    )
  };
}

const handleLogin = (email, password) => {
  return (dispatch) => {
    return (
      request.post('/users/login')
      .send({email, password})
      .then((response) => {
        if(response.status === 200) {
        dispatch(loginAction(response.body));
        console.log(response.body);
        const data = response.body;
        localStorage.setItem('token', data.token);
        // window.location = '/dashboard';
      } else {
        console.log(response);
      }
      }).catch(err => {
      })
    )
  };
}



export { handleSignUp };

export { signUpAction };

export { handleLogin };

export default loginAction;
