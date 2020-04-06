import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import statusBarReducer from './reducers/statusBarReducer';

const todoApp = combineReducers({
    'user':userReducer,
    'statusBar':statusBarReducer
});

let store = createStore(todoApp,applyMiddleware(thunk));

export default store;