import * as ActionTypes from '../actions/actionTypes'

const adminIntialState = {
  currentUser: {},
  isLoading: false,
  error: '',
  hasError: false,
  users: []
}

export default function user(state = adminIntialState, action) {
  switch(action.type) {

  case ActionTypes.FETCH_USERS_REQUEST:
    return { ...state, isLoading: true}
  case ActionTypes.FETCH_USERS_SUCCESSFUL:
    console.log({...state, users: action.response.users }, " reducer");
    return {...state, users: action.response.users }
  case ActionTypes.FETCH_USERS_FAIL:
    return {...state, error: action.error, hasError: true}

  case ActionTypes.UPDATE_USER_REQUEST:
    return { ...state, isLoading: true}
  case ActionTypes.UPDATE_USER_SUCCESSFUL:
    return {...state, currentUser: action.response.user}
  case ActionTypes.UPDATE_USER_FAIL:
    return {...state, error: action.error, hasError: true}

  default:
  return state;
  }
}