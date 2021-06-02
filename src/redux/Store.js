import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
// import rootReducer from '../Reducer/CombineReducer'

const store=createStore(applyMiddleware(logger));

export default store;