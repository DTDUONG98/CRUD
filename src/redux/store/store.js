import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'

const sagaMiddleware = createSagaMiddleware();


const configStore = () => {
    const middlewares = [thunk, sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const store = createStore(rootReducer, composeWithDevTools(...enhancers));
    return store;
}

export default configStore;
