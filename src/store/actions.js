export const GET_USERS_FETCH = 'GET_USERS_FETCH';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILED = 'GET_USERS_FAILED';

export const getUsersList = (
  isPullToRefresh = false,
  pageNumber = 1,
  isLoadMore = false,
) => ({
  type: GET_USERS_FETCH,
  isPullToRefresh: isPullToRefresh,
  pageNumber: pageNumber,
  isLoadMore: isLoadMore,
});
