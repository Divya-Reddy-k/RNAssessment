import {all, put, takeEvery, takeLatest} from 'redux-saga/effects';
import usersSaga from './usersSaga';

export default function* rootSaga() {
  yield all([
    usersSaga(),
    // other sagas
  ]);
}
