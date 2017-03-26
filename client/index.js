import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import { Router, browserHistory} from 'react-router';
// import routes from './routes';
import { Provider} from 'react-redux';
import configureStore from './store/configureStore';
// import { fetchUsers } from './actions/userActions';
// import { userReducer } from './reducers/userReducer';
import { initialState } from './reducers/initialState';
import { App } from './components/index';

const store = configureStore(initialState);
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);