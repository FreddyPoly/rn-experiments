import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

import { variables } from '../variables';

const Dot1 = ({ active }) => {
  const dotSize = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.timing(dotSize, {
      toValue: active ? 1 : .5,
      duration: variables.ANIMATION_TIME,
      Easing: Easing.bezier(.32,-0.16,.41,.17),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.dot, active && styles.activeDot, { transform: [{ scaleX: dotSize }, { scaleY: dotSize }] }]} />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: variables.DOT_SIZE,
    width: variables.DOT_SIZE,
    borderRadius: variables.DOT_SIZE / 2,
    backgroundColor: variables.COLOR_INACTIVE,
  },
  activeDot: {
    backgroundColor: variables.COLOR_ACTIVE,
  },
});

export default Dot1;
