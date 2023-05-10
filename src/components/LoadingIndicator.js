import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingIndicator = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingIndicator;
