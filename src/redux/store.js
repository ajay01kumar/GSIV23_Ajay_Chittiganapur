// store.js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; // For handling asynchronous actions
import rootReducer from './reducer.js';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
