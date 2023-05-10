import React from 'react';
import {View, Text, Pressable, FlatList, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import NoData from './NoData';
import Separator from './Separator';
import {getJoiningDate} from '../utils';
import {commonStyle, fonts, theme} from '../utils/Theme';
import LoadingIndicator from './LoadingIndicator';

const UsersList = ({
  data,
  refreshing,
  onPullToRefresh,
  onEndReached,
  isLoadMore,
}) => {
  const navigation = useNavigation();

  const displayUsers = ({item}) => {
    return (
      <Pressable
        style={styles.userView}
        onPress={() =>
          navigation.navigate('Profile', {userId: item?.id?.value})
        }>
        <View style={styles.rowContainer}>
          <Image
            style={styles.profilePicture}
            source={{uri: item.picture.thumbnail}}
          />
          <View>
            <Text>{`${item.name.first} ${item.name.last}`}</Text>
            <Text>{item.email}</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.bold}>Country | </Text>
              <Text>{item.location.country}</Text>
            </View>
          </View>
        </View>
        <Text>{getJoiningDate(item.registered.date)}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={displayUsers}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={<Separator />}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        ListEmptyComponent={<NoData />}
        onRefresh={onPullToRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        style={styles.marginB24}
      />

      {isLoadMore && <LoadingIndicator style={styles.marginB24} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.BLACK,
    marginRight: 6,
  },
  rowContainer: {
    ...commonStyle.rowView,
  },
  bold: {
    ...fonts.bold,
  },
  marginB24: {marginBottom: 24},
});

export default UsersList;
