import React from 'react';
import { View, StyleSheet } from 'react-native';

const Dot2 = () => {
  return (
    <View style={styles.dot} />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 16,
    width: 16,
    borderRadius: 13,
    backgroundColor: '#bfbfbf',
  },
});

export default Dot2;
