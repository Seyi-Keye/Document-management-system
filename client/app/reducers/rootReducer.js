import { combineReducers } from 'redux';
import user from './user';
import document from './document';
import admin from './admin';

const rootReducer = combineReducers({
  user,
  document,
  admin
});

export default rootReducer;