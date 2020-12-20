import React from 'react';
import { View, StyleSheet } from 'react-native';

import { DOT_SIZE } from '../index';

const Dot3 = () => {
  return (
    <View style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    height: DOT_SIZE,
    width: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#bfbfbf',
  },
});

export default Dot3;
