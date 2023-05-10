import React, {useEffect, useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ErrorBoundary from '../ErrroBoundary';
import UsersList from '../components/UsersList';
import {useDispatch} from 'react-redux';
import {getUsersList} from '../store/actions';
import {
  useIsLoading,
  useIsLoadMore,
  useIsRefreshing,
  useUsersList,
} from '../store/hooks';
import LoadingIndicator from '../components/LoadingIndicator';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const data = useUsersList();
  const isRefreshing = useIsRefreshing();
  const isLoading = useIsLoading();
  const isLoadMore = useIsLoadMore();
  const [pageCount, setPageCount] = useState(1);

  const onPullToRefresh = useCallback(() => {
    setPageCount(1);
    dispatch(getUsersList(true));
  }, []);

  useEffect(() => {
    dispatch(getUsersList(false));
  }, []);

  const onEndReached = () => {
    dispatch(getUsersList(false, pageCount + 1, true));
    setPageCount(pageCount + 1);
  };

  if (isLoading && !isLoadMore && !isRefreshing) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <ErrorBoundary>
        <UsersList
          data={data}
          onPullToRefresh={onPullToRefresh}
          refreshing={isRefreshing}
          onEndReached={onEndReached}
          isLoadMore={isLoadMore}
        />
      </ErrorBoundary>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default HomeScreen;
