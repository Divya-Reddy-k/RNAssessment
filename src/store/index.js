import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import usersReducer from './usersReducer';
import {combineReducers} from 'redux';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({usersReducer});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
