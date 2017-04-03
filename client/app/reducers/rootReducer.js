import { combineReducers } from 'redux';
import login from './loginReducer';
import newDocument from './newDocumentReducer';
import signUp from './signUpReducer';
import documents from './documentReducer';

const rootReducer = combineReducers({
  documents,
  login,
  newDocument,
  signUp
});

export default rootReducer;