import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';


const configureStore = initialState => createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateInvariant()));

export default configureStore;
