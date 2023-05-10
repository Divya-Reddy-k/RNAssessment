import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {commonStyle, fonts} from '../utils/Theme';

const RowView = ({header, value}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{header}:</Text>
      <Text>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    ...commonStyle.rowView,
  },
  title: {
    ...fonts.bold,
    marginRight: 6,
  },
});

export default RowView;
