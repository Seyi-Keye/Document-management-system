import { expect } from 'chai';
import * as ActionTypes from '../../app/actions/actionTypes';
import {
  signUpRequest,
  signUpSuccessful,
  signUpError,
  loginRequest,
  loginSuccessful,
  loginError,
} from '../../app/actions/userAction';

describe('User Action Unit Test:', () => {
  it('test signUpRequest', () => {
    expect(signUpRequest())
      .to
      .deep
      .equal({ type: ActionTypes.SIGN_UP_REQUEST });
  });

  it('test signUpSuccessful', () => {
    expect(signUpSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.SIGN_UP_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test signUpError', () => {
    expect(signUpError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.SIGN_UP_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('User Action Unit Test:', () => {
  it('test loginRequest', () => {
    expect(loginRequest())
      .to
      .deep
      .equal({ type: ActionTypes.LOGIN_REQUEST });
  });

  it('test loginSuccessful', () => {
    expect(loginSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.LOGIN_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test loginError', () => {
    expect(loginError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.LOGIN_FAIL,
        error: {
          error: 1,
        },
      });
  });
});
