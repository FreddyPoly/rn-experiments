import React from 'react';
import { View, StyleSheet } from 'react-native';

import { variables } from '../variables';

const Dot4 = () => {
  return (
    <View style={styles.dot} />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: variables.DOT_SIZE,
    width: variables.DOT_SIZE,
    borderRadius: variables.DOT_SIZE / 2,
    backgroundColor: variables.COLOR_INACTIVE,
  },
});

export default Dot4;
