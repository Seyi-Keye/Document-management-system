import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import newDocumentReducer from './newDocumentReducer';
import signUpReducer from './signUpReducer';

const rootReducer = combineReducers({
  loginReducer,
  newDocumentReducer,
  signUpReducer
});

export default rootReducer;