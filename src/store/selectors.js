export function getIsRefreshing(state) {
  return state?.usersReducer.isPullToRefresh;
}

export function getIsLoading(state) {
  return state?.usersReducer.isLoading;
}

export function getUsersListFromStore(state) {
  return state?.usersReducer.data;
}

export function getIsLoadMore(state) {
  return state.usersReducer.isLoadMore;
}

export function findUserById(state, id) {
  return state.usersReducer.data.find(item => item.id.value === id);
}
