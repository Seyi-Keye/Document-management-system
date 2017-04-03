import { combineReducers } from 'redux';
import user from './user';
import document from './document';

const rootReducer = combineReducers({
  user,
  document
});

export default rootReducer;