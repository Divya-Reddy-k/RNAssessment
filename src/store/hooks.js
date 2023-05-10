import {useSelector} from 'react-redux';
import {
  findUserById,
  getIsLoading,
  getIsLoadMore,
  getIsRefreshing,
  getUsersListFromStore,
} from './selectors';

export function useUsersList() {
  return useSelector(getUsersListFromStore);
}

export function useIsLoading() {
  return useSelector(getIsLoading);
}

export function useIsRefreshing() {
  return useSelector(getIsRefreshing);
}

export function useFetchUserById(id) {
  return useSelector(state => findUserById(state, id));
}

export function useIsLoadMore() {
  return useSelector(getIsLoadMore);
}
