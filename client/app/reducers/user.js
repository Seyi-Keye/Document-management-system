import * as ActionTypes from '../actions/actionTypes'

const userIntialState = {
  isLoading: false,
  currentUser: {},
  error: '',
  hasError: false
}

export default function user(state = userIntialState, action) {
  switch(action.type) {
  case ActionTypes.SIGN_UP_REQUEST:
  console.log('I got to SIGN_UP_REQUEST reducer', 'This is the action here', action, 'Now the state', state);
    return { ...state, isLoading: true, hasError: false}
  case ActionTypes.SIGN_UP_SUCCESSFUL:
  console.log('I got to SIGN_UP_SUCCESSFUL reducer', 'This is the action here', action, 'Now the state', state);
    return {...state, currentUser: action.response.user, isLoading: false, hasError: false}
  case ActionTypes.SIGN_UP_FAIL:
  console.log('I got to SIGN_UP_FAIL reducer', 'This is the action here', action.error, 'Now the state', state);
    return {...state, error: action.error, isLoading: false, hasError: true}

    case ActionTypes.LOGIN_REQUEST:
  console.log('I got to LOGIN_REQUEST reducer', 'This is the action here', action, 'Now the state', state);
    return { ...state, isLoading: true, hasError: false}
  case ActionTypes.LOGIN_SUCCESSFUL:
  console.log('I got to LOGIN_SUCCESSFUL reducer', 'This is the action here', action, 'Now the state', state);
    return {...state, currentUser: action.response.user, isLoading: false, hasError: false}


  case ActionTypes.LOGIN_FAIL:
  console.log('I got to LOGIN_FAIL reducer', 'This is the action here', action.error, 'Now the state', state);
    return {...state, error: action.error, isLoading: false, hasError: true}
  default:
    return state;
  }
}