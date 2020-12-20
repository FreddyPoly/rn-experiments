import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { variables } from '../variables';

const Dot2 = ({ active }) => {
  const dotSize = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.timing(dotSize, {
      toValue: active ? 0 : 1,
      duration: active ? variables.ANIMATION_TIME / 2 : variables.ANIMATION_TIME * 1.3,
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.dot, { transform: [{ scaleX: dotSize }, { scaleY: dotSize }] }]} />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: variables.DOT_SIZE,
    width: variables.DOT_SIZE,
    borderRadius: variables.DOT_SIZE / 2,
    backgroundColor: '#bfbfbf',
  },
});

export default Dot2;
