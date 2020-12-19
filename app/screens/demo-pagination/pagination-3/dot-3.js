import React from 'react';
import { View, StyleSheet } from 'react-native';

const DOT_SIZE = 32;

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
