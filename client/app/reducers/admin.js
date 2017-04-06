import * as ActionTypes from '../actions/actionTypes'

const adminIntialState = {
  role: [],
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
    return {...state, users: action.response.users }
  case ActionTypes.FETCH_USERS_FAIL:
    return {...state, error: action.error, hasError: true}

  case ActionTypes.UPDATE_USER_REQUEST:
    return { ...state, isLoading: true};
  case ActionTypes.UPDATE_USER_SUCCESSFUL:
    const oldUsers = [...state.users];
    const updatedUsers = oldUsers.map(user => (
      user.id === action.response.id ? Object.assign({}, user,
      action.response ) : user)
      );
    return {...state, users: updatedUsers}
  case ActionTypes.UPDATE_USER_FAIL:
    return {...state, error: action.error, hasError: true}

  case ActionTypes.DELETE_USER_REQUEST:
    return { ...state, isLoading: true};
  case ActionTypes.DELETE_USER_SUCCESSFUL:
    const newUsers = state.users.filter(user => {
      return user.id !== parseInt(action.response, 10);
    });
    return Object.assign({}, state, {documents: newUsers});
  case ActionTypes.DELETE_USER_FAIL:
     return {...state, error: action.error, hasError: true }

  case ActionTypes.CREATE_ROLE_REQUEST:
    return { ...state, isLoading: true};
  case ActionTypes.CREATE_ROLE_SUCCESSFUL:
    return {...state, role: action.response.title}
  case ActionTypes.CREATE_ROLE_FAIL:
     return {...state, error: action.error, hasError: true }

  case ActionTypes.FETCH_ROLE_REQUEST:
    return { ...state, isLoading: true}
  case ActionTypes.FETCH_ROLE_SUCCESSFUL:
    return {...state, ROLE: action.response.role}
  case ActionTypes.FETCH_ROLE_FAIL:
    return {...state, error: action.error, hasError: true}


  default:
  return state;
  }
}