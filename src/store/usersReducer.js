import {GET_USERS_FAILED, GET_USERS_FETCH, GET_USERS_SUCCESS} from './actions';

export default usersReducer = (
  state = {
    data: [],
    isPullToRefresh: false,
    isLoading: false,
    isLoadMore: false,
  },
  action,
) => {
  switch (action.type) {
    case GET_USERS_FETCH:
      return {
        ...state,
        isLoading: true,
        isPullToRefresh: action.isPullToRefresh,
        isLoadMore: action.isLoadMore,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.isPullToRefresh
          ? action.data
          : [...state.data, ...action.data],
        isLoading: false,
        isPullToRefresh: false,
        isLoadMore: false,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        isPullToRefresh: false,
        isLoadMore: false,
      };
    default:
      return state;
  }
};
