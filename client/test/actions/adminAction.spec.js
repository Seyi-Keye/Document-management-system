import { expect } from 'chai';
import * as ActionTypes from '../../app/actions/actionTypes';
import {
  fetchUserRequest,
  fetchUserSuccessful,
  fetchUserError,
  UpdateUserRequest,
  UpdateUserSuccessful,
  UpdateUserError,
  deleteUserRequest,
  deleteUserSuccessful,
  deleteUserError,
  createRoleRequest,
  createRoleSuccessful,
  createRoleError,
  fetchRoleRequest,
  fetchRoleSuccessful,
  fetchRoleError,
  searchUserRequest,
  searchUserSuccessful,
  searchUserError,
} from '../../app/actions/adminAction';

describe('Admin Action Unit Test:', () => {
  it('test fetchUserRequest', () => {
    expect(fetchUserRequest())
      .to
      .deep
      .equal({ type: ActionTypes.FETCH_USERS_REQUEST });
  });

  it('test fetchUserSuccessful', () => {
    expect(fetchUserSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.FETCH_USERS_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test fetchUserError', () => {
    expect(fetchUserError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.FETCH_USERS_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('Admin Action Unit Test:', () => {
  it('test UpdateUserRequest', () => {
    expect(UpdateUserRequest())
      .to
      .deep
      .equal({ type: ActionTypes.UPDATE_USER_REQUEST });
  });

  it('test UpdateUserSuccessful', () => {
    expect(UpdateUserSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.UPDATE_USER_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test UpdateUserError', () => {
    expect(UpdateUserError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.UPDATE_USER_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('Admin Action Unit Test:', () => {
  it('test deleteUserRequest', () => {
    expect(deleteUserRequest())
      .to
      .deep
      .equal({ type: ActionTypes.DELETE_USER_REQUEST });
  });

  it('test deleteUserSuccessful', () => {
    expect(deleteUserSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.DELETE_USER_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test deleteUserError', () => {
    expect(deleteUserError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.DELETE_USER_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('Admin Action Unit Test:', () => {
  it('test createRoleRequest', () => {
    expect(createRoleRequest())
      .to
      .deep
      .equal({ type: ActionTypes.CREATE_ROLE_REQUEST });
  });

  it('test createRoleSuccessful', () => {
    expect(createRoleSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.CREATE_ROLE_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test createRoleError', () => {
    expect(createRoleError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.CREATE_ROLE_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('Admin Action Unit Test:', () => {
  it('test fetchRoleRequest', () => {
    expect(fetchRoleRequest())
      .to
      .deep
      .equal({ type: ActionTypes.FETCH_ROLE_REQUEST });
  });

  it('test fetchRoleSuccessful', () => {
    expect(fetchRoleSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.FETCH_ROLE_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test fetchRoleError', () => {
    expect(fetchRoleError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.FETCH_ROLE_FAIL,
        error: {
          error: 1,
        },
      });
  });
});

describe('Admin Action Unit Test:', () => {
  it('test searchUserRequest', () => {
    expect(searchUserRequest())
      .to
      .deep
      .equal({ type: ActionTypes.SEARCH_USER_REQUEST });
  });

  it('test searchUserSuccessful', () => {
    expect(searchUserSuccessful({ user: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.SEARCH_USER_SUCCESSFUL,
        response: {
          user: 1,
        },
      });
  });

  it('test searchUserError', () => {
    expect(searchUserError({ error: 1 }))
      .to
      .deep
      .equal({
        type: ActionTypes.SEARCH_USER_FAIL,
        error: {
          error: 1,
        },
      });
  });
});
