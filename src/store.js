import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import TodoReducer from './redux/reducers/TodoReducer';

const store = createStore(TodoReducer, applyMiddleware(logger))

export default store;