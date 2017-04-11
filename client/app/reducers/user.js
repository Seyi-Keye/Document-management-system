import * as ActionTypes from '../actions/actionTypes';

const userIntialState = {
  isLoading: false,
  currentUser: {},
  error: '',
  hasError: false,
};

export default function user(state = userIntialState, action) {
  switch (action.type) {
    case ActionTypes.SIGN_UP_REQUEST:
      return { ...state, isLoading: true };
    case ActionTypes.SIGN_UP_SUCCESSFUL:
      return { ...state, currentUser: action.response.user };
    case ActionTypes.SIGN_UP_FAIL:
      return { ...state, error: action.error, hasError: true };

    case ActionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case ActionTypes.LOGIN_SUCCESSFUL:
      return { ...state, currentUser: action.response.user };
    case ActionTypes.LOGIN_FAIL:
      return { ...state, error: action.error, hasError: true };

    default:
      return state;
  }
}
