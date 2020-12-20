import React from 'react';
import { View, StyleSheet } from 'react-native';

import { DOT_SIZE } from '../index';

const Dot4 = () => {
  return (
    <View style={styles.dot} />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: DOT_SIZE,
    width: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#bfbfbf',
  },
});

export default Dot4;
