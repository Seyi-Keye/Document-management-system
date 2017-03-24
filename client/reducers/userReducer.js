import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
  case types.CREATE_USER:
    return Object.assign({}, state, action.user);

  default:
    return state;
  }
}
