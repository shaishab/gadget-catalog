import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { applyMiddleware, createStore } from 'redux';

import reducers from './reducers';

const middleware = applyMiddleware(promiseMiddleware(), thunk);

export default createStore(reducers, middleware);
