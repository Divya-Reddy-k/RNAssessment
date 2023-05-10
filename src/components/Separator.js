import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../utils/Theme';

const Separator = ({dark = false, style}) => {
  return <View style={[dark ? styles.dark : styles.thin, style]} />;
};

const styles = StyleSheet.create({
  thin: {
    height: 1,
    width: '100%',
    backgroundColor: theme.GRAY,
    marginVertical: 16,
  },
  dark: {
    height: 2,
    width: '100%',
    backgroundColor: theme.BLACK,
    marginVertical: 16,
  },
});

export default Separator;
