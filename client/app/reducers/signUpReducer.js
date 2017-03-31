import initialState from '../../store/initialState';

const signUpReducer = (state=initialState.user, action ) => {
  switch(action.type) {
    case "SIGNUP_SUCCESSFUL":
    return [...state, Object.assign({}, action.user)];
  default:
    return state;
  }
};

export default signUpReducer;