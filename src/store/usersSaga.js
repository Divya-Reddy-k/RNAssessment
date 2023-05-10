import {act} from 'react-test-renderer';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {GET_USERS_FETCH, GET_USERS_SUCCESS, GET_USERS_FAILED} from './actions';

function getUsersFromApi(pageNum) {
  return fetch(
    `https://randomuser.me/api/?page=${pageNum}&results=20&nat=us`,
  ).then(response => response.json());
}

function* getUsers(action) {
  try {
    const data = yield call(getUsersFromApi, action.pageNumber);
    yield put({
      type: GET_USERS_SUCCESS,
      data: data?.results,
      isPullToRefresh: action.isPullToRefresh,
      isLoadMore: action.isLoadMore,
    });
  } catch (e) {
    yield put({type: GET_USERS_FAILED, message: e.message});
  }
}

function* usersSaga() {
  yield takeLatest(GET_USERS_FETCH, getUsers);
}

export default usersSaga;
