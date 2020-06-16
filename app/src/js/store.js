import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createPromise } from 'redux-promise-middleware';
import reducers from './reducers'

const middleware = applyMiddleware(thunk, createLogger());
//const middleware = applyMiddleware(thunk);
export default createStore(reducers, middleware);