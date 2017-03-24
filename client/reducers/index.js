import { combinedReducers } from 'redux';
import users from './userReducer';

const rootReducer = combinedReducers({
  users
});

export default rootReducer;
