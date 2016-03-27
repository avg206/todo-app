/** client/app.js **/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import todoApp from './reducers';
import App from './components/App';
import { fetchTasks } from './actions';


const loggerMiddleware = createLogger();

let store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

store.dispatch( fetchTasks() );

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById( 'content' )
);