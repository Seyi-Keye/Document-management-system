import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../app/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// const configureStore = () => createStore(
//     rootReducer,
//     applyMiddleware(thunk, reduxImmutableStateInvariant())
//   );

const configureStore = createStore (
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
export default configureStore;
