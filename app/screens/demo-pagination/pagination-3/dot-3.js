import React from 'react';
import { View, StyleSheet } from 'react-native';

import { variables } from '../variables';

const Dot3 = () => {
  return (
    <View style={styles.container} />
  );
};

const styles = StyleSheet.create({
  container: {
    height: variables.DOT_SIZE,
    width: variables.DOT_SIZE,
    borderRadius: variables.DOT_SIZE / 2,
    backgroundColor: '#bfbfbf',
  },
});

export default Dot3;
